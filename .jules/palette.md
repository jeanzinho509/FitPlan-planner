## 2024-05-18 - Adding Explicit Destructive Styling to shadcn/ui AlertDialogAction
**Learning:** The default `AlertDialogAction` component in `shadcn/ui` lacks a built-in destructive styling variant. It defaults to the primary button style.
**Action:** When using `AlertDialogAction` to confirm destructive actions (like deleting items), explicitly add classes `bg-destructive text-destructive-foreground hover:bg-destructive/90` to provide appropriate visual feedback and prevent accidental clicks.
## 2026-05-01 - Consistent Destructive Confirmation Dialogs
**Learning:** shadcn/ui's `AlertDialogAction` component lacks built-in destructive styling by default. However, across this application, destructive actions (like deletion) consistently use an AlertDialog for confirmation.
**Action:** When creating confirmation dialogs for destructive actions, always explicitly apply `bg-destructive text-destructive-foreground hover:bg-destructive/90` classes to the `AlertDialogAction` for correct visual feedback and to maintain consistency with existing patterns (e.g., Workouts/Diets).
