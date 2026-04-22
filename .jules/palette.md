## 2024-05-18 - Missing Delete Confirmation
**Learning:** Found that destructive actions (like deleting diets) lack confirmation dialogs, which can lead to accidental data loss. Additionally, `shadcn/ui` `AlertDialogAction` requires explicit destructive classes for appropriate visual feedback.
**Action:** Always wrap delete actions in an `AlertDialog` and apply `bg-destructive text-destructive-foreground hover:bg-destructive/90` to the confirmation button to maintain consistency and prevent accidents.
