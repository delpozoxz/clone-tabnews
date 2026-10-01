import { Client } from "pg";

async function query(queryObject) {
  let client
  try {
    client =await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("Erro ao conectar ou consultar o banco de dados:");
    throw error;
  } finally {
    await client.end();
  }
}
async function getNewClient() {  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    ssl: getSSLValues(),
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  return client;
}

export default {
  query,
  getNewClient
};
  
function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}
