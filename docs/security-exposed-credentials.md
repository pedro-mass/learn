# Exposed credentials remediation (learn repo)

## What happened

A 2015 MEAN tutorial config under `javascript/mean/hackhands/MEAN_MVC_3rdTutorial/` contained real Facebook and Twitter OAuth app credentials in git. They were reported in 2026 as still valid on Twitter (developer app id `7767874`, read-only).

## Current tree (after scrub)

| Path | Status |
| --- | --- |
| `javascript/mean/hackhands/MEAN_MVC_3rdTutorial/config/env/development.js` | Uses `process.env` only (no literals) |
| `javascript/mean/hackhands/MEAN_MVC_3rdTutorial/config/env/development.example.js` | Placeholders for local setup |
| Other `javascript/mean/**/config/env/*.js` | Tutorial placeholders (`APP_SECRET`, `CONSUMER_SECRET`, or `process.env`) — no Pedro-owned live keys found on `main` |

Full-repo scan on `main` (`git grep` for long `clientSecret` literals): **one file** had real secrets before this fix.

## You must still do (human gates)

1. **Rotate / revoke** the Twitter app (portal.developer.twitter.com) and the Facebook app (developers.facebook.com). Scrubbing git does not invalidate keys already copied from history.
2. **Rewrite git history** so old blobs are not fetchable (steps below). A commit on `main` alone is not enough.
3. After force-push, open GitHub **Settings → Secret scanning** and confirm alerts clear (may take time).

## Env vars for the MEAN MVC tutorial

```bash
export PORT=1337
export MONGODB_URI='mongodb://localhost/todos'
export FACEBOOK_CLIENT_ID='...'
export FACEBOOK_CLIENT_SECRET='...'
export TWITTER_CLIENT_ID='...'
export TWITTER_CLIENT_SECRET='...'
```

Optional: copy `development.example.js` to `development.local.js` and wire your loader if the app supports it.

## History rewrite (`git filter-repo`)

Install: `brew install git-filter-repo`

From a **fresh bare mirror** (recommended for large repos):

```bash
git clone --mirror git@github.com:pedro-mass/learn.git learn-mirror.git
cd learn-mirror.git
```

Create `replacements.txt` (one line per substitution; use the **exact** strings that were committed — from your rotation notes, not from this doc):

```text
literal:OLD_FACEBOOK_APP_ID==>REDACTED
literal:OLD_FACEBOOK_SECRET==>REDACTED
literal:OLD_TWITTER_CONSUMER_KEY==>REDACTED
literal:OLD_TWITTER_CONSUMER_SECRET==>REDACTED
```

Run:

```bash
git filter-repo --replace-text replacements.txt --force
git push --force --all
git push --force --tags
```

Then re-clone any local copies. Tell collaborators to re-clone; old clones still contain secrets.

### Verify history

```bash
git log -S 'OLD_TWITTER_CONSUMER_KEY' --all   # should return nothing
git grep 'OLD_FACEBOOK_SECRET' $(git rev-list --all)  # should return nothing
```

## Reply template (security reporter)

> Thanks for the report. I revoked and rotated the Twitter/Facebook keys and removed them from the repository and git history. Appreciate you flagging it.
