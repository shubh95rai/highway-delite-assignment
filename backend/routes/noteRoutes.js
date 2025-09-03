import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createNote,
  deleteNote,
  getAllNotes,
} from "../controllers/noteController.js";

const noteRouter = express.Router();

noteRouter.get("/get-all-notes", protect, getAllNotes);
noteRouter.post("/create-note", protect, createNote);
noteRouter.delete("/delete-note/:noteId", protect, deleteNote);

export default noteRouter;
