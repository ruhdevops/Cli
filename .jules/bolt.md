## 2026-03-25 - Optimized JSON colorization by reducing allocations
**Learning:** `fmt.Fprintf` is significantly slower than `w.Write` and `io.WriteString` in tight loops because it uses reflection to parse the format string. Similarly, `strings.Repeat` inside a loop can cause many small allocations that add up.
**Action:** Use `w.Write` or `io.WriteString` for static strings and escape sequences. Use a manual loop to write indentation instead of `strings.Repeat`. Always benchmark before and after.
