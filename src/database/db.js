import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const configDB = {
    connectionString: process.env.DATABASE_URL,
};

if (process.env.MODE === "PROD") {
    configDB.ssl = {
        rejectUnauthorized: false,
    };
}

const connectionDB = new Pool(configDB);

export { connectionDB };
