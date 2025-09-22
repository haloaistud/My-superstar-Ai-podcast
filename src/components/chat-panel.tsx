'use client';

import * as React from 'react';
import { Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const initialMessages = [
  { user: 'StreamFan', text: 'This stream is amazing! 🔥' },
  { user: 'GamerGirl', text: 'Wow, what a play!' },
  { user: 'CodeWizard', text: 'Can you show the code for that last part again?' },
  { user: 'ArtLover', text: 'So much talent! Loving the colors.' },
];

export function ChatPanel() {
  const [messages, setMessages] = React.useState(initialMessages);
  const [newMessage, setNewMessage] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          user: 'You',
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
        <span id="chatViewers">8,192 viewers</span>
      </div>
      <div className="chat-messages" id="chatMessages">
        <div className="chat-message system">
          <span className="username">System</span>
          Welcome to the RealTalk 24/7! Be respectful.
          <span className="timestamp">1m ago</span>
        </div>
        {messages.map((msg, index) => (
          <div key={index} className="chat-message viewer">
             <div className="flex items-center mb-1">
                <div className="w-6 h-6 bg-secondary rounded-full mr-2 flex items-center justify-center">
                    <User className="w-4 h-4 text-muted-foreground"/>
                </div>
                <span className="username">{msg.user}</span>
            </div>
            <div className="pl-8">
                 {msg.text}
                 <span className="timestamp">now</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
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
