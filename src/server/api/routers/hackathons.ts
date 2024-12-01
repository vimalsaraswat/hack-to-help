// import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { HackathonStatus } from "~/server/db/enums";
// import { HackathonStatus } from "~/server/db/enums";
import { hackathons } from "~/server/db/schema";

export const hackathonRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        status: z.nativeEnum(HackathonStatus),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(hackathons).values({
        name: input.name,
        description: input.description,
        startDate: input.startDate,
        endDate: input.endDate,
        organizerId: ctx.session.user.id,
        status: input.status,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const hackathons = await ctx.db.query.hackathons.findMany({ limit: 20 });
    return hackathons;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
