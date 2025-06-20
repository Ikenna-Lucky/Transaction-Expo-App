import {neon} from '@neondatabase/serverless';
import "dotenv/config"; 

//this creates a connection to the Neon database using the connection string stored in the environment variable DATABASE_URL
const sql = neon(process.env.DATABASE_URL);

const initDB = async () => {
  try {
    // Import the database connection function
    await sql`CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    title VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE)`;

    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process with failure
  }
};
  

export { sql, initDB };