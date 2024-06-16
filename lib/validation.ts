import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: "Username must be at least 1 character" }),
    email: z.string().email("Invalid email").min(1),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const editUserSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username must be at least 1 character" })
    .optional(),
  bio: z.string().optional(),
});

export const addPostSchema = z.object({
  content: z.string().min(1),
  tags: z
    .array(z.string().max(15))

    .max(5, "You can add at most 5 tags"),
});
