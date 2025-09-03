import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.ts";
import { getAxiosErrorMessage } from "../utils/getAxiosErrorMessage.ts";
import { create } from "zustand";

type Note = {
  _id: string;
  userId: string;
  content: string;
};

type NoteState = {
  notes: Note[];
  isGettingNotes: boolean;
  isCreatingNote: boolean;
  isDeletingNote: boolean;

  getNotes: () => Promise<void>;
  createNote: (formdata: { content: string }) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
};

export const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  isGettingNotes: false,
  isCreatingNote: false,
  isDeletingNote: false,

  getNotes: async () => {
    set({ isGettingNotes: true });

    try {
      const res = await axiosInstance.get("/notes/get-all-notes");
      set({ notes: res.data.notes });
    } catch (error) {
      const message = getAxiosErrorMessage(error);
      console.log("Error in getNotes:", message);
      toast.error(message);
    } finally {
      set({ isGettingNotes: false });
    }
  },

  createNote: async (formdata) => {
    set({ isCreatingNote: true });
    try {
      const res = await axiosInstance.post("/notes/create-note", formdata);
      set({ notes: [...get().notes, res.data.note] });
      toast.success(res.data.message);
    } catch (error) {
      const message = getAxiosErrorMessage(error);
      console.log("Error in createNote:", message);
      toast.error(message);
    } finally {
      set({ isCreatingNote: false });
    }
  },

  deleteNote: async (noteId) => {
    set({ isDeletingNote: true });
    try {
      const res = await axiosInstance.delete(`/notes/delete-note/${noteId}`);
      set({ notes: get().notes.filter((note) => note._id !== noteId) });
      toast.success(res.data.message);
    } catch (error) {
      const message = getAxiosErrorMessage(error);
      console.log("Error in deleteNote:", message);
      toast.error(message);
    } finally {
      set({ isDeletingNote: false });
    }
  },
}));
