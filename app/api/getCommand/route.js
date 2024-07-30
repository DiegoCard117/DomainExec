import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db = null;

export async function GET(req, res) {
  if (!db) {
    db = await open({
      filename: "./command.db",
      driver: sqlite3.Database,
    });
  }

  const todos = await db.all("SELECT * FROM COMANDOS");

  return new Response(JSON.stringify(todos), {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    status: 200,
  });
}
