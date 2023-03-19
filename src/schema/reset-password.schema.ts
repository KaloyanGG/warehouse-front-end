import { z } from 'zod';

const passwordResetSchema = z.object({
    password: z.string()
        .min(6, 'Password must be at least 6 characters long')
        .max(20, 'Password must be at most 20 characters long')
        .refine((value) => {
            const regex = /(?=.*[A-Z])(?=.*[a-z])[A-Za-z]+/;
            if (!regex.test(value)) {
                return false;
            }
            if (!value.includes('@') && !value.includes('_') && !value.includes('~') && !value.includes('|') && !value.includes('-')) {
                return false;
            }
            return true;
        }, 'Password must contain at least one uppercase letter, one lowercase letter, one special character (@, _, ~, |, -)'),
    repeatPassword: z.string()
}).strict().refine((value) => {
    if (value.password !== value.repeatPassword) {
        return false;
    }
    return true;
}, 'Passwords must match');

export default passwordResetSchema;