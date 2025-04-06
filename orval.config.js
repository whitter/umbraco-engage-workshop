module.exports = {
    'umbraco-transfomer': {
      output: {
        mode: 'tags-split',
        target: './src/api/client.ts',
        baseUrl: 'http://localhost:23142/',
        schemas: './src/api/model',
        client: 'fetch',
        override: {
            mutator: {
                path: './src/custom-fetch.ts',
                name: 'customFetch',
            },
        },
      },
      input: {
        target: 'http://localhost:23142/umbraco/swagger/delivery/swagger.json',
      },
    },
  };