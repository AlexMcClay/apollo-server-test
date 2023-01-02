import { Context } from "./context";
import prisma from "../lib/prisma";

export const resolvers = {
  Query: {
    links: async (_parent: any, _args: any, _context: any) =>
      await prisma.link.findMany(),
  },
};
