'use server';
/**
 * @fileOverview A chatbot flow for the NextEdu portal.
 *
 * - chat - A function that handles the chat interaction.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The chatbot response.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `You are "NextEdu Helper," an AI assistant for a student education portal. Your primary role is to answer student questions about the platform.

You should be friendly, helpful, and concise.

Based on the user's question, provide information about how to use the dashboard. Here are some common topics:
- **Attendance:** Students can view their subject-wise and overall attendance in the "Attendance" tab.
- **Exams:** Exam results, grades, and CGPA are available in the "Exam" tab.
- **Fees:** Fee payment status and history can be found in the "Fees" tab.
- **Profile:** Students can view their personal details on the right-hand side of the dashboard.
- **Announcements:** Teachers and Admins post announcements on the main dashboard overview.

If you cannot answer the question or if the user needs specific help with their data (e.g., "Why is my grade wrong?"), you MUST instruct them to contact their assigned faculty mentor or the administration office. Do not make up answers about personal data.

User's message: {{{message}}}
`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
