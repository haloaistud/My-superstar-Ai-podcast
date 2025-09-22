'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addMaintenanceLog } from '@/ai/flows/maintenance-log';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BookCheck } from 'lucide-react';

const formSchema = z.object({
  logType: z.enum(['error', 'debug', 'info', 'warning']),
  message: z.string().min(10, 'Log message must be at least 10 characters.'),
  component: z.string().min(3, 'Component name is required.'),
});

export default function MaintenanceLogPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [logs, setLogs] = React.useState<z.infer<typeof formSchema>[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logType: 'info',
      message: '',
      component: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await addMaintenanceLog(values);
      setLogs((prev) => [...prev, result]);
      toast({
        title: 'Log Added',
        description: 'The maintenance log has been successfully recorded.',
      });
      form.reset();
    } catch (error) {
      console.error('Error adding maintenance log:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add maintenance log.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container py-8">
      <div className="header">
        <div className="header-content">
          <div className="logo">MAINTENANCE LOG</div>
          <div className="subtitle">System Debugging & Error Handling</div>
        </div>
        <Button onClick={() => router.push('/')}>Go Home</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Log Entry</CardTitle>
            <CardDescription>
              Submit a new log for errors, debugging, or system info.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="logType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Log Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a log type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="error">Error</SelectItem>
                          <SelectItem value="debug">Debug</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="component"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Component / Feature</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., ChatPanel, WebRTC, API" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Log Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the event, error, or info..."
                          className="resize-none"
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
                    <BookCheck className="mr-2 h-4 w-4" />
                  )}
                  Add Log
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Logs</CardTitle>
            <CardDescription>
              A view of the most recent log entries.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {logs.length === 0 ? (
              <p className="text-muted-foreground text-center">No logs yet.</p>
            ) : (
              <div className="space-y-4">
                {logs.map((log, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold capitalize">{log.logType}</p>
                            <p className="text-sm text-muted-foreground">{log.component}</p>
                        </div>
                        <Badge variant={log.logType === 'error' ? 'destructive' : 'secondary'}>{log.logType}</Badge>
                    </div>
                    <p className="mt-2 text-sm">{log.message}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
