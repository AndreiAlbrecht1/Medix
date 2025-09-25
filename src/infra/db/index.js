import { Sequelize } from 'sequelize';
import databaseConfig from '../../shared/config/database.js';

const models = [];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.forEach((model) => {
      model.init(this.connection);
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
  getQueryInterface() {
    if (!this.connection) throw new Error('Database not connected.');
    return this.connection.getQueryInterface();
  }
}

export default new Database();
