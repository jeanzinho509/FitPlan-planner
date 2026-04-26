## 2024-05-18 - Adding Explicit Destructive Styling to shadcn/ui AlertDialogAction
**Learning:** The default `AlertDialogAction` component in `shadcn/ui` lacks a built-in destructive styling variant. It defaults to the primary button style.
**Action:** When using `AlertDialogAction` to confirm destructive actions (like deleting items), explicitly add classes `bg-destructive text-destructive-foreground hover:bg-destructive/90` to provide appropriate visual feedback and prevent accidental clicks.
## 2024-05-26 - [Destructive Action Confirmations]
**Learning:** Found that some destructive actions (like deleting a diet) lack an intermediate confirmation dialogue, which poses a risk for accidental data loss. This contrasts with other parts of the app (e.g., workouts) where `AlertDialog` is used correctly.
**Action:** When implementing destructive UI actions, always wrap the action inside a `shadcn/ui` `AlertDialog`. Use `bg-destructive text-destructive-foreground hover:bg-destructive/90` on the `AlertDialogAction` for correct semantic styling.
