// All client-side code, since we're using hooks and event handlers.
'use client';

import * as React from 'react';
import {
  Archive,
  Clapperboard,
  Eye,
  Facebook,
  LayoutGrid,
  MessageSquare,
  Mic,
  Settings,
  Sparkles,
  Twitch,
  Users,
  Youtube,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { PlatformRecommender } from '@/components/platform-recommender';
import { ContentSuggester } from '@/components/content-suggester';
import { ChatPanel } from '@/components/chat-panel';
import { ArchiveList } from '@/components/archive-list';
import { MonetizationSettings } from '@/components/monetization-settings';

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
                    <div className="stat-item">👥 <span>{viewers.toLocaleString()}</span> {status === 'SCHEDULED' ? 'waiting' : (type === 'Audio Only' ? 'listening' : 'watching')}</div>
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
                {/* We'll use the ChatPanel component we already have, adapting it later */}
                <ChatPanel />
            </div>
        </div>
    );
};

const BroadcasterMode = () => (
    <div id="broadcasterMode" className="main-content">
        <div className="streaming-panel">
             <div className="streaming-controls">
                <button className="big-btn start">🚀 Start Streaming</button>
                <button className="big-btn stop">🛑 Stop Streaming</button>
            </div>
            <div className="audio-visualizer">
                {Array.from({length: 30}).map((_, i) => (
                    <div key={i} className="audio-bar" style={{animationDelay: `${i * 0.05}s`}}></div>
                ))}
            </div>
        </div>
        <div className="viewer-grid">
            <div className="video-player playing">
                <div className="channel-info">Your Stream Preview</div>
            </div>
            <ChatPanel />
        </div>
    </div>
);

const AdminMode = () => (
    <div id="adminMode" className="main-content">
        <div className="admin-panel">
            <div className="admin-card">
                <h3>Platform Statistics</h3>
                <div className="stat-row"><span>Total Users:</span> <strong>15,789</strong></div>
                <div className="stat-row"><span>Live Channels:</span> <strong>2</strong></div>
                <div className="stat-row"><span>Peak Viewers (24h):</span> <strong>8,192</strong></div>
                <div className="stat-row"><span>Server Uptime:</span> <strong>99.98%</strong></div>
            </div>
            <div className="admin-card">
                <h3>Live Channels</h3>
                <div className="stat-row"><span>IndieVibe FM</span> <button className="control-btn danger">Shutdown</button></div>
                <div className="stat-row"><span>RealTalk 24/7</span> <button className="control-btn danger">Shutdown</button></div>
            </div>
             <div className="admin-card">
                <h3>System Control</h3>
                <button className="control-btn">Reboot Media Server</button>
                <button className="control-btn success mt-2">Send Global Notification</button>
            </div>
        </div>
    </div>
);


export default function Home() {
    const [role, setRole] = React.useState<Role>('viewer');

    const switchRole = (newRole: Role) => {
        setRole(newRole);
    };

    const renderContent = () => {
        switch (role) {
            case 'viewer':
                return <ViewerMode />;
            case 'broadcaster':
                return <BroadcasterMode />;
            case 'admin':
                return <AdminMode />;
            default:
                return <ViewerMode />;
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
                            👀 Viewer Mode
                        </button>
                        <button className={`role-btn broadcaster ${role === 'broadcaster' ? 'active' : ''}`} onClick={() => switchRole('broadcaster')}>
                            🎙️ Broadcaster Mode
                        </button>
                        <button className={`role-btn admin ${role === 'admin' ? 'active' : ''}`} onClick={() => switchRole('admin')}>
                            ⚙️ Admin Mode
                        </button>
                    </div>
                </div>
            </div>
            {renderContent()}
        </div>
    );
}