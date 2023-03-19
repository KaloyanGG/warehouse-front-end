import { z } from 'zod';

const userRegisterSchema = z.object({
    username: z.string().regex(/^[a-zA-Z_]{5,50}$/, 'Username must contain only letters and underscores and must be between 5 and 50 characters long'),
    email: z.string().email('Email must be a valid email address'),
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
    repeatPassword: z.string(),
    phoneNumber: z.string().regex(/^[0-9\s\-]+$/, "Phone number must container only digits, whitespace and dashes").optional(),
}).strict().refine((value) => {
    if (value.password !== value.repeatPassword) {
        return false;
    }
    return true;
}, 'Passwords must match');

export default userRegisterSchema;