'use server';

/**
 * @fileOverview Maintenance log flow for recording system events.
 *
 * - addMaintenanceLog - A function that records a maintenance log entry.
 * - MaintenanceLogInput - The input type for the addMaintenanceLog function.
 * - MaintenanceLogOutput - The return type for the addMaintenanceLog function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MaintenanceLogInputSchema = z.object({
  logType: z.enum(['error', 'debug', 'info', 'warning']).describe('The type of log entry.'),
  message: z.string().describe('The detailed log message.'),
  component: z.string().describe('The component or feature where the log originated.'),
});
export type MaintenanceLogInput = z.infer<typeof MaintenanceLogInputSchema>;

export type MaintenanceLogOutput = MaintenanceLogInput;
const MaintenanceLogOutputSchema = MaintenanceLogInputSchema;


export async function addMaintenanceLog(input: MaintenanceLogInput): Promise<MaintenanceLogOutput> {
  return addMaintenanceLogFlow(input);
}

const prompt = ai.definePrompt({
  name: 'maintenanceLogPrompt',
  input: {schema: MaintenanceLogInputSchema},
  output: {schema: MaintenanceLogOutputSchema},
  prompt: `You are a system administrator. A new maintenance log has been submitted. Acknowledge and format the log entry.

Log Type: {{{logType}}}
Component: {{{component}}}
Message: {{{message}}}

Simply return the input data as the output, confirming it has been "logged".`,
});

const addMaintenanceLogFlow = ai.defineFlow(
  {
    name: 'addMaintenanceLogFlow',
    inputSchema: MaintenanceLogInputSchema,
    outputSchema: MaintenanceLogOutputSchema,
  },
  async input => {
    // In a real application, you would save this to a database or logging service.
    console.log('MAINTENANCE LOG:', input);
    const {output} = await prompt(input);
    return output!;
  }
);
