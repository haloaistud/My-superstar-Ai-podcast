'use client'

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import { Eye, Calendar, Film } from 'lucide-react';

const archives = [
    { id: 1, title: "Epic Boss Battle & New World Record", views: "1.2M", date: "2 days ago", duration: "4:12:33"},
    { id: 2, title: "Building a Real-time Chat App with Next.js", views: "450k", date: "5 days ago", duration: "2:30:10"},
    { id: 3, title: "Chill Saturday Stream: Q&A and Community Games", views: "89k", date: "1 week ago", duration: "3:05:45"},
    { id: 4, title: "Digital Painting from Scratch: Fantasy Landscape", views: "210k", date: "2 weeks ago", duration: "5:22:01"},
    { id: 5, title: "My First 24-Hour Charity Stream!", views: "2.5M", date: "3 weeks ago", duration: "24:01:50"},
    { id: 6, title: "Deep Dive into Modern CSS Techniques", views: "155k", date: "1 month ago", duration: "1:55:19"},
];

export function ArchiveList() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Past Broadcasts</CardTitle>
                <CardDescription>Review, edit, and publish your past streams.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {archives.map(archive => (
                        <div key={archive.id} className="group flex flex-col overflow-hidden rounded-lg border">
                             <div className="relative aspect-video overflow-hidden bg-secondary flex items-center justify-center">
                                <Film className="w-16 h-16 text-muted-foreground" />
                                <Badge className="absolute bottom-2 right-2">{archive.duration}</Badge>
                            </div>
                            <div className="p-4 bg-card flex flex-col flex-1">
                                <h3 className="font-semibold leading-snug truncate mb-2">{archive.title}</h3>
                                <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-3 w-3" />
                                        <span>{archive.views} views</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>{archive.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
