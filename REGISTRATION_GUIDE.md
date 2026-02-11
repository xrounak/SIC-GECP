# 🚀 Event Registration System - Quick Start Guide

## One-Time Setup (Apply Database Migration)

Before users can register with teams, you need to apply the database migration to Supabase:

### Option 1: Supabase Dashboard (Recommended)
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **SQL Editor**
4. Open the file: `supabase/create_event_registrations.sql`
5. Copy the entire SQL content
6. Paste it into the SQL Editor
7. Click **Run** to execute the script

### Option 2: Supabase CLI
```bash
# If you have Supabase CLI installed
supabase db push
```

### Verify Migration
After running the migration, check the `event_registrations` table structure:
- Should have `team_leader_name`, `team_leader_email`, etc.
- Should NOT have old `name` and `email` columns

---

## Testing the Registration Flow

### Quick Test (2 minutes)
1. Open your browser: `http://localhost:5173/events`
2. Click "Register Now" on any upcoming event
3. Fill in team leader details
4. Click "Submit Registration"
5. **Expected**: Success message, modal closes after 3 seconds

### Full Test with Team (5 minutes)
1. Open registration modal
2. Fill team leader: Name, Branch, Year, Email, Mobile
3. Click "+ Add Member" button
4. Fill Team Member 1: Name, Branch, Year
5. Add 2-3 more members (optional)
6. Submit form
7. Check your Telegram channel for notification

---

## Common Test Scenarios

### ✅ Solo Registration (Just Team Leader)
- Fill only team leader fields
- Don't add any members
- Submit → Should succeed

### ✅ Team Registration (Leader + Members)
- Fill team leader fields
- Add 1-4 members
- Fill all member fields
- Submit → Should succeed

### ❌ Validation Errors to Test
- Empty team leader fields → Error
- Invalid email (no @) → Error
- Mobile number < 10 digits → Error
- Partial member info (only name) → Error

---

## Viewing Registrations

### Supabase Dashboard
1. Go to Supabase Dashboard
2. Navigate to **Table Editor**
3. Select `event_registrations` table
4. View all registrations with team data

### Telegram Notifications
- Each registration sends a formatted message
- Includes team leader + all members
- Check your configured Telegram channel

---

## File Reference

| File | Purpose |
|------|---------|
| `supabase/create_event_registrations.sql` | Fresh table creation SQL script |
| `src/components/RegistrationModal.tsx` | The registration popup modal |
| `src/components/EventCard.tsx` | Event cards with "Register Now" |
| `src/types/index.ts` | TypeScript types |

---

## Important Notes

> [!WARNING]
> **Database Migration**: Must be applied to Supabase before the new registration form will work!

> [!IMPORTANT]
> **Old Registrations**: The migration will attempt to preserve old data by moving `name` → `team_leader_name` and `email` → `team_leader_email`

> [!TIP]
> **Testing**: Use the dev server (`npm run dev`) to test locally before deploying

---

## Troubleshooting

### Issue: "Cannot insert into table"
**Solution**: Apply the database migration first

### Issue: Modal doesn't open
**Solution**: Check browser console for errors, ensure dev server is running

### Issue: Form validation not working
**Solution**: All team leader fields are required. Team members are optional but must be complete if any field is filled.

### Issue: Telegram notification not received
**Solution**: Check `.env` file for Telegram bot token and chat ID configuration

---

## Next Steps After Testing

1. ✅ Apply database migration to production Supabase
2. ✅ Test registration flow locally
3. ✅ Test on mobile devices
4. ✅ Deploy to Vercel/production
5. 📧 (Optional) Add dropdowns for Branch/Year
6. 📧 (Optional) Add email confirmation feature
7. 📊 (Optional) Create admin dashboard to view registrations

---

## Quick Commands

```bash
# Start dev server
npm run dev

# Check TypeScript errors
npx tsc --noEmit

# Build for production
npm run build

# Preview production build
npm run preview
```

---

**Status**: ✅ Implementation Complete  
**TypeScript Errors**: ✅ None  
**Ready for**: Manual Testing → Database Migration → Production Deploy
