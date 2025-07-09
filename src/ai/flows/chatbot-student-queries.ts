'use server';

/**
 * @fileOverview An AI chatbot to answer student queries about admissions, exam dates, fee payments, and scholarships.
 *
 * - chatbotStudentQueries - A function that handles the chatbot queries.
 * - ChatbotStudentQueriesInput - The input type for the chatbotStudentQueries function.
 * - ChatbotStudentQueriesOutput - The return type for the chatbotStudentQueries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotStudentQueriesInputSchema = z.object({
  query: z.string().describe('The student query.'),
});
export type ChatbotStudentQueriesInput = z.infer<typeof ChatbotStudentQueriesInputSchema>;

const ChatbotStudentQueriesOutputSchema = z.object({
  answer: z.string().describe('The answer to the student query.'),
});
export type ChatbotStudentQueriesOutput = z.infer<typeof ChatbotStudentQueriesOutputSchema>;

export async function chatbotStudentQueries(input: ChatbotStudentQueriesInput): Promise<ChatbotStudentQueriesOutput> {
  return chatbotStudentQueriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotStudentQueriesPrompt',
  input: {schema: ChatbotStudentQueriesInputSchema},
  output: {schema: ChatbotStudentQueriesOutputSchema},
  prompt: `You are a helpful AI chatbot assistant for students. Your goal is to answer student questions accurately, succinctly and informatively.

  Answer student questions about:
  - Admissions
  - Exam dates
  - Fee payments
  - Scholarships
  
  Question: {{{query}}}
  `,
});

const chatbotStudentQueriesFlow = ai.defineFlow(
  {
    name: 'chatbotStudentQueriesFlow',
    inputSchema: ChatbotStudentQueriesInputSchema,
    outputSchema: ChatbotStudentQueriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
