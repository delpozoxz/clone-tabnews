import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const postgres = await database.query("show server_version;");

  const maxConnections = await database.query("SHOW max_connections;");
  const databaseName = process.env.POSTGRES_DB;

  const ativos = await database.query({
    text: "SELECT count(*) ::int FROM pg_stat_activity where datname = $1;",
    values: [databaseName],
  });
  console.log(ativos);
  response.status(200).json({
    updated_at: updateAt,
    dependencies: {
      database: {
        postgres_version: postgres.rows[0].server_version,
        active_users: ativos.rows[0].count,
        max_connections: maxConnections.rows[0].max_connections,
      },
    },
  });
}

export default status;
