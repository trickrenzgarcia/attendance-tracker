import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

export async function authValidate(username: string, password: string) {
  const prisma = new PrismaClient();

  try {
    const user = await prisma.users.findFirst({
      where: { username: username },
    });
    if (user) {
      const match = await compare(password, user.password);
      if (!match) {
        return null;
      }

      return user;
    }

    return null;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}
