'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArchiveList } from '@/components/archive-list';
import { ChatPanel } from '@/components/chat-panel';
import { MonetizationSettings } from '@/components/monetization-settings';
import { PlatformRecommender } from '@/components/platform-recommender';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BarChart, Clapperboard, DollarSign, Rss, Star } from 'lucide-react';
import { ContentSuggester } from '@/components/content-suggester';

const BroadcasterDashboard: React.FC = () => {
    const router = useRouter();

    React.useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            router.push('/login');
        }
    }, [router]);
    
    const handleLogout = () => {
        sessionStorage.removeItem('isLoggedIn');
        router.push('/');
    };

    return (
        <div className="container py-8">
             <div className="header">
                <div className="header-content">
                    <div className="logo">BROADCASTER DASHBOARD</div>
                </div>
                 <Button onClick={handleLogout}>Logout</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stream Control */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <Clapperboard className="h-6 w-6 text-primary" />
                                Stream Control
                            </CardTitle>
                            <CardDescription>Start, stop, and manage your live stream.</CardDescription>
                        </CardHeader>
                        <CardContent className="streaming-panel !p-6">
                            <div className="streaming-controls">
                                <button className="big-btn start">🚀 Start Streaming</button>
                                <button className="big-btn stop">🛑 Stop Streaming</button>
                            </div>
                            <div className="audio-visualizer">
                                {Array.from({ length: 30 }).map((_, i) => (
                                    <div key={i} className="audio-bar" style={{ animationDelay: `${i * 0.05}s` }}></div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* AI Tools */}
                    <Card>
                        <CardHeader>
                            <CardTitle>AI-Powered Tools</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <PlatformRecommender />
                             <Separator className="my-6" />
                            <ContentSuggester />
                        </CardContent>
                    </Card>

                    {/* Past Broadcasts */}
                    <ArchiveList />
                </div>

                {/* Side Panel */}
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <BarChart className="h-6 w-6 text-primary" />
                                Live Stats
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="video-player playing !h-64">
                                <div className="channel-info">Your Stream Preview</div>
                            </div>
                        </CardContent>
                    </Card>

                    <ChatPanel />

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3"><DollarSign className="h-6 w-6 text-primary" /> Monetization</CardTitle>
                        </CardHeader>
                         <CardContent>
                            <MonetizationSettings />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default BroadcasterDashboard;
