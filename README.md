This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Audit Log System (Admin & User Activity)

This project implements a unified audit logging system for both admin and user activities, designed for traceability and transparency. 

- **Admin Audit Logs** are stored in localStorage under the key `audit-logs` and are viewable at `/admin/audit-logs`.
- **User Audit Logs** are stored in localStorage under the key `user-audit-logs` and are viewable at `/admin/user-audit-logs`.
- Both logs use a similar structure: each entry includes `action`, `actor`, `target`, `timestamp`, `ip`, `status`, and `eventType`.
- The UI for each log features a table with a slider (in the table header) to control the number of rows displayed.
- Navigation links allow switching between admin and user audit logs.

**How to distinguish/filter actions:**
- Admin and user logs are kept in separate tables and storage keys for clarity and performance.
- Each log entry can be filtered by action, actor, date, and searched by keyword.
- The log structure is extensible for future event types or roles.

**Extending the system:**
- To log a new user or admin action, push a new entry to the appropriate localStorage key with the required fields.
- For user activity logging, use the provided helper in user-facing pages (login, profile update, order, report waste, etc).


To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
