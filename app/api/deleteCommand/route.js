import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db = null;

export async function DELETE(req) {
  try {
    const data = await req.json();
    console.log(data);

    if (!db) {
      db = await open({
        filename: "./command.db",
        driver: sqlite3.Database,
      });
    }

    db.run(`DELETE FROM COMANDOS WHERE ID = ${data}`);

    return new Response(JSON.stringify({ message: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
