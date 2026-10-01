import { join } from "node:path";
import migrationRunner from "node-pg-migrate";
import database from "/infra/database.js";

export default async function migrations(request, response) {
  const dbCLient = await database.getNewClient();
  const defaultMigrationOptions = {
    dbClient: dbCLient,
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const  pendingMigrations = await migrationRunner(defaultMigrationOptions);
    await dbCLient.end();
    return response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,  
    });
    await dbCLient.end();
    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }
    return response.status(200).json(migratedMigrations);
  }

  return response.status(405).end();
}
