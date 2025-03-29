import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/user";
import dotenv from "dotenv";

dotenv.config();

// Initialize Express App
const app = express();
app.use(express.json()); // Middleware to parse JSON

// Connect to Database
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully!");

        // Start the server only after DB is ready
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.error("Database connection failed:", error));

// Routes
app.use("/users", userRoutes);

export default app;
