'use server';

/**
 * @fileOverview Content suggestion flow for recommending content and creators to viewers.
 *
 * - suggestContent - A function that suggests content based on viewing history and preferences.
 * - ContentSuggestionInput - The input type for the suggestContent function.
 * - ContentSuggestionOutput - The return type for the suggestContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentSuggestionInputSchema = z.object({
  viewingHistory: z
    .string()
    .describe('The viewing history of the user, including content types, creators, and topics.'),
  preferences: z.string().describe('The user preferences for content.'),
});
export type ContentSuggestionInput = z.infer<typeof ContentSuggestionInputSchema>;

const ContentSuggestionOutputSchema = z.object({
  suggestedContent: z
    .string()
    .describe('A list of suggested content titles or descriptions.'),
  suggestedCreators: z
    .string()
    .describe('A list of suggested creator names or profiles.'),
  reasoning: z.string().describe('The AI reasoning for the suggestions.'),
});
export type ContentSuggestionOutput = z.infer<typeof ContentSuggestionOutputSchema>;

export async function suggestContent(input: ContentSuggestionInput): Promise<ContentSuggestionOutput> {
  return suggestContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contentSuggestionPrompt',
  input: {schema: ContentSuggestionInputSchema},
  output: {schema: ContentSuggestionOutputSchema},
  prompt: `You are a content recommendation expert. Based on the user's viewing history and preferences, suggest content and creators they might enjoy.

Viewing History: {{{viewingHistory}}}
Preferences: {{{preferences}}}

Format your response as follows:

Suggested Content: [List of content]
Suggested Creators: [List of creators]
Reasoning: [Explanation of why these suggestions were made]`,
});

const suggestContentFlow = ai.defineFlow(
  {
    name: 'suggestContentFlow',
    inputSchema: ContentSuggestionInputSchema,
    outputSchema: ContentSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
