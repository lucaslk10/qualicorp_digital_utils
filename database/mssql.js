const mssql = require("mssql");

class Qmssql {
  static create({ user, password, server, port, database, appName, timeout = 60000 }) {
    return new Qmssql({ user, password, server, port, database, appName, timeout });
  }

  constructor({ user, password, server, port, database, appName, timeout = 60000 }) {
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
        idleTimeoutMillis: timeout
      },
      connectionTimeout: timeout,
      requestTimeout: timeout,
    };
  }

  async beginTransaction() {
    await this.transaction.begin();
  }

  async commitTransaction() {
    await this.transaction.commit();
  }

  async rollbackTransaction() {
    await this.transaction.rollback();
  }

  async connect() {
    this.db = await mssql.connect(this.config);
    this.transaction = new mssql.Transaction()
    this.request = new mssql.Request(this.transaction);
  }

  isConnected() {
    return !!this.db._connected;
  }

  async query(sql, params = []) {
    try {
      const request = this.request;

      for (const p of params) {
        request.input(p.name, p.value);
      }
      const result = await request.query(sql);
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }

  async execute(statement, params = []) {
    try {
      const request = this.request;

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
