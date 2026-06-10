import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, float, date } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const userProfiles = mysqlTable("user_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  biotype: mysqlEnum("biotype", ["ectomorph", "mesomorph", "endomorph"]),
  objective: mysqlEnum("objective", ["hypertrophy", "weight_loss", "maintenance", "strength"]),
  gender: mysqlEnum("gender", ["male", "female", "other"]),
  birthDate: date("birthDate"),
  height: float("height"), // in cm
  weight: float("weight"), // in kg
  activityLevel: mysqlEnum("activityLevel", ["sedentary", "light", "moderate", "active", "very_active"]),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const exercises = mysqlTable("exercises", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  muscleGroup: varchar("muscleGroup", { length: 100 }).notNull(), // e.g., Chest, Back, Legs
  equipment: varchar("equipment", { length: 100 }), // e.g., Barbell, Dumbbell, Machine
  type: mysqlEnum("type", ["strength", "cardio", "stretching", "plyometrics", "powerlifting", "olympic_weightlifting", "strongman"]),
  videoUrl: varchar("videoUrl", { length: 500 }),
});

export const workouts = mysqlTable("workouts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id), // Nullable for system templates
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  difficulty: mysqlEnum("difficulty", ["beginner", "intermediate", "advanced"]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const workoutExercises = mysqlTable("workout_exercises", {
  id: int("id").autoincrement().primaryKey(),
  workoutId: int("workoutId").notNull().references(() => workouts.id),
  exerciseId: int("exerciseId").notNull().references(() => exercises.id),
  sets: int("sets").notNull(),
  reps: varchar("reps", { length: 50 }).notNull(), // e.g., "8-12" or "10"
  restTime: int("restTime"), // in seconds
  order: int("order").notNull(), // To maintain exercise order in workout
});

export const meals = mysqlTable("meals", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  calories: int("calories").notNull(),
  protein: float("protein").notNull(),
  carbs: float("carbs").notNull(),
  fats: float("fats").notNull(),
});

export const diets = mysqlTable("diets", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  dailyCalories: int("dailyCalories"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const dietMeals = mysqlTable("diet_meals", {
  id: int("id").autoincrement().primaryKey(),
  dietId: int("dietId").notNull().references(() => diets.id),
  mealId: int("mealId").notNull().references(() => meals.id),
  mealTime: varchar("mealTime", { length: 50 }), // e.g., "Breakfast", "Lunch", "Dinner", "Snack"
  order: int("order").notNull(),
});

export const progressLogs = mysqlTable("progress_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  date: date("date").notNull(),
  weight: float("weight"),
  bodyFat: float("bodyFat"),
  chest: float("chest"),
  waist: float("waist"),
  hips: float("hips"),
  arms: float("arms"),
  legs: float("legs"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  workouts: many(workouts),
  diets: many(diets),
  progressLogs: many(progressLogs),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export const workoutsRelations = relations(workouts, ({ one, many }) => ({
  user: one(users, {
    fields: [workouts.userId],
    references: [users.id],
  }),
  exercises: many(workoutExercises),
}));

export const workoutExercisesRelations = relations(workoutExercises, ({ one }) => ({
  workout: one(workouts, {
    fields: [workoutExercises.workoutId],
    references: [workouts.id],
  }),
  exercise: one(exercises, {
    fields: [workoutExercises.exerciseId],
    references: [exercises.id],
  }),
}));

export const dietsRelations = relations(diets, ({ one, many }) => ({
  user: one(users, {
    fields: [diets.userId],
    references: [users.id],
  }),
  meals: many(dietMeals),
}));

export const dietMealsRelations = relations(dietMeals, ({ one }) => ({
  diet: one(diets, {
    fields: [dietMeals.dietId],
    references: [diets.id],
  }),
  meal: one(meals, {
    fields: [dietMeals.mealId],
    references: [meals.id],
  }),
}));

export const progressLogsRelations = relations(progressLogs, ({ one }) => ({
  user: one(users, {
    fields: [progressLogs.userId],
    references: [users.id],
  }),
}));


export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = typeof userProfiles.$inferInsert;
export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = typeof exercises.$inferInsert;
export type Workout = typeof workouts.$inferSelect;
export type InsertWorkout = typeof workouts.$inferInsert;
export type WorkoutExercise = typeof workoutExercises.$inferSelect;
export type InsertWorkoutExercise = typeof workoutExercises.$inferInsert;
export type Meal = typeof meals.$inferSelect;
export type InsertMeal = typeof meals.$inferInsert;
export type Diet = typeof diets.$inferSelect;
export type InsertDiet = typeof diets.$inferInsert;
export type DietMeal = typeof dietMeals.$inferSelect;
export type InsertDietMeal = typeof dietMeals.$inferInsert;
export type ProgressLog = typeof progressLogs.$inferSelect;
export type InsertProgressLog = typeof progressLogs.$inferInsert;
