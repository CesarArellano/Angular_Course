# Skill: Generate Standard Domain Feature Folder

Use this playbook to scaffold a new standalone feature module matching our strict enterprise folder structure.

## Context Trigger

Apply this workflow whenever the user asks to "create a feature", "add a new view/page", or "scaffold a domain section".

## Step-by-Step Blueprint

1. **Folder Generation:** Create a directory under `src/app/features/<feature-name>/`.
2. **Sub-folders:** Inside that directory, establish three sub-folders:
   - `components/` (Presentational child components)
   - `services/` (Data fetching and business logic)
   - `models/` (TypeScript interfaces)

3. **Core Component Generation:**
   Run `ng g c features/<feature-name> --standalone --skip-tests=false`
   Immediately modify the generated file to ensure it imports `CommonModule` and sets up `ChangeDetectionStrategy.OnPush`.

4. **State Initialization Example:**
   Every feature service must use an injectable service containing a read-only signal. Ensure it follows this exact pattern:

```typescript
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FeatureNameService {
  // Private writeable signal
  private _state = signal<any>(null);

  // Public read-only signal exposure
  readonly state = this._state.asReadonly();
}
```

## Completion Checklist

- [ ] Folder structure matches exactly.
- [ ] Service exposes state via `.asReadonly()`.
- [ ] Linter pass (`npm run lint`) returns zero errors.
