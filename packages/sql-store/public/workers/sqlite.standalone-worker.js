// worker/db/sqlite.standalone-worker.ts
import initSqlite from "./sqlite3.mjs";
var sqlite3;
var db;
async function ensureSqlite() {
  if (sqlite3) return;
  sqlite3 = await initSqlite();
}
async function ensureDb() {
  await ensureSqlite();
  if (db) return;
  const canOPFS = sqlite3.capi.sqlite3_vfs_find("opfs");
  console.log("canOPFS", canOPFS, sqlite3.oo1.OpfsDb);
  db = canOPFS ? new sqlite3.oo1.OpfsDb("/docpal.sqlite") : new sqlite3.oo1.DB("file:///offline-db.sqlite", "ct");
  db.exec("PRAGMA journal_mode = wal; PRAGMA synchronous = normal;");
}
async function handle(req) {
  try {
    if (req.type === "open") {
      await ensureDb();
      return { id: req.id, ok: true, result: true };
    }
    await ensureDb();
    if (req.type === "migrate") {
      const { migrations } = req.payload;
      db.exec("BEGIN");
      try {
        for (const sql of migrations) db.exec(sql);
        db.exec("COMMIT");
      } catch (e) {
        db.exec("ROLLBACK");
        throw e;
      }
      return { id: req.id, ok: true, result: true };
    }
    if (req.type === "exec") {
      const { sql, params } = req.payload;
      db.exec(sql, { bind: params ?? [] });
      return { id: req.id, ok: true };
    }
    if (req.type === "query") {
      const { sql, params } = req.payload;
      const rows = [];
      db.exec({ sql, bind: params ?? [], rowMode: "object", callback: (row) => rows.push(row) });
      return { id: req.id, ok: true, result: rows };
    }
    if (req.type === "transaction") {
      const { ops } = req.payload;
      const results = [];
      db.exec("BEGIN");
      try {
        for (const op of ops) {
          if (op.kind === "exec") db.exec(op.sql, { bind: op.params ?? [] });
          else {
            const rows = [];
            db.exec({ sql: op.sql, bind: op.params ?? [], rowMode: "object", callback: (r) => rows.push(r) });
            results.push(rows);
          }
        }
        db.exec("COMMIT");
      } catch (e) {
        db.exec("ROLLBACK");
        throw e;
      }
      return { id: req.id, ok: true, result: results };
    }
    throw new Error("Unknown type");
  } catch (err) {
    return { id: req.id, ok: false, error: String(err?.message ?? err) };
  }
}
self.onmessage = async (ev) => {
  const req = ev.data;
  const res = await handle(req);
  self.postMessage(res);
};
