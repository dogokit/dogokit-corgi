import type { User } from "@/generated/prisma/client";

type SeedUser = Pick<User, "name" | "username" | "email" | "emailVerified"> & {
  password: string;
};

export const dataSeedUsers: SeedUser[] = [
  {
    name: "Example Admin",
    username: "admin",
    email: "admin@example.com",
    password: "admin_admin_admin",
  },
  {
    name: "Example Regular User",
    username: "example",
    email: "example@example.com",
    password: "example_example_example",
  },
];
