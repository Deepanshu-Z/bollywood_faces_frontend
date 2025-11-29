import { z } from 'zod';

const signup = z.object({
  email: z.email('Invalid email format'),

  name: z.string().min(4, 'Name must be at least 4 characters'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
});

export default signup;
