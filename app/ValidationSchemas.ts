import { Status } from "@prisma/client";
import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(3).max(65535),
  status: z.nativeEnum(Status).optional(),
});
export const PatchIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  description: z.string().min(3).max(65535).optional(),
  assignedToUserId: z
    .string()
    .min(1, "assiged is required")
    .max(255)
    .optional()
    .nullable(),
  status: z.nativeEnum(Status).optional(),
});
