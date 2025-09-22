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
          avatar: PlaceHolderImages[0].imageUrl,
          text: newMessage,
        },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
        <div className="chat-header">
            <span>💬 Live Chat</span>
            <span id="chatViewers">7,970 viewers</span>
        </div>
        <div className="chat-messages" id="chatMessages">
            <div className="chat-message system">
                <span className="username">System</span>
                Welcome to the RealTalk 24/7! Be respectful.
                <span className="timestamp">1m ago</span>
            </div>
             {messages.map((msg, index) => (
                <div key={index} className="chat-message viewer">
                    <span className="username">{msg.user}</span>
                    {msg.text}
                    <span className="timestamp">now</span>
                </div>
            ))}
        </div>
        <form onSubmit={handleSendMessage} className="chat-input">
            <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Send a message..."
            />
            <button type="submit">Send</button>
        </form>
    </div>
  );
}
