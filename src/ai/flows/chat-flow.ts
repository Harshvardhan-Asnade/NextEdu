'use server';
/**
 * @fileOverview A university assistant chatbot flow.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const universityInfo = `
  University Name: NextEdu University

  Admissions:
  - Programs: B.Tech in Computer Science (Specializations: AI/ML, Cybersecurity, Data Science), BBA, MBA.
  - Admission Deadline: August 15th for Fall semester, January 10th for Spring semester.
  - Requirements: High school diploma (or equivalent), entrance exam score, personal essay.

  Exams:
  - Mid-term exams: Held in October and March.
  - Final exams: Held in December and May.
  - Exam results: Published on the student dashboard within 3 weeks of the final exam date.

  Fees:
  - Tuition Fee (B.Tech): ₹1,25,000 per semester.
  - Tuition Fee (BBA/MBA): ₹1,50,000 per semester.
  - Exam Fee: ₹2,500 per semester.
  - Fee Payment Deadline: First week of every semester. Late fees apply after the due date.
  - Payment can be made through the dashboard via Card, Netbanking, or UPI.

  Scholarships:
  - Merit-Based Scholarship: Available for students with a CGPA above 9.0. Covers 50% of tuition fees.
  - Need-Based Scholarship: Available for students with a family income below ₹5,00,000 per annum. Application required.
`;

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
  question: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  answer: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

const chatPrompt = ai.definePrompt({
    name: 'chatPrompt',
    input: { schema: ChatInputSchema },
    output: { schema: ChatOutputSchema },
    system: `You are the "NextEdu Chatbot", a helpful AI assistant for students at NextEdu University.
Your role is to answer student queries based ONLY on the information provided below.
If a question is asked that cannot be answered with the given information, you must politely state that you do not have that information.
Do not invent or assume any details. Be concise and helpful.

Here is the university information:
${universityInfo}
`,
    prompt: `
{{#each history}}
  {{#if (eq role 'user')}}
    User: {{{content}}}
  {{else}}
    Assistant: {{{content}}}
  {{/if}}
{{/each}}
User: {{{question}}}
Assistant:`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await chatPrompt(input);
    return output!;
  }
);

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}
