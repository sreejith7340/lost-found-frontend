# Email Notification Feature - Implementation Guide

## Overview
Automated email notifications have been added to your Lost & Found system. When an admin approves a claim, the system sends:
1. **Email to Claimant** - Contains details of the person who reported the item
2. **Email to Reporter** - Notifies them that a claim has been approved

## What Was Added

### Files Created/Modified

1. **`config/email.js`** (NEW)
   - Email service configuration using Nodemailer
   - Two main functions:
     - `sendClaimApprovalEmail()` - Sends details to claimant
     - `sendClaimNotificationToReporter()` - Notifies reporter

2. **`controllers/adminController.js`** (MODIFIED)
   - Updated `updateClaimStatus()` to send emails when claim is approved
   - Automatically gathers reporter/finder details from the item
   - Handles errors gracefully

3. **`package.json`** (MODIFIED)
   - Added `nodemailer` dependency

4. **`.env.example`** (NEW)
   - Configuration template for email setup

## Setup Instructions

### Step 1: Configure Environment Variables
Copy `.env.example` to `.env` (if not already done) and add your email credentials:

```bash
copy .env.example .env
```

Edit `.env` with your email configuration:

```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Step 2: Gmail Configuration (Recommended)
If using Gmail:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Visit https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Use the generated 16-character password in `.env`

3. **Important**: Use the App Password, NOT your regular Gmail password

### Step 3: Alternative Email Services
For other services, modify `.env`:

**Outlook:**
```
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

**Custom SMTP:**
```
EMAIL_SERVICE=smtp
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-password
```

## How It Works

### When Admin Approves a Claim:

1. Admin navigates to Claims in dashboard
2. Admin approves a claim with status "approved"
3. System automatically:
   - Updates claim status in database
   - Updates item status to "claimed"
   - Retrieves reporter/finder details from the item
   - Retrieves claimant details from the claim
   - **Sends email to claimant** with reporter contact details
   - **Sends email to reporter** with claimant contact details

### Email Contents

**Email to Claimant includes:**
- Claim approval confirmation
- Item details (name, ID, category)
- Reporter/Finder contact information (name, email, phone)
- Item description and location information
- Date the item was lost/found

**Email to Reporter includes:**
- Claim approval notification
- Claimant contact information (name, email, phone)
- Item details
- Request to coordinate with claimant

## API Endpoint

```
PUT /api/admin/claims/:id/status
```

**Request Body:**
```json
{
    "status": "approved",
    "adminNote": "Contact details verified"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Claim approved successfully.",
    "claim": { ... }
}
```

## Error Handling

- If email sending fails, the claim is still approved but logged in console
- No email errors block the claim approval process
- Check server logs for email-specific errors

## Testing

### Test Email Sending:
```javascript
// Add to your test file or route
const { sendClaimApprovalEmail } = require('./config/email');

const result = await sendClaimApprovalEmail(
    {
        claimant: { name: "John Doe", email: "john@example.com" },
        itemName: "Keys",
        itemId: "123456"
    },
    {
        name: "Jane Finder",
        email: "jane@example.com",
        phone: "555-1234",
        description: "Silver car keys",
        category: "Keys",
        locationFound: "Library",
        dateFound: new Date(),
        adminNote: ""
    },
    "found"
);

console.log(result);
```

## Troubleshooting

### Email not sending?
1. Check `.env` file has correct EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD
2. For Gmail: Ensure App Password (not regular password) is used
3. Check server logs for specific error messages
4. Verify email addresses are valid in database

### "535-5.7.8 Username and Password not accepted" Error?
This is the most common Gmail authentication error. **Solution:**

1. **Enable 2-Factor Authentication** on your Gmail account:
   - Go to https://myaccount.google.com/security
   - Under "Signing in to Google", enable 2-Step Verification

2. **Generate App Password**:
   - Visit https://myaccount.google.com/apppasswords
   - Sign in if prompted
   - Select "Mail" and "Windows Computer" (or any device)
   - Copy the 16-character password

3. **Update .env file**:
   ```
   EMAIL_PASSWORD=abcd-efgh-ijkl-mnop  # Your 16-char App Password
   ```

4. **Test the configuration**:
   - Run `test-email.bat` in your project folder
   - Or restart your server and try approving a claim

**Important**: Gmail App Passwords are different from your regular password and are required for third-party apps.

### Gmail authentication fails?
- Only 16-character App Passwords work, not regular passwords
- Ensure 2FA is enabled on Gmail account first
- Try regenerating the App Password
- Make sure you're using the correct Gmail account

### SMTP errors?
- Verify SMTP server address and port are correct
- Some providers require specific authentication methods
- Check if firewall is blocking the email port

## Security Notes

- **Never** commit `.env` file to version control
- Use environment variables for all sensitive data
- Consider using a dedicated email account for this service
- Gmail App Passwords are safer than regular passwords

## Future Enhancements

Potential improvements:
- Add email templates in database
- Schedule bulk email notifications
- Add email logging/history
- Send emails before claim approval (e.g., when item is found)
- Add SMS notifications
- Allow reporters to opt-in/out of notifications

## Support

For issues or questions about email setup, check:
- Nodemailer documentation: https://nodemailer.com/
- Gmail App Passwords: https://support.google.com/accounts/answer/185833
