# Vercel Portal Authentication Setup

## Problem Summary

The team portal login wasn't working on Vercel production because the environment variable was incorrectly configured.

### Root Cause

- **Local:** Used `PORTAL_PASS` environment variable name
- **Astro Requirement:** Needs `PUBLIC_PORTAL_PASS` prefix to expose variables to client-side code
- **Production:** Vercel didn't have the environment variable set with the correct name

### Solution

All files have been updated to use `PUBLIC_PORTAL_PASS` instead of `PORTAL_PASS`.

---

## Vercel Configuration Steps

### Step 1: Login to Vercel (if not already logged in)

```bash
vercel login
```

Select your authentication method (GitHub recommended).

### Step 2: Link Your Project

```bash
vercel link --yes
```

This will connect your local repository to the Vercel project.

### Step 3: Add Environment Variable

Add the `PUBLIC_PORTAL_PASS` environment variable to Vercel:

```bash
vercel env add PUBLIC_PORTAL_PASS
```

When prompted:

1. **Value:** Enter your password: `seksendoksaniki`
2. **Environments:** Select all three (Production, Preview, Development)
   - Use spacebar to select
   - Press Enter to confirm

Or use this one-liner:

```bash
echo "seksendoksaniki" | vercel env add PUBLIC_PORTAL_PASS production preview development
```

### Step 4: Verify Environment Variables

Check that the variable is set correctly:

```bash
vercel env ls
```

You should see `PUBLIC_PORTAL_PASS` listed for all environments.

### Step 5: Pull Environment Variables (Optional)

To test locally with production environment variables:

```bash
vercel env pull
```

This creates a `.env.local` file with production values.

### Step 6: Deploy to Production

Deploy the updated code to Vercel:

```bash
vercel --prod
```

Or if you want to let GitHub Actions handle deployment:

```bash
git add .
git commit -m "fix: update portal authentication to use PUBLIC_PORTAL_PASS"
git push origin main
```

---

## Testing

### Local Testing

Run the Playwright tests to verify local authentication works:

```bash
# Run all portal tests
npm run test:portal

# Run specific login test
npx playwright test --grep "should login successfully"

# Run in headed mode to see the browser
npm run test:headed
```

### Production Testing

After deploying, test the production deployment:

```bash
# Test against production URL
PRODUCTION_URL=https://www.8092.tr npm run test:production
```

Or manually:

1. Visit https://www.8092.tr/portal
2. Enter password: `seksendoksaniki`
3. You should be successfully logged in and see the internal resources page

---

## Troubleshooting

### Password still not working on production?

1. **Verify environment variable is set:**

   ```bash
   vercel env ls
   ```

   Make sure `PUBLIC_PORTAL_PASS` exists for Production environment.

2. **Check the deployed site:**

   ```bash
   # View the source code of the deployed portal page
   curl https://www.8092.tr/portal | grep "const password"
   ```

   You should see: `const password = "seksendoksaniki";`

   If you see `const password = "defaultpassword";` or `const password = "";`, the environment variable isn't being read.

3. **Force a new deployment:**

   ```bash
   # Redeploy without cache
   vercel --prod --force
   ```

4. **Check Vercel dashboard:**
   - Go to https://vercel.com/dashboard
   - Select your project (8092.tr)
   - Go to Settings > Environment Variables
   - Verify `PUBLIC_PORTAL_PASS` is set to `seksendoksaniki` for all environments

### Clear local cache

If local tests fail:

```bash
# Clear all caches
rm -rf .astro dist node_modules/.astro node_modules/.vite

# Restart dev server
npm run dev
```

### View detailed test results

```bash
# Run tests with UI
npm run test:ui

# Show last test report
npx playwright show-report
```

---

## Security Notes

1. **Password in client-side code:** The current implementation sends the password to the client-side JavaScript. This is acceptable for internal team use but is NOT secure for sensitive data.

2. **For better security:** Consider implementing:
   - Server-side authentication with session tokens
   - OAuth integration
   - Encrypted password comparison

3. **Public environment variables:** Any variable with `PUBLIC_` prefix will be visible in the client-side bundle. This is intentional for this use case but be aware when adding other variables.

---

## Files Changed

The following files were updated to use `PUBLIC_PORTAL_PASS`:

1. `.env` - Local environment variables
2. `.env.example` - Example environment file
3. `src/pages/portal.astro` - Turkish portal page
4. `src/pages/en/portal.astro` - English portal page
5. `tests/portal-auth.spec.ts` - Test files
6. `scripts/debug-portal.sh` - Debug script

---

## Quick Reference

### Environment Variable Names

| Old Name      | New Name             | Purpose                                                 |
| ------------- | -------------------- | ------------------------------------------------------- |
| `PORTAL_PASS` | `PUBLIC_PORTAL_PASS` | Portal authentication password (client-side accessible) |

### Test Commands

| Command                   | Description                     |
| ------------------------- | ------------------------------- |
| `npm run test`            | Run all tests                   |
| `npm run test:portal`     | Run portal authentication tests |
| `npm run test:ui`         | Open Playwright test UI         |
| `npm run test:debug`      | Debug tests step by step        |
| `npm run test:production` | Test against production URL     |

### Vercel Commands

| Command                             | Description                    |
| ----------------------------------- | ------------------------------ |
| `vercel login`                      | Authenticate with Vercel       |
| `vercel link`                       | Link local project to Vercel   |
| `vercel env add PUBLIC_PORTAL_PASS` | Add environment variable       |
| `vercel env ls`                     | List all environment variables |
| `vercel env pull`                   | Download environment variables |
| `vercel --prod`                     | Deploy to production           |

---

## Support

If you continue to experience issues:

1. Run the debug script: `./scripts/debug-portal.sh`
2. Check the test screenshots in `tests/screenshots/`
3. Review the Playwright HTML report: `npx playwright show-report`
4. Contact the development team with the debug output
