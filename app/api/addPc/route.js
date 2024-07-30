import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db = null;

export async function POST(req) {
  try {
    const data = await req.json();

    const nome = data[0]["nome"];
    const computador = data[0]["computador"];

    if (!db) {
      db = await open({
        filename: "./command.db",
        driver: sqlite3.Database,
      });
    }

    db.run("INSERT INTO COMPUTADORES (NOME, COMPUTADORES) VALUES (?, ?)", [
      nome,
      computador,
    ]);

    return new Response(JSON.stringify({ message: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
