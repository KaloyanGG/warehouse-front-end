import { z } from 'zod';

const productAddSchema = z.object({

    name: z.string()
        .min(1, "Name must be at least 1 character long")
        .max(50, "Name must be at most 50 characters long"),
    description: z.string().max(2000, "Description must be at most 2000 characters long").optional(),
    photo: z.string().optional(),
    buyPrice: z.number().positive("Buy price must be a positive number"),
    sellPrice: z.number().positive("Sell price must be a positive number"),
    count: z.number().positive("Count must be a positive number"),
    type: z.enum(['Хранителни стоки', 'Канцеларски материали', 'Строителни материали'])
}).strict();

export default productAddSchema;
