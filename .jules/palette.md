## 2026-04-19 - Destructive actions in AlertDialog
**Learning:** Destructive actions lack confirmation in Diets, Workouts, and Progress which could lead to accidental data loss. The default `AlertDialogAction` component in shadcn/ui doesn't have a built-in destructive styling variant without explicitly adding classes.
**Action:** Add `AlertDialog` around Delete buttons, and ensure the action button uses `bg-destructive text-destructive-foreground hover:bg-destructive/90` classes for appropriate visual feedback.
