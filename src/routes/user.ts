import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const router = Router();

const userRepository = AppDataSource.getRepository(User);

// Get all users
router.get("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userRepository.find();
        res.status(200).json(users); // ✅ Do NOT return `res.status(...)`
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users", details: (error as Error).message });
    }
});

// Get a single user by ID
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user = await userRepository.findOne({ where: { id: parseInt(id, 10) } });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user", details: (error as Error).message });
    }
});

export default router;
