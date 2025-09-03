import Note from "../models/Note.js";

export async function createNote(req, res) {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const userId = req.userId;

    const note = await Note.create({
      userId,
      content,
    });

    res.status(201).json({ note, message: "Note created successfully" });
  } catch (error) {
    console.log("Error in createNote: ", error.message);

    res.status(500).json({ message: "Server error" });
  }
}

export async function getAllNotes(req, res) {
  try {
    const userId = req.userId;

    const notes = await Note.find({ userId });

    res.status(200).json({ notes, message: "Notes retrieved successfully" });
  } catch (error) {
    console.log("Error in getAllNotes: ", error.message);

    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const noteId = req.params.noteId;

    const note = await Note.findByIdAndDelete(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNote: ", error.message);

    res.status(500).json({ message: "Server error" });
  }
}
