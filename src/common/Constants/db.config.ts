const dbConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  cluster: process.env.DB_CLUSTER,
};

export default dbConfig;