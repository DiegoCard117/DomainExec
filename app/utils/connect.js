// Connect.js file

// Require SQLite3 verbose module
const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database, and if it doesn't exist, create it
const db = new sqlite3.Database(
  "./command.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    // Error handling for connection
    if (err) {
      return console.error(err.message);
    } else {
      // Success message for successful connection
      console.log("Connected to the SQLite database.");
    }
  }
);

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS COMANDOS (
      "ID"	INTEGER,
      "NOME"	TEXT(200) NOT NULL,
      "COMANDOS"	TEXT(10000) NOT NULL,
      "TIPO"	INTEGER NOT NULL,
      PRIMARY KEY("ID" AUTOINCREMENT)
    );`,
    (err) => {
      // Error handling for table creation
      if (err) {
        return console.error(err.message);
      }
      console.log("Created Comandos table");
    },

    db.run(
      `CREATE TABLE IF NOT EXISTS COMPUTADORES (
        "ID"	INTEGER NOT NULL,
        "NOME"	TEXT(250) NOT NULL,
        "COMPUTADORES"	TEXT(99999) NOT NULL,
        PRIMARY KEY("ID" AUTOINCREMENT)
      );`,
      (err) => {
        // Error handling for table creation
        if (err) {
          return console.error(err.message);
        }
        console.log("Created Computadores table");
      },
      db.run(
        `CREATE TABLE IF NOT EXISTS TIPOS (
          "ID"	INTEGER NOT NULL,
          "NOME"	TEXT(150) NOT NULL,
          PRIMARY KEY("ID" AUTOINCREMENT)
        );`,
        async (err) => {
          // Error handling for table creation
          if (err) {
            return console.error(err.message);
          }
          console.log("Created Comandos table");
        }
      )
    )
  );
});

function readDb() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all("SELECT COUNT (*) AS REGISTRO FROM tipos", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rows[0]["REGISTRO"] == 0) {
            db.run(
              "INSERT INTO TIPOS (NOME) VALUES ('CMD'), ('POWERSHELL')",
              (err) => {
                if (err) {
                  console.error("Error inserting initial data:", err.message);
                } else {
                  console.log("Inserted initial data into TIPOS table");
                }
              }
            );
          }
          resolve(rows[0]["REGISTRO"]);
        }
      });
    });
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Closed the database connection.");
    });
  });
}

readDb()
  .then((todos) => {
    console.log(todos);
  })
  .catch((err) => {
    console.error("Erro ao ler o banco de dados:", err);
  });
