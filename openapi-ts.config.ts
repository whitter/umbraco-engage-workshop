import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'http://localhost:23142/umbraco/swagger/delivery/swagger.json',
  output: { 
    lint: false,
    path: 'src/api'
  },
  plugins: [
    'legacy/fetch',
    {
        name: '@hey-api/typescript',
        enums: 'typescript'
    },
    {
        dates: true, 
        name: '@hey-api/transformers',
    },
    {
        name: '@hey-api/sdk',
        asClass: true,
        transformer: true
    }
  ],
});