import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db = null;

export async function POST(req, res) {
  try {
    const data = await req.json();

    const nome = data[0]["nome"];
    const comando = data[0]["comando"];
    const tipo = data[0]["tipo"];

    if (!db) {
      db = await open({
        filename: "./command.db",
        driver: sqlite3.Database,
      });
    }

    db.run("INSERT INTO COMANDOS (NOME, COMANDOS, TIPO) VALUES (?, ?, ?)", [
      nome,
      comando,
      tipo,
    ]);

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
