"use server";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});
const prisma: PrismaClient =
	globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const getUser = async (id: string) => {
	console.log("getUser", { id });
	const user = await prisma.user.findUnique({ where: { id } });
	console.log("getUser", { user });
	return user;
};
