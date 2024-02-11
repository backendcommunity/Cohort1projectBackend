export const databaseConfig = {
    HOST: process.env.db_host,
    USER: process.env.db_user,
    PASSWORD: process.env.db_password,
    DB: process.env.db,
    dialect: "mysql",
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };