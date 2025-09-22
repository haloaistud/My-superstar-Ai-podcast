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

type View = 'dashboard' | 'archives' | 'settings';

export default function Home() {
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [view, setView] = React.useState<View>('dashboard');
  const isMobile = useIsMobile();

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <DashboardView isStreaming={isStreaming} />;
      case 'archives':
        return <ArchiveList />;
      case 'settings':
        return <MonetizationSettings />;
      default:
        return <DashboardView isStreaming={isStreaming} />;
    }
  };
  
  const navItems = [
    { name: 'Dashboard', icon: LayoutGrid, view: 'dashboard' as View },
    { name: 'Archives', icon: Archive, view: 'archives' as View },
    { name: 'Settings', icon: Settings, view: 'settings' as View },
  ];

  const SidebarNav = ({ inSheet = false }: { inSheet?: boolean }) => (
    <nav className="flex flex-col gap-2 px-4 mt-8">
      {navItems.map((item) => (
        <Button
          key={item.name}
          variant={view === item.view ? 'secondary' : 'ghost'}
          className="justify-start gap-3"
          onClick={() => {
            setView(item.view);
            if (inSheet && isMobile) {
              // Assuming a way to close the sheet, this is a placeholder
            }
          }}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.name}</span>
        </Button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen w-full bg-background grid grid-cols-1 md:grid-cols-[280px_1fr]">
      <aside className="hidden md:flex flex-col border-r bg-muted/40">
        <div className="flex h-16 items-center px-6 border-b">
          <Clapperboard className="h-7 w-7 text-primary" />
          <h1 className="ml-3 text-xl font-headline font-bold">
            Superstar Stream
          </h1>
        </div>
        <SidebarNav />
      </aside>

      <div className="flex flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-6">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader className="h-16 flex flex-row items-center">
                    <Clapperboard className="h-7 w-7 text-primary" />
                    <h1 className="ml-3 text-xl font-headline font-bold">
                        Superstar Stream
                    </h1>
                </SheetHeader>
                <SidebarNav inSheet />
              </SheetContent>
            </Sheet>
          )}

          <div className="flex-1">
            <h2 className="text-2xl font-headline font-semibold capitalize">{view}</h2>
          </div>

          <Button
            onClick={() => setIsStreaming((prev) => !prev)}
            className={cn("gap-2 w-40 transition-all duration-300", isStreaming && 'bg-red-600 hover:bg-red-700')}
          >
            <Mic className="h-5 w-5" />
            <span>{isStreaming ? 'Stop Stream' : 'Start Stream'}</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage
                    src={PlaceHolderImages[0].imageUrl}
                    alt="User avatar"
                  />
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-8 bg-background">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

function DashboardView({ isStreaming }: { isStreaming: boolean }) {
  const [viewerCount, setViewerCount] = React.useState(1357);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStreaming) {
      interval = setInterval(() => {
        setViewerCount((prev) => prev + Math.floor(Math.random() * 11) - 5);
      }, 2000);
    } else {
      setViewerCount(1357);
    }
    return () => clearInterval(interval);
  }, [isStreaming]);

  return (
    <Tabs defaultValue="broadcaster" className="w-full">
      <div className="flex items-center justify-between mb-6">
        <TabsList>
          <TabsTrigger value="broadcaster" className="gap-2">
            <Mic className="h-4 w-4" /> Broadcaster
          </TabsTrigger>
          <TabsTrigger value="viewer" className="gap-2">
            <Users className="h-4 w-4" /> Viewer
          </TabsTrigger>
        </TabsList>
        {isStreaming && (
            <div className="flex items-center gap-2 text-red-500 animate-pulse">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span>LIVE</span>
            </div>
        )}
        <div className="flex items-center gap-2 text-muted-foreground font-medium">
          <Eye className="h-5 w-5" />
          <span>
            {isStreaming
              ? viewerCount.toLocaleString()
              : 'Offline'}
          </span>
        </div>
      </div>

      <TabsContent value="broadcaster">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Stream Preview</CardTitle>
                <CardDescription>
                  This is what your audience sees.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-card-foreground/10 rounded-lg flex items-center justify-center">
                    {isStreaming ? (
                        <Image
                          src={PlaceHolderImages[4].imageUrl}
                          width={1280}
                          height={720}
                          alt="Live Stream"
                          data-ai-hint="gaming stream"
                          className="rounded-lg object-cover"
                        />
                    ) : (
                        <div className="text-center text-muted-foreground">
                            <Clapperboard className="h-12 w-12 mx-auto mb-2" />
                            <p>You are offline</p>
                        </div>
                    )}
                </div>
              </CardContent>
            </Card>
            <PlatformRecommender />
          </div>
          <div className="lg:col-span-1">
            <ChatPanel />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="viewer">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
             <Card className="h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="text-primary h-6 w-6" />
                        Recommended For You
                    </CardTitle>
                    <CardDescription>Discover new content and creators tailored to your taste.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContentSuggester />
                </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
             <Card>
                 <CardHeader>
                    <CardTitle>Top Channels</CardTitle>
                 </CardHeader>
                 <CardContent className="flex flex-col gap-4">
                    {[
                        { name: "GamerX", category: "Gaming", viewers: "12.1k", img: PlaceHolderImages[0].imageUrl },
                        { name: "CreativeCoder", category: "Programming", viewers: "8.7k", img: PlaceHolderImages[1].imageUrl },
                        { name: "MusicMaven", category: "Music", viewers: "5.2k", img: PlaceHolderImages[2].imageUrl },
                        { name: "ArtisanAlly", category: "Art & Crafts", viewers: "3.9k", img: PlaceHolderImages[3].imageUrl },
                    ].map(channel => (
                        <div key={channel.name} className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={channel.img} />
                                <AvatarFallback>{channel.name.substring(0,2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{channel.name}</p>
                                <p className="text-sm text-muted-foreground">{channel.category}</p>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm">
                                <Users className="h-4 w-4" />
                                {channel.viewers}
                            </div>
                        </div>
                    ))}
                 </CardContent>
             </Card>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
