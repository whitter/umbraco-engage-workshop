## Umbraco Engage Headless Demo

This is a headless instanmce of the [Clean Starter Kit](https://marketplace.umbraco.com/package/clean) by Paul Seal. This branch is the starting point for the workshop, it has NOT been integrated with Umbraco Engage. 

The links below go to files in GitHub that require updating to integrate Umbraco Engage

Engage Service Layer [https://github.com/whitter/umbraco-engage-workshop/blob/frontend-with-segments/src/umbraco/engage.ts]

NextJs Middleware [https://github.com/whitter/umbraco-engage-workshop/blob/frontend-with-segments/src/middleware.ts]

Umbraco page fetch [https://github.com/whitter/umbraco-engage-workshop/blob/frontend-with-segments/src/umbraco/index.ts]

Home Page [https://github.com/whitter/umbraco-engage-workshop/blob/frontend-with-segments/src/app/%5Bsegment%5D/page.tsx]

Dynamic Pages [https://github.com/whitter/umbraco-engage-workshop/blob/frontend-with-segments/src/app/%5Bsegment%5D/%5B...page%5D/page.tsx]


You need a .env.local file

```
NEXT_PUBLIC_UMBRACO_BASE_URL=http://localhost:23142
UMBRACO_REVALIDATE_SECRET='SOMETHING_SECRET'
UMBRACO_REVALIDATE_ACCESS_CONTROL_ORIGIN="*"
```