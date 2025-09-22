'use client';

import * as React from 'react';
import { Mic, Podcast, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const streamers = [
  { id: 1, name: 'TheMainEvent', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026702d', isLive: true, role: 'Host' },
  { id: 2, name: 'IndieVibes', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026703d', isLive: true, role: 'DJ' },
  { id: 3, name: 'NerdZone', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', isLive: false, role: 'Guest' },
  { id: 4, name: 'Guest1', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d', isLive: true, role: 'Guest' },
];

export function StreamerList() {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">In this Stream</h4>
          {streamers.map((user) => (
            <div key={user.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium leading-none flex items-center">
                  {user.name}
                  {user.isLive && <Mic className="ml-2 h-4 w-4 text-green-500" />}
                </p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
