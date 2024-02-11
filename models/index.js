import { databaseConfig } from "../config/database.js";
import { Sequelize } from "sequelize";


// Create a Sequelize instance with the database configurations
const sequelize = new Sequelize(
    databaseConfig.DB,
    databaseConfig.USER,
    databaseConfig.PASSWORD,
    {
        host: databaseConfig.HOST,
        dialect: databaseConfig.dialect,
        pool: {
            max: databaseConfig.pool.max,
            min: databaseConfig.pool.min,
            acquire: databaseConfig.pool.acquire,
            idle: databaseConfig.pool.idle
        }
    }
)

export async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connected to the mysql database.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    } finally {
      await sequelize.close();
    }
}