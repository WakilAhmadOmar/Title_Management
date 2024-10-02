const expresss = require("express");
const routers = expresss.Router();
// const Title = require("../models/title");
import { Title } from "../models/title";
const auth = require("../middleware/auth"); // Import the auth middleware

// Get all titles (Protected)
routers.get("/", auth, async (req: any, res: any) => {
  try {
    const titles = await Title.find().sort({ createdAt: -1 });
    res.json(titles);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new title (Protected)
routers.post("/", auth, async (req: any, res: any) => {
  const title = new Title({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const newTitle = await title.save();
    res.status(201).json(newTitle);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a title (Protected)
routers.delete("/:id", auth, async (req: any, res: any) => {
  try {
    const title: any = await Title.findById(req.params.id);
    if (!title) {
      return res.status(404).json({ message: "Title not found" });
    }
    await title.deleteOne(); // Replace `remove()` with `deleteOne()`
    res.json({ message: "Title deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = routers;
