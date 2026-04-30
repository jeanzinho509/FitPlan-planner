## 2024-05-18 - Adding Explicit Destructive Styling to shadcn/ui AlertDialogAction
**Learning:** The default `AlertDialogAction` component in `shadcn/ui` lacks a built-in destructive styling variant. It defaults to the primary button style.
**Action:** When using `AlertDialogAction` to confirm destructive actions (like deleting items), explicitly add classes `bg-destructive text-destructive-foreground hover:bg-destructive/90` to provide appropriate visual feedback and prevent accidental clicks.
## 2026-04-30 - Missing destructive styling in AlertDialogAction
**Learning:** shadcn/ui's `AlertDialogAction` component lacks a built-in destructive variant for visually indicating irreversible actions (like delete confirmations).
**Action:** When using `AlertDialogAction` for destructive actions, explicitly apply `className="bg-destructive text-destructive-foreground hover:bg-destructive/90"` to match standard destructive button styling.
