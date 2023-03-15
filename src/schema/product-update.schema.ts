import { z } from 'zod';

const productUpdateSchema = z.object({
    _id: z.string(),
    name: z.string()
        .min(1, "Name must be at least 1 character long")
        .max(50, "Name must not be over 50 characters long").optional(),
    description: z.string()
        .max(2000, "Description must not be over 2000 characters long.").optional(),
    photo: z.any().optional(),
    buyPrice: z.number().positive().optional(),
    sellPrice: z.number().positive().optional(),
    count: z.number().positive().optional(),
    type: z.enum(['Хранителни стоки', 'Канцеларски материали', 'Строителни материали']).optional()
}).strict();

export default productUpdateSchema;
