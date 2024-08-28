import { z } from "zod";

export const signUpSchema = z.object({
   firstName: z.string().min(2, { message: 'First name must be at least 2 chars' }),
   lastName: z.string().min(2, { message: "Last name must be at least 2 chars" }),
   email: z.string().min(1, { message: "Email address is required" })
      .email({ message: "Invalid email address" }),
   role: z.string().min(1, { message: "Choose a role" }),
   password: z.string().min(8, { message: "Password must be at least 8 chars" }),
   confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
}).refine(input => (input.password === input.confirmPassword), {
   message: "Password & Confirm Password doesn't match",
   path: ["confirmPassword"],
});  // refine for custom validation
