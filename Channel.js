const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const channelSchema = new mongoose.Schema({
    channelId: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
    },
    type: {
        type: String,
        enum: ['live', 'podcast', 'youtube', 'bigo'],
        required: true
    },
    status: {
        type: String,
        enum: ['offline', 'live', 'scheduled', 'error'],
        default: 'offline'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    settings: {
        isPublic: {
            type: Boolean,
            default: true
        },
        allowChat: {
            type: Boolean,
            default: true
        },
        maxViewers: {
            type: Number,
            default: 1000
        },
        streamQuality: {
            type: String,
            enum: ['low', 'medium', 'high', 'ultra'],
            default: 'medium'
        },
        recordStream: {
            type: Boolean,
            default: false
        }
    },
    statistics: {
        totalViews: {
            type: Number,
            default: 0
        },
        peakViewers: {
            type: Number,
            default: 0
        },
        currentViewers: {
            type: Number,
            default: 0
        },
        totalStreamTime: {
            type: Number,
            default: 0
        },
        averageViewTime: {
            type: Number,
            default: 0
        }
    },
    streamData: {
        streamKey: {
            type: String,
            unique: true,
            sparse: true
        },
        rtmpUrl: {
            type: String
        },
        hlsUrl: {
            type: String
        },
        currentBitrate: {
            type: Number,
            default: 0
        },
        resolution: {
            width: { type: Number, default: 1920 },
            height: { type: Number, default: 1080 }
        }
    },
    schedule: {
        scheduledStart: {
            type: Date
        },
        scheduledEnd: {
            type: Date
        },
        recurring: {
            enabled: { type: Boolean, default: false },
            pattern: {
                type: String,
                enum: ['daily', 'weekly', 'monthly'],
                default: 'weekly'
            },
            daysOfWeek: [Number]
        }
    },
    metadata: {
        tags: [String],
        category: {
            type: String,
            enum: ['gaming', 'music', 'talk', 'education', 'entertainment', 'news', 'sports', 'other'],
            default: 'other'
        },
        language: {
            type: String,
            default: 'en'
        },
        thumbnail: {
            type: String
        }
    },
    moderators: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        permissions: {
            canBan: { type: Boolean, default: false },
            canMute: { type: Boolean, default: true },
            canDeleteMessages: { type: Boolean, default: true }
        }
    }],
    bannedUsers: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        bannedAt: {
            type: Date,
            default: Date.now
        },
        reason: String,
        bannedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for better query performance
channelSchema.index({ channelId: 1 });
channelSchema.index({ owner: 1 });
channelSchema.index({ status: 1 });
channelSchema.index({ type: 1 });
channelSchema.index({ 'metadata.category': 1 });
channelSchema.index({ createdAt: -1 });

// Virtual properties
channelSchema.virtual('isLive').get(function() {
    return this.status === 'live';
});

channelSchema.virtual('uptimeMinutes').get(function() {
    if (this.status !== 'live') return 0;
    const now = new Date();
    const streamStart = this.updatedAt;
    return Math.floor((now - streamStart) / (1000 * 60));
});

// Instance methods
channelSchema.methods.startStream = async function() {
    this.status = 'live';
    this.statistics.currentViewers = 0;
    await this.save();
    return this;
};

channelSchema.methods.stopStream = async function() {
    const streamDuration = this.uptimeMinutes;
    this.status = 'offline';
    this.statistics.totalStreamTime += streamDuration;
    this.statistics.currentViewers = 0;
    await this.save();
    return this;
};

channelSchema.methods.addViewer = async function() {
    this.statistics.currentViewers += 1;
    this.statistics.totalViews += 1;
    
    if (this.statistics.currentViewers > this.statistics.peakViewers) {
        this.statistics.peakViewers = this.statistics.currentViewers;
    }
    
    await this.save();
    return this;
};

channelSchema.methods.removeViewer = async function() {
    if (this.statistics.currentViewers > 0) {
        this.statistics.currentViewers -= 1;
        await this.save();
    }
    return this;
};

channelSchema.methods.isModerator = function(userId) {
    return this.moderators.some(mod => mod.user.toString() === userId.toString());
};

channelSchema.methods.isBanned = function(userId) {
    return this.bannedUsers.some(banned => banned.user.toString() === userId.toString());
};

channelSchema.methods.addModerator = async function(userId, permissions = {}) {
    const existingMod = this.moderators.find(mod => mod.user.toString() === userId.toString());
    
    if (!existingMod) {
        this.moderators.push({
            user: userId,
            permissions: {
                canBan: permissions.canBan || false,
                canMute: permissions.canMute || true,
                canDeleteMessages: permissions.canDeleteMessages || true
            }
        });
        await this.save();
    }
    return this;
};

channelSchema.methods.banUser = async function(userId, reason, bannedBy) {
    const existingBan = this.bannedUsers.find(banned => banned.user.toString() === userId.toString());
    
    if (!existingBan) {
        this.bannedUsers.push({
            user: userId,
            reason: reason || 'No reason provided',
            bannedBy: bannedBy
        });
        await this.save();
    }
    return this;
};

// Static methods
channelSchema.statics.findLiveChannels = function() {
    return this.find({ status: 'live' }).populate('owner', 'username displayName');
};

channelSchema.statics.findByCategory = function(category) {
    return this.find({ 'metadata.category': category }).populate('owner', 'username displayName');
};

channelSchema.statics.getPopularChannels = function(limit = 10) {
    return this.find({ status: 'live' })
        .sort({ 'statistics.currentViewers': -1 })
        .limit(limit)
        .populate('owner', 'username displayName');
};

// Pre-save middleware
channelSchema.pre('save', function(next) {
    if (this.isNew && !this.streamData.streamKey) {
        this.streamData.streamKey = `sk_${uuidv4().replace(/-/g, '')}`;
    }
    next();
});

// Pre-remove middleware
channelSchema.pre('remove', async function(next) {
    // Clean up related data before removing channel
    const ChatMessage = mongoose.model('ChatMessage');
    await ChatMessage.deleteMany({ channelId: this.channelId });
    next();
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;
