import { z } from 'zod';

const userLoginSchema = z.object({
    username: z.string().regex(/^[a-zA-Z_]{5,50}$/, 'Username must contain only letters and underscores and must be between 5 and 50 characters long'),
    password: z.string().min(6, 'Password must be at least 6 symbols.').max(20, "Password cannot be over 20 symbols.").refine((value) => {
        const regex = /(?=.*[A-Z])(?=.*[a-z])[A-Za-z]+/;
        if (!regex.test(value)) {
            return false;
        }
        if (!value.includes('@') && !value.includes('_') && !value.includes('~') && !value.includes('|') && !value.includes('-')) {
            return false;
        }
        return true;
    }, 'Password must contain at least one uppercase letter, one lowercase letter, one special character (@, _, ~, |, -)'),

}).strict();

export { userLoginSchema };