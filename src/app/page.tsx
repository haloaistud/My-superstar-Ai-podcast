'use client';

import * as React from 'react';
import {
  Clapperboard,
  Eye,
  Settings,
  Users,
} from 'lucide-react';

import { ChatPanel } from '@/components/chat-panel';

type Role = 'viewer' | 'broadcaster' | 'admin';

const ViewerMode = () => {
    const [selectedChannel, setSelectedChannel] = React.useState<string | null>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [indieViewers, setIndieViewers] = React.useState(2847);
    const [realtalkViewers, setRealtalkViewers] = React.useState(5123);

    const togglePlayback = () => setIsPlaying(!isPlaying);

    const selectChannel = (channel: string) => {
        setSelectedChannel(channel);
        setIsPlaying(true);
    };

    const ChannelCard = ({id, name, status, description, viewers, type, time, onClick, children}: any) => {
        const isSelected = selectedChannel === id;
        const statusClass = status.toLowerCase();

        return (
            <div className={`channel-card ${id} ${isSelected ? 'selected' : ''}`} onClick={() => onClick(id)}>
                <div className="channel-header">
                    <div className="channel-name">{name}</div>
                    <div className={`channel-status ${statusClass}`}>{status}</div>
                </div>
                <div className="channel-description">{description}</div>
                <div className="channel-stats">
                    <div className="stat-item">
                        <Users className="h-4 w-4" /> <span>{viewers.toLocaleString()}</span> {status === 'SCHEDULED' ? 'waiting' : (type === '🎵 Audio Only' ? 'listening' : 'watching')}
                    </div>
                    <div className="stat-item">{type.startsWith('📹') ? '📹 Video + Audio' : '🎵 Audio Only'}</div>
                    <div className="stat-item">⏱️ {time}</div>
                </div>
                {children}
            </div>
        )
    }

    const AudioVisualizer = ({id}: {id: string}) => (
        <div className="audio-visualizer" id={`${id}Visualizer`}>
            {Array.from({length: 15}).map((_, i) => (
                 <div key={i} className="audio-bar" style={{animationDelay: `${i * 0.1}s`}}></div>
            ))}
        </div>
    )

    const currentChannel = [
        { id: 'indie', name: '🎵 IndieVibe FM', status: 'LIVE', description: 'Music-focused channel featuring indie artists, underground hits, and live DJ sets. Discover new sounds and classic vibes 24/7.', viewers: indieViewers, type: '🎵 Audio Only', time: '3h 24m' },
        { id: 'realtalk', name: '🗣️ RealTalk 24/7', status: 'LIVE', description: 'Raw conversations, interviews, and real talk about life, culture, and everything in between. Join the discussion!', viewers: realtalkViewers, type: '📹 Video + Audio', time: '1h 47m' },
        { id: 'nerd', name: '🕹️ NerdZone Cast', status: 'SCHEDULED', description: 'Gaming reviews, tech discussions, and nerd culture deep dives. Where geeks gather to share their passion.', viewers: 0, type: '📹 Video + Audio', time: 'Starts at 8 PM' }
    ].find(c => c.id === selectedChannel);


    return (
        <div id="viewerMode" className="main-content active">
            <div className="channels-grid">
                <ChannelCard id="indie" name="🎵 IndieVibe FM" status="LIVE" description="Music-focused channel featuring indie artists, underground hits, and live DJ sets. Discover new sounds and classic vibes 24/7." viewers={indieViewers} type="🎵 Audio Only" time="3h 24m" onClick={selectChannel}>
                     <AudioVisualizer id="indie" />
                </ChannelCard>
                 <ChannelCard id="realtalk" name="🗣️ RealTalk 24/7" status="LIVE" description="Raw conversations, interviews, and real talk about life, culture, and everything in between. Join the discussion!" viewers={realtalkViewers} type="📹 Video + Audio" time="1h 47m" onClick={selectChannel}>
                     <AudioVisualizer id="realtalk" />
                </ChannelCard>
                <ChannelCard id="nerd" name="🕹️ NerdZone Cast" status="SCHEDULED" description="Gaming reviews, tech discussions, and nerd culture deep dives. Where geeks gather to share their passion." viewers={0} type="📹 Video + Audio" time="Starts at 8 PM" onClick={selectChannel}>
                    <AudioVisualizer id="nerd" />
                </ChannelCard>
            </div>

            <div className="viewer-grid">
                 <div className={`video-player ${currentChannel ? (currentChannel.type === '🎵 Audio Only' ? 'audio-only' : '') : ''} ${isPlaying ? 'playing' : ''}`} id="videoPlayer">
                    <button className="play-button" id="playButton" onClick={togglePlayback}>{isPlaying ? '❚❚' : '▶️'}</button>
                    <div className="channel-info">
                        <span id="currentChannelInfo">{currentChannel?.name || 'Select a channel to start listening'}</span>
                    </div>
                </div>
                <ChatPanel />
            </div>
        </div>
    );
};

export default function Home() {
    const [role, setRole] = React.useState<Role>('viewer');

    const switchRole = (newRole: Role) => {
        if (newRole === 'broadcaster') {
            window.location.href = '/login';
        } else if (newRole === 'admin') {
            window.location.href = '/admin';
        }
        else {
            setRole(newRole);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="header-content">
                    <div className="logo">🌟 SUPERSTAR PODCAST HUB</div>
                    <div className="subtitle">Yardie-Style Streaming • Podcast Channels • Live Community</div>

                    <div className="role-selector">
                        <button className={`role-btn viewer ${role === 'viewer' ? 'active' : ''}`} onClick={() => switchRole('viewer')}>
                            <Eye className="w-5 h-5 mr-2" /> Viewer Mode
                        </button>
                        <button className={`role-btn broadcaster`} onClick={() => switchRole('broadcaster')}>
                            <Clapperboard className="w-5 h-5 mr-2" /> Broadcaster Mode
                        </button>
                        <button className={`role-btn admin`} onClick={() => switchRole('admin')}>
                           <Settings className="w-5 h-5 mr-2" /> Admin Mode
                        </button>
                    </div>
                </div>
            </div>
            <ViewerMode />
        </div>
    );
}
