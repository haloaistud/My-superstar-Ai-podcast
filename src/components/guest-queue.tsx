'use client';

import * as React from 'react';
import { Hand, UserCheck, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const queue = [
    { id: 1, name: 'CreativeCat', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 2, name: 'LogicLeap', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
    { id: 3, name: 'SynthWave', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
    { id: 4, name: 'PixelPioneer', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d' },
];

export function GuestQueue() {
    const { toast } = useToast();
    const [isBroadcaster, setIsBroadcaster] = React.useState(false); // This would come from auth context

    const handleJoinQueue = () => {
        toast({
            title: 'You have joined the queue!',
            description: 'The broadcaster will be notified. Please wait for approval.',
        });
    };

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <div className="space-y-3">
                    <h4 className="text-sm font-medium">Request to Speak</h4>
                    {queue.map((user) => (
                        <div key={user.id} className="flex items-center">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                <p className="text-xs text-muted-foreground">Wants to join</p>
                            </div>
                            {isBroadcaster && (
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <UserCheck className="h-4 w-4 text-green-500" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <X className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                 <Button className="w-full" onClick={handleJoinQueue}>
                    <Hand className="mr-2 h-4 w-4" /> Join Queue to Speak
                </Button>
            </CardContent>
        </Card>
    );
}
