This is a NextJs app iontegarted with the Umbraco Clean Starter Kit by Paul Seal

## Getting Started

You'll need a env.local file, I use this one

```typescript
NEXT_PUBLIC_UMBRACO_BASE_URL=http://localhost:23142/
UMBRACO_REVALIDATE_SECRET='SOMETHING_SECRET'
UMBRACO_REVALIDATE_ACCESS_CONTROL_ORIGIN="*"
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

