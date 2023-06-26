# prisma-postgres

```bash
tcs init
prisma init
yarn add @prisma/client
yarn prisma migrate dev --name init
yarn ts-node ./prisma/seed.ts
```

Generate revert sql script for new migration

```bash
yarn prisma migrate diff  --from-schema-datamodel prisma/schema.prisma  --to-schema-datasource prisma/schema.prisma  --script >
down.sql
yarn prisma migrate resolve --rolled-back full_name_migration
```
