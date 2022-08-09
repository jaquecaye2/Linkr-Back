import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const user = 'postgres';
const password = 23052003;
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