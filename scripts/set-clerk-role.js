/* Usage: node scripts/set-clerk-role.js <userId> <role>
   Example: node scripts/set-clerk-role.js user_abc123 seller
   This requires environment variables: CLERK_API_KEY
*/
import { Clerk } from '@clerk/clerk-sdk-node';

const userId = process.argv[2];
const role = process.argv[3];

if (!userId || !role) {
  console.error('Usage: node scripts/set-clerk-role.js <userId> <role>');
  process.exit(1);
}

if (!process.env.CLERK_API_KEY) {
  console.error('Set CLERK_API_KEY env var');
  process.exit(1);
}

async function run() {
  const clerk = new Clerk({ apiKey: process.env.CLERK_API_KEY });
  try {
    const user = await clerk.users.getUser(userId);
    const publicMetadata = { ...(user.publicMetadata || {}), role };
    await clerk.users.updateUser(userId, { publicMetadata });
    console.log('Updated user:', userId, 'role ->', role);
  } catch (err) {
    console.error('Failed to update user', err);
    process.exit(1);
  }
}

run();
