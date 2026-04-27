# Fitness AI Planner

A complete full-stack TypeScript web application for a monthly fitness progress planner, focused on realistic goals (hypertrophy, weight loss, maintenance, strength), body types, workouts, diets, and "natural maximum" estimations.

## Current Architecture & Tech Stack
- **Frontend (Client):** React, Vite, Wouter (routing), TailwindCSS, shadcn/ui (Radix UI + Framer Motion), React Hook Form, Zod, and tRPC Client for typesafe API calls.
- **Backend (Server):** Express, Node.js, tRPC Server, and Drizzle ORM.
- **Database:** MySQL (using `mysql2` driver) with Drizzle ORM.

## Database Schema Overview
The database (found in `drizzle/schema.ts`) consists of several core tables to manage the fitness planner:
- **Users:** Core authentication table using OAuth (`openId`).
- **User Profiles:** Stores physical attributes (height, weight, body type, objective, activity level).
- **Workouts & Exercises:** Defines exercises, user workouts, and maps exercises to specific workouts (`workout_exercises`).
- **Diets & Meals:** Defines nutritional meals, user diets, and maps meals to diets (`diet_meals`).
- **Progress Logs:** Tracks user weight, body fat, and specific body measurements over time.

## Implemented Features
- **User Authentication:** Basic OAuth flow storing user details.
- **Profile Management:** Users can update their physical profile and fitness goals. Includes a basic calculation for Maximum Natural Potential.
- **Workouts:** Basic CRUD operations allowing users to list, create, and delete their customized workout routines.
- **Diets:** Basic CRUD operations for diet plans.
- **Progress Tracking:** A logging system to record physical progress (weight, body fat percentage, measurements) across dates.
- **Typesafe API:** End-to-end type safety between the frontend components and the backend routes using tRPC.

## Next Steps / Roadmap
- **AI Integration:** Implement AI/Machine Learning models or API endpoints to automatically generate personalized workouts and diet plans based on the user's profile and progress.
- **Detailed Routines:** Expand the frontend UI to handle the mapping of specific exercises into workouts (`workout_exercises`) and meals into diets (`diet_meals`), which exist in the schema but need dedicated UI components.
- **Advanced Estimations:** Refine the "maximum natural limit" calculations by utilizing the user's tracked body fat percentage instead of basic BMI approximations.
- **Data Visualization:** Introduce charts (e.g., using Recharts, which is already in `package.json`) to visualize user progress logs over time.
