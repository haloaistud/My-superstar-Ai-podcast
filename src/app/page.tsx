'use client';

import * as React from 'react';
import { Clapperboard, Eye, Settings, Users, Video, Search, ListMusic, UserPlus } from 'lucide-react';

import { ChatPanel } from '@/components/chat-panel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DonationPanel } from '@/components/donation-panel';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StreamerList } from '@/components/streamer-list';
import { GuestQueue } from '@/components/guest-queue';

type Role = 'viewer' | 'broadcaster' | 'admin';

const ViewerMode = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlayback = () => setIsPlaying(!isPlaying);

  return (
    <div id="viewerMode" className="main-content active">
      <div className="viewer-grid">
        <div className="lg:col-span-2">
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
                  <h3 className="font-bold text-lg">🎙️ The Main Event: RealTalk 24/7</h3>
                  <p className="text-sm opacity-80">
                    Raw conversations, interviews, and real talk about life, culture, and everything in between.
                  </p>
              </div>
               {isPlaying && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              )}
            </div>
        </div>
        <div className="space-y-8">
            <Tabs defaultValue="chat" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chat">💬 Chat</TabsTrigger>
                <TabsTrigger value="streamers">
                  <ListMusic className="mr-2 h-4 w-4" /> Streamers
                </TabsTrigger>
                <TabsTrigger value="queue">
                  <UserPlus className="mr-2 h-4 w-4" /> Queue
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="flex-grow">
                <ChatPanel />
              </TabsContent>
              <TabsContent value="streamers">
                <StreamerList />
              </TabsContent>
              <TabsContent value="queue">
                <GuestQueue />
              </TabsContent>
            </Tabs>
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
          <div className="logo">Superstar Stream Center</div>
          <p className="max-w-2xl mx-auto my-4 text-center text-lg text-muted-foreground">
            Welcome to the ultimate destination for live podcasting. Discover new streamers, join the conversation, and even become a guest on the show.
          </p>
          <div className="relative mx-auto max-w-md my-6">
              <Input type="search" placeholder="Search for streamers or topics..." className="w-full !pl-10" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
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
