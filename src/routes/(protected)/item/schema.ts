import { z } from 'zod';
export const formSchema = z.object({
	//   username: z.string().min(2).max(50)
	url: z.string(),
	price: z.string().min(1),
	itemId: z.string().min(1)
});
export type FormSchema = typeof formSchema;
