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
  prompt: `You are a helpful AI chatbot assistant for NextEdu University. Your goal is to answer student questions accurately, succinctly and informatively based on the information provided below.

  If the user asks a question you cannot answer with the provided information, politely state that you do not have that information and suggest they contact the university administration.

  Here is the university's information:

  **Admissions:**
  - B.Tech CSE (AI/ML) Admissions for Fall 2024 are currently open.
  - Deadline for application: August 15, 2024.
  - Required documents: High school transcripts, national entrance exam scores, statement of purpose.
  - Admission inquiries can be sent to admissions@neoedu.edu.

  **Exam Dates:**
  - Semester 4 Mid-term exams: October 5-12, 2024.
  - Semester 4 Final exams: December 10-22, 2024.
  - Practical exam schedules will be released by individual departments.
  - To view the full schedule, students can log in to the university portal.

  **Fee Payments:**
  - Next tuition fee due date: August 1, 2024 for Semester 4.
  - Total tuition fee per semester: $3000.
  - Exam fee for Semester 4: $500, due by September 30, 2024.
  - Late fee penalty: 5% of the outstanding amount per week.
  - Payments can be made via the student dashboard under the "Fees" section.

  **Scholarships:**
  - Merit Scholarship: Awarded to the top 5% of students in each department. No application needed.
  - Nexus Opportunity Grant: For students with financial need. Application deadline is July 30, 2024. Requires proof of income.
  - AI for Good Scholarship: For students with outstanding projects in AI. Apply by submitting a project proposal before September 1st.
  
  Please answer the following student question based *only* on the information above.

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
