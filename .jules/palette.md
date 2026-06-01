## 2024-05-17 - Destructive Action Confirmations

**Learning:** Destructive actions (like deleting items) in this app often execute immediately upon button click, which is a poor UX pattern that can lead to accidental data loss and user frustration.
**Action:** When implementing or refactoring destructive actions, wrap the trigger button in an `AlertDialog` (from `@/components/ui/alert-dialog`) to ensure users are prompted for confirmation ("Are you absolutely sure?") before the action executes.
