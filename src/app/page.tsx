'use client';

import * as React from 'react';
import { Clapperboard, Eye, Settings, Users, Video, Mic } from 'lucide-react';

import { ChatPanel } from '@/components/chat-panel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DonationPanel } from '@/components/donation-panel';

type Role = 'viewer' | 'broadcaster' | 'admin';

const ViewerMode = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlayback = () => setIsPlaying(!isPlaying);

  return (
    <div id="viewerMode" className="main-content active">
      <div className="viewer-grid">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>🎙️ The Main Event</span>
              <div className="flex items-center gap-2 text-sm font-medium text-red-400">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                LIVE
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`video-player ${
                isPlaying ? 'playing' : ''
              }`}
              id="videoPlayer"
            >
              <div className="absolute top-4 left-4 z-10 flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-sm">
                  <Users className="h-4 w-4" /> 8,192
                </div>
                <div className="flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-sm">
                  <Video className="h-4 w-4" /> 1080p
                </div>
              </div>
              <button
                className="play-button z-10"
                id="playButton"
                onClick={togglePlayback}
              >
                {isPlaying ? '❚❚' : '▶️'}
              </button>
              <div className="channel-info">
                <span id="currentChannelInfo">
                  RealTalk 24/7 - Raw conversations, interviews, and real talk about life, culture, and everything in between.
                </span>
              </div>
               {isPlaying && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-8">
            <ChatPanel />
            <DonationPanel />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [role, setRole] = React.useState<Role>('viewer');

  const switchRole = (newRole: Role) => {
    if (newRole === 'broadcaster') {
      window.location.href = '/broadcaster';
    } else if (newRole === 'admin') {
      window.location.href = '/admin';
    } else {
      setRole(newRole);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <div className="logo">🌟 SUPERSTAR PODCAST HUB</div>
          <div className="subtitle">
            Your Serverless Link to the World. Stream, Connect, Grow.
          </div>

          <div className="role-selector">
            <button
              className={`role-btn viewer ${role === 'viewer' ? 'active' : ''}`}
              onClick={() => switchRole('viewer')}
            >
              <Eye className="w-5 h-5 mr-2" /> Viewer Mode
            </button>
            <button
              className={`role-btn broadcaster`}
              onClick={() => switchRole('broadcaster')}
            >
              <Clapperboard className="w-5 h-5 mr-2" /> Broadcaster Mode
            </button>
            <button
              className={`role-btn admin`}
              onClick={() => switchRole('admin')}
            >
              <Settings className="w-5 h-5 mr-2" /> Admin Mode
            </button>
          </div>
        </div>
      </div>
      <ViewerMode />
    </div>
  );
}
