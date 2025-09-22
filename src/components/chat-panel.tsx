'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const initialMessages = [
  { user: 'StreamFan', avatar: PlaceHolderImages[1].imageUrl, text: 'This stream is amazing! 🔥' },
  { user: 'GamerGirl', avatar: PlaceHolderImages[2].imageUrl, text: 'Wow, what a play!' },
  { user: 'CodeWizard', avatar: PlaceHolderImages[3].imageUrl, text: 'Can you show the code for that last part again?' },
  { user: 'ArtLover', avatar: PlaceHolderImages[0].imageUrl, text: 'So much talent! Loving the colors.' },
];

export function ChatPanel() {
  const [messages, setMessages] = React.useState(initialMessages);
  const [newMessage, setNewMessage] = React.useState('');
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
        // This is a bit of a hack to get the viewport element.
        // The third child is typically the viewport in shadcn's ScrollArea.
        const viewport = scrollAreaRef.current.children[1] as HTMLDivElement;
        if(viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          user: 'You',
          avatar: Place-HolderImages[0].imageUrl,
          text: newMessage,
        },
      ]);
      setNewMessage('');
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Live Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full max-h-[calc(100vh-25rem)] pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.avatar} />
                  <AvatarFallback>
                    {msg.user.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{msg.user}</p>
                  <div
                    className={cn(
                      'text-sm p-2 rounded-lg mt-1',
                      msg.user === 'You'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Send a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
