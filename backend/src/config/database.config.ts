// Dummy database configuration - using in-memory data instead of PostgreSQL
export const getDatabaseConfig = () => ({
  type: 'sqlite',
  database: ':memory:',
  entities: [],
  synchronize: true,
  logging: false,
});
