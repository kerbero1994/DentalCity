# ConfigCat Feature Flags

This directory contains the ConfigCat feature flags implementation for the application.

## Setup

### 1. Get your ConfigCat SDK Key

1. Sign up for a free account at [ConfigCat](https://configcat.com/)
2. Create a new project or use an existing one
3. Copy your SDK Key from the dashboard

### 2. Configure Environment Variables

Add your SDK key to `.env.local`:

```bash
NEXT_PUBLIC_CONFIGCAT_SDK_KEY=your-sdk-key-here
```

### 3. Wrap your app with the ConfigCatProvider

In your root layout (`app/layout.tsx`):

```tsx
import { ConfigCatProvider } from "@/lib/configcat";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ConfigCatProvider>{children}</ConfigCatProvider>
      </body>
    </html>
  );
}
```

## Usage

### Client-side Components

Use the `useFeatureFlag` hook in client components:

```tsx
"use client";

import { useFeatureFlag, FeatureFlags } from "@/lib/configcat";

export function MyComponent() {
  const isNewFeatureEnabled = useFeatureFlag(FeatureFlags.ENABLE_NEW_HEADER, false);

  return <div>{isNewFeatureEnabled ? <NewHeader /> : <OldHeader />}</div>;
}
```

### Server-side Components

Use the `getFeatureFlag` function in server components or API routes:

```tsx
import { getFeatureFlag, FeatureFlags } from "@/lib/configcat";

export default async function Page() {
  const isMaintenanceMode = await getFeatureFlag(FeatureFlags.MAINTENANCE_MODE, false);

  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }

  return <NormalPage />;
}
```

### User Targeting

Target specific users with custom attributes:

```tsx
import { getFeatureFlag, FeatureFlags } from "@/lib/configcat";
import * as configcat from "configcat-js";

// Create a user object
const user = new configcat.User(
  userId, // Unique user ID
  email, // Email
  undefined, // Country (optional)
  {
    // Custom attributes
    SubscriptionType: "Premium",
    Role: "Admin",
    CompanySize: "Enterprise",
  }
);

// Get flag value for this specific user
const hasAccess = await getFeatureFlag(FeatureFlags.ENABLE_BETA_FEATURES, false, user);
```

## Adding New Feature Flags

1. **Add the flag key to `client.ts`:**

```typescript
export const FeatureFlags = {
  // ... existing flags
  MY_NEW_FEATURE: "myNewFeature",
} as const;
```

2. **Create the flag in ConfigCat Dashboard:**
   - Go to your ConfigCat dashboard
   - Create a new feature flag with the key `myNewFeature`
   - Set default value and targeting rules

3. **Use the flag in your code:**

```tsx
const isMyFeatureEnabled = useFeatureFlag(FeatureFlags.MY_NEW_FEATURE);
```

## Available Hooks

- `useFeatureFlag(key, defaultValue)` - Get feature flag value
- `useIsFeatureEnabled(key)` - Check if flag is enabled (true)
- `useIsFeatureDisabled(key)` - Check if flag is disabled (false)

## Available Functions

- `getFeatureFlag(key, defaultValue, user?)` - Server-side flag check
- `getAllFeatureFlags(user?)` - Get all flags at once
- `disposeConfigCat()` - Clean up ConfigCat client

## Best Practices

1. **Always provide default values** to handle cases where ConfigCat is unavailable
2. **Use meaningful flag names** that describe what the flag controls
3. **Clean up old flags** after features are fully rolled out
4. **Use user targeting** for gradual rollouts and A/B testing
5. **Monitor flag usage** in ConfigCat dashboard to see which flags are actively used

## Configuration Options

The ConfigCat client is configured with:

- **Auto Poll Mode**: Automatically fetches flag updates every 60 seconds
- **Logging**: Info level in development, Warn level in production
- **Graceful Degradation**: Falls back to default values if ConfigCat is unavailable

## Links

- [ConfigCat Documentation](https://configcat.com/docs/)
- [React SDK Documentation](https://configcat.com/docs/sdk-reference/react/)
- [User Targeting](https://configcat.com/docs/advanced/user-object/)
- [Dashboard](https://app.configcat.com/)
