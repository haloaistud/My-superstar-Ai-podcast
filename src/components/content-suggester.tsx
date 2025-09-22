'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestContent } from '@/ai/flows/content-suggestion';
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
import { Loader2, Wand2, User, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

const formSchema = z.object({
  viewingHistory: z
    .string()
    .min(5, 'Please describe your history in at least 5 characters.'),
  preferences: z
    .string()
    .min(5, 'Please describe your preferences in at least 5 characters.'),
});

type ContentSuggestion = {
  suggestedContent: string;
  suggestedCreators: string;
  reasoning: string;
};

export function ContentSuggester() {
  const [suggestion, setSuggestion] = React.useState<ContentSuggestion | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      viewingHistory: 'I watch a lot of indie game streams and tutorials on React.',
      preferences: 'I like funny commentators and educational content.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestContent(values);
      setSuggestion(result);
    } catch (error) {
      console.error('Error getting content suggestion:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="viewingHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>My Viewing History</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Minecraft streams, cooking shows'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>My Preferences</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Relaxed atmosphere, comedy'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Suggest Content
          </Button>
        </form>
      </Form>

      {suggestion && (
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>Here are your personalized suggestions!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-2"><Video className="h-5 w-5 text-primary" />Suggested Content</h3>
              <p className="text-sm text-muted-foreground">{suggestion.suggestedContent}</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-2"><User className="h-5 w-5 text-primary" />Suggested Creators</h3>
              <p className="text-sm text-muted-foreground">{suggestion.suggestedCreators}</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Reasoning</h3>
              <p className="text-sm text-muted-foreground italic">{suggestion.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
