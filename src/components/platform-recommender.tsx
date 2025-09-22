'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { recommendPlatforms } from '@/ai/flows/platform-recommendation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Facebook, Twitch, Youtube } from './icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const formSchema = z.object({
  contentType: z
    .string()
    .min(10, 'Please describe your content in at least 10 characters.'),
  audienceDemographics: z
    .string()
    .min(10, 'Please describe your audience in at least 10 characters.'),
});

type PlatformRecommendation = {
  recommendedPlatforms: string[];
  reasoning: string;
};

export function PlatformRecommender() {
  const [recommendation, setRecommendation] =
    React.useState<PlatformRecommendation | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contentType: 'I stream competitive FPS games like Valorant and Apex Legends.',
      audienceDemographics: 'My audience is primarily 16-24 year olds who are into esports and fast-paced action.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await recommendPlatforms(values);
      setRecommendation(result);
      // Auto-select recommended platforms
      setSelectedPlatforms(result.recommendedPlatforms.map(p => p.toLowerCase()));
    } catch (error) {
      console.error('Error getting platform recommendation:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const platforms = [
    { id: 'twitch', label: 'Twitch', icon: <Twitch className="h-6 w-6" /> },
    { id: 'youtube', label: 'YouTube', icon: <Youtube className="h-6 w-6" /> },
    { id: 'facebook', label: 'Facebook Live', icon: <Facebook className="h-6 w-6" /> },
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">AI Platform Recommender</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="contentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Type</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Live competitive gaming, casual art streams"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="audienceDemographics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Teenagers and young adults interested in esports"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Get Recommendations
              </Button>
            </form>
          </Form>
        </div>
        
        <div className="space-y-4">
            <h4 className="font-medium">Configure Social Platforms</h4>
             <Card>
                <CardHeader>
                    <CardTitle>Multistreaming</CardTitle>
                    <CardDescription>Select platforms to broadcast your main stream to.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {platforms.map((platform) => (
                        <div key={platform.id} 
                             className="flex items-center space-x-3 rounded-md border p-4 has-[:checked]:bg-secondary cursor-pointer"
                             onClick={() => handlePlatformToggle(platform.id)}>
                            <Checkbox id={platform.id} checked={selectedPlatforms.includes(platform.id)} />
                            <label
                                htmlFor={platform.id}
                                className="text-sm font-medium leading-none flex-1 flex items-center gap-3 cursor-pointer"
                            >
                                {platform.icon}
                                {platform.label}
                            </label>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {recommendation && (
                <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    AI Suggestion
                </h4>
                <div className="flex flex-wrap gap-2 mb-3">
                    {recommendation.recommendedPlatforms.map((p) => (
                    <Badge key={p} variant="secondary">{p}</Badge>
                    ))}
                </div>
                <p className="text-sm text-muted-foreground">
                    {recommendation.reasoning}
                </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
