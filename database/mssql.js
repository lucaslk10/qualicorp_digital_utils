const mssql = require("mssql");

class Qmssql {
  static create({ user, password, server, port, database, appName }) {
    return new Qmssql({ user, password, server, port, database, appName });
  }

  constructor({ user, password, server, port, database, appName }) {
    this.db = undefined;
    this.config = {
      user: user,
      password: password,
      server: server,
      port: parseInt(port) || 1446,
      database: database,
      parseJSON: true,
      options: {
        encrypt: true,
        enableArithAbort: true,
        appName: appName
      },
      pool: {
        idleTimeoutMillis: 60000
      }
    };
  }

  async connect() {
    try {
      this.db = await mssql.connect(this.config);
    } catch (error) {
      throw error;
    }
  }

  isConnected() {
    return !!this.db._connected;
  }

  async query(sql, params = []) {
    try {
      await this.connect();
      const request = this.db.request();
      for (const p of params) {
        request.input(p.name, p.value);
      }
      const result = await request.query(sql);
      return result.recordset;
    } catch (error) {
      throw error;
    } finally {
      if (this.db) await this.db.close();
    }
  }

  async execute(statement, params = []) {
    try {
      await this.connect();
      const request = this.db.request();
      for (const p of params) {
        request.input(p.name, p.value);
      }
      const result = await request.query(statement);
      return result.rowsAffected[0] > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Qmssql;
