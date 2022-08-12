import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const user = 'postgres';
const password = process.env.DB_PASSWORD;
const host = 'localhost';
const port = 5432;
const database = 'linkr';

const { Pool } = pg;

const configDatabase = {
  user,
  password,
  host,
  port,
  database
};

 if(process.env.MODE === "PROD") {
  configDatabase.ssl = {
    rejectUnauthorized: false
  }
} 

const db = new Pool(configDatabase);
export default db;

