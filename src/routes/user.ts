import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const router = Router();

// Delete user by ID
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userRepository = AppDataSource.getRepository(User);

        // Find the user by ID
        const user = await userRepository.findOneBy({ id: parseInt(id) });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Delete the user
        await userRepository.remove(user);
        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
});

export default router;
