import dbConfig from './db.config';

const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export { dbConfig, jwtConstants };
