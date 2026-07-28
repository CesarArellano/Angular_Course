# Path Rule: Angular HTML Template Standards

# Matches: src/**/*.html

This rule triggers automatically when editing or creating any Angular HTML template.

## HTML Best Practices

- **Strict Control Flow:** Use modern `@if`, `@else`, and `@for` syntax. Never inject deprecated `*ngIf` or `*ngFor` directives.
- **Accessibility (a11y):**
  - Every `<img>` tag must have an explicit `alt` attribute.
  - Interactive elements (`<button>`, `<a>`) must have discernable text or an `aria-label`.
- **Tailwind / CSS Layout:**
  - Use flexbox (`flex flex-col`) or grid layout for structural spacing.
  - Avoid hardcoding arbitrary pixel values (use `p-4` instead of `p-[16px]`).

## Binding Prefixes

- Always use the signal evaluation syntax directly in the template: `{{ mySignal() }}`.
- Use event binding parentheses correctly: `(click)="onAction()"` instead of legacy variants.
