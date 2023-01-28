
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:9091/graphql",
  documents: "graphql/**/*.graphql",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [
        ]
    }
  }
};

export default config;
