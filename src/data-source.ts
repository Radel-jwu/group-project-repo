import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3308, // Change if using another port
    username: "root",
    password: "", // Leave blank if no password in phpMyAdmin
    database: "projectDB", // Ensure this database exists
    synchronize: true,
    logging: true,
    entities: [User],
});

