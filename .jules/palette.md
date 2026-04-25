## 2024-05-18 - Adding Explicit Destructive Styling to shadcn/ui AlertDialogAction
**Learning:** The default `AlertDialogAction` component in `shadcn/ui` lacks a built-in destructive styling variant. It defaults to the primary button style.
**Action:** When using `AlertDialogAction` to confirm destructive actions (like deleting items), explicitly add classes `bg-destructive text-destructive-foreground hover:bg-destructive/90` to provide appropriate visual feedback and prevent accidental clicks.
## 2024-04-25 - Prevent Data Loss with Explicit Dialog Confirmations
**Learning:** Destructive actions without confirmation dialogues risk accidental data loss and negatively impact UX. Furthermore, the default `AlertDialogAction` component lacks a built-in destructive styling variant, leading to a confusing visual hierarchy when confirming deletion.
**Action:** Always wrap destructive actions (e.g., delete buttons) in an `AlertDialog` confirmation dialogue. Additionally, explicitly add classes like `bg-destructive text-destructive-foreground hover:bg-destructive/90` to the `AlertDialogAction` for appropriate visual feedback.
