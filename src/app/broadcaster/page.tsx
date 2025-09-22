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
import { BarChart, Camera, Clapperboard, DollarSign, Video, AlertTriangle } from 'lucide-react';
import { ContentSuggester } from '@/components/content-suggester';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const BroadcasterDashboard: React.FC = () => {
    const router = useRouter();
    const { toast } = useToast();
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean | null>(null);

    React.useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            router.push('/login');
        }
    }, [router]);
    
    React.useEffect(() => {
        const getCameraPermission = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setHasCameraPermission(true);
    
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            toast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: 'Please enable camera permissions in your browser settings to use this feature.',
            });
          }
        };
    
        getCameraPermission();
      }, [toast]);

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
                                <button className="big-btn start">🚀 Go Live</button>
                                <button className="big-btn stop">🛑 End Stream</button>
                            </div>
                            <div className="audio-visualizer">
                                {Array.from({ length: 40 }).map((_, i) => (
                                    <div key={i} className="audio-bar" style={{ animationDelay: `${i * 0.05}s` }}></div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* AI Tools */}
                    <Card>
                        <CardHeader>
                            <CardTitle>AI-Powered Tools</CardTitle>
                             <CardDescription>Leverage AI to enhance your content and reach.</CardDescription>
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
                                <Video className="h-6 w-6 text-primary" />
                                Stream Preview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="aspect-video bg-secondary rounded-md flex items-center justify-center relative">
                                <video ref={videoRef} className="w-full h-full rounded-md" autoPlay muted playsInline />
                                {hasCameraPermission === false && (
                                     <Alert variant="destructive" className="m-4">
                                        <AlertTriangle className="h-4 w-4" />
                                        <AlertTitle>Camera Access Required</AlertTitle>
                                        <AlertDescription>
                                          Please allow camera access to use this feature.
                                        </AlertDescription>
                                    </Alert>
                                )}
                                 {hasCameraPermission === null && (
                                     <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <Camera className="h-8 w-8" />
                                        <span>Awaiting camera...</span>
                                     </div>
                                 )}
                            </div>
                        </CardContent>
                    </Card>

                    <ChatPanel />

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3"><DollarSign className="h-6 w-6 text-primary" /> Monetization</CardTitle>
                            <CardDescription>Manage your channel's subscriptions and donations.</CardDescription>
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
