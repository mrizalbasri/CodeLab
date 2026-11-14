# Repository Agent Instructions

## Before committing

Pull the latest changes from the tracked remote branch before creating every
commit. Use a fast-forward-only pull when possible, and resolve conflicts
before committing. Never overwrite local changes to complete the pull.

## Commit format

Do not add `Co-authored-by` trailers or any other assistant attribution to
commit messages in this repository. Every commit MUST use the repository's
Conventional Commits format (`type(scope): description`), and MUST NOT include
additional co-author lines.

This rule applies to new commits only. Do not rewrite or force-push existing
history solely to remove attribution trailers.
