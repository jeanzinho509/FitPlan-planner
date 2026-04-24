## 2024-05-18 - Adding Explicit Destructive Styling to shadcn/ui AlertDialogAction
**Learning:** The default `AlertDialogAction` component in `shadcn/ui` lacks a built-in destructive styling variant. It defaults to the primary button style.
**Action:** When using `AlertDialogAction` to confirm destructive actions (like deleting items), explicitly add classes `bg-destructive text-destructive-foreground hover:bg-destructive/90` to provide appropriate visual feedback and prevent accidental clicks.
## 2024-04-24 - Consistent Confirmation for Destructive Actions
**Learning:** Found a UX inconsistency where some destructive actions (like deleting a workout) had confirmation dialogues while others (deleting diets or progress logs) deleted immediately on click. Consistent interaction patterns are critical for user confidence and preventing accidental data loss.
**Action:** Always wrap destructive actions (like delete) in an `AlertDialog` for confirmation, ensuring `AlertDialogAction` explicitly uses `bg-destructive` styling for clear visual feedback.
