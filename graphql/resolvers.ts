import { Context } from "./context"
import prisma from "../lib/prisma"

export const resolvers = {
    Query: {
        links: async (_parent, _args, _context) => await prisma.link.findMany()
    },

}