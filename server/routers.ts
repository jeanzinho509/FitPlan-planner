import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { getDb } from "./db";
import { userProfiles, workouts, diets, progressLogs } from "../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";
import { z } from "zod";

const profileSchema = z.object({
  biotype: z.enum(["ectomorph", "mesomorph", "endomorph"]).optional(),
  objective: z.enum(["hypertrophy", "weight_loss", "maintenance", "strength"]).optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  birthDate: z.string().optional(), // ISO Date string
  height: z.number().min(0).optional(),
  weight: z.number().min(0).optional(),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]).optional(),
});

const workoutSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
});

const dietSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  dailyCalories: z.number().min(0).optional(),
});

const progressSchema = z.object({
  date: z.string(), // ISO Date string
  weight: z.number().min(0).optional(),
  bodyFat: z.number().min(0).optional(),
  chest: z.number().min(0).optional(),
  waist: z.number().min(0).optional(),
  hips: z.number().min(0).optional(),
  arms: z.number().min(0).optional(),
  legs: z.number().min(0).optional(),
  notes: z.string().optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  profile: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const profile = await db.select().from(userProfiles).where(eq(userProfiles.userId, ctx.user.id)).limit(1);
      return profile[0] || null;
    }),
    update: protectedProcedure.input(profileSchema).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const existing = await db.select().from(userProfiles).where(eq(userProfiles.userId, ctx.user.id)).limit(1);

      const dataToSave = {
        ...input,
        userId: ctx.user.id,
        birthDate: input.birthDate ? new Date(input.birthDate) : undefined,
      };

      if (existing.length > 0) {
        await db.update(userProfiles).set(dataToSave).where(eq(userProfiles.userId, ctx.user.id));
      } else {
        await db.insert(userProfiles).values(dataToSave);
      }
      return { success: true };
    }),
    estimateMaxNatural: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const profile = await db.select().from(userProfiles).where(eq(userProfiles.userId, ctx.user.id)).limit(1);

      if (!profile.length) return null;

      const p = profile[0];
      if (!p.height || !p.weight) return { message: "Please update height and weight in profile." };

      const heightM = p.height / 100;
      const weightKg = p.weight;
      const bmi = weightKg / (heightM * heightM);

      // Casey Butt's formula for maximum lean body mass
      // lean_body_mass = height^2 * (29 + 6.1 * (1.8 - height))
      // This is a simplification and usually requires ankle/wrist measurements for accuracy.
      // But we can give a rough estimate or just return BMI and some general info.

      // FFMI = (Weight * (1 - BodyFat%)) / Height^2
      // Max natural FFMI is roughly 25.

      return {
        bmi: parseFloat(bmi.toFixed(2)),
        message: "To get a better estimate (FFMI), please track body fat percentage in Progress.",
        // Placeholder for max potential calculation
        maxPotentialWeightAt10PercentBF: ((25 * (heightM * heightM)) / 0.9).toFixed(2)
      };
    }),
  }),
  workouts: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      return await db.select().from(workouts).where(eq(workouts.userId, ctx.user.id));
    }),
    create: protectedProcedure.input(workoutSchema).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      await db.insert(workouts).values({ ...input, userId: ctx.user.id });
      return { success: true };
    }),
    delete: protectedProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      await db.delete(workouts).where(and(eq(workouts.id, input), eq(workouts.userId, ctx.user.id)));
      return { success: true };
    }),
  }),
  diets: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      return await db.select().from(diets).where(eq(diets.userId, ctx.user.id));
    }),
    create: protectedProcedure.input(dietSchema).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      await db.insert(diets).values({ ...input, userId: ctx.user.id });
      return { success: true };
    }),
    delete: protectedProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      await db.delete(diets).where(and(eq(diets.id, input), eq(diets.userId, ctx.user.id)));
      return { success: true };
    }),
  }),
  progress: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      return await db.select().from(progressLogs).where(eq(progressLogs.userId, ctx.user.id)).orderBy(desc(progressLogs.date));
    }),
    log: protectedProcedure.input(progressSchema).mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      await db.insert(progressLogs).values({
        ...input,
        date: new Date(input.date),
        userId: ctx.user.id
      });
      return { success: true };
    }),
    delete: protectedProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.delete(progressLogs).where(and(eq(progressLogs.id, input), eq(progressLogs.userId, ctx.user.id)));
        return { success: true };
    }),
  }),
});

export type AppRouter = typeof appRouter;
