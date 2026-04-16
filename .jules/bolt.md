## 2024-04-16 - [Frontend Performance] Memoize Chart Data Calculation

**Learning:** Data transformation for charts (like `Array.prototype.slice().reverse().map(...)`) inside a React component runs on _every single render_. This becomes a noticeable bottleneck, especially when it involves relatively expensive operations like string formatting and Date parsing (`format(new Date(log.date), 'MM/dd')`) on a potentially large array of items.
**Action:** Always memoize derived state that requires iterating over arrays and performing data transformation/formatting for visualization using `useMemo`. This minimizes main thread blocking and ensures the application stays responsive during fast state updates like typing in form inputs.
