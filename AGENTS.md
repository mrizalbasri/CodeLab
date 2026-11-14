# Repository Agent Instructions

These rules apply to all work in this repository.

## Git workflow

- Do not develop directly on `main`. Create a focused branch using
  `<type>/<short-kebab-description>`, such as `feat/member-dashboard` or
  `fix/navbar-overflow`.
- Before every commit, synchronize with the latest remote/base branch. Use
  `git pull --ff-only` when the branch tracks a remote; otherwise fetch and
  fast-forward the branch's base. Never overwrite local changes to complete a
  sync.
- Keep commits focused and do not rewrite or force-push published history.
- All features/fixes should be developed on a branch and merged via Pull Request into `main` so that GitHub recognizes co-authored contributions for the **Pair Extraordinaire** badge.

## Commit messages & Attribution

- Every commit MUST use Conventional Commits:
  `type(scope): imperative description`.
- Use lowercase imperative descriptions and keep the subject at 72 characters
  or fewer.
- Allowed types include `feat`, `fix`, `refactor`, `docs`, `style`, `perf`,
  `test`, `build`, `ci`, `chore`, and `revert`.
- When creating git commits in this repository, always include the co-author trailer at the bottom of the commit message (preceded by an empty line) so that contributions are attributed to both accounts:

```text
Co-authored-by: xanom23 <xanom55@gmail.com>
```

### Example Commit Message Format:

```text
feat(auth): redesign login page layout

Co-authored-by: xanom23 <xanom55@gmail.com>
```

## Code standards

- Use strict TypeScript types. Do not introduce `any`; reuse centralized types
  from `lib/types.ts`.
- Use Radix UI Themes and Tailwind CSS 4 according to existing component
  patterns.
- Use `motion/react` for motion; do not add the legacy `framer-motion` package.
- Remove temporary `console.log`, debug output, dead code, and unused imports
  before committing.
- Follow existing localization and accessibility patterns.

## Security and scope

- Never commit `.env` files, API keys, tokens, private keys, or credentials.
- Keep changes focused on the requested task. Do not modify unrelated work.
- Do not run destructive Git, filesystem, or database commands without
  explicit approval.

## Validation

Before opening a pull request, run the checks relevant to the change:

```bash
npx tsc --noEmit
npm run build
npm test -- --run
```

Push the focused branch, open a pull request to `main`, and confirm the CI and
deployment checks pass before merging.
