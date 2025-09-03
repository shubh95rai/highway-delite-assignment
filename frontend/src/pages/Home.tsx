import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNoteStore } from "../store/noteStore.ts";
import toast from "react-hot-toast";
import assets from "../assets/assets.ts";
import { Link } from "react-router-dom";
import { Loader, Trash2 } from "lucide-react";

export default function Home() {
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState("");

  const authUser = useAuthStore((state) => state.authUser);
  const signout = useAuthStore((state) => state.signout);
  const notes = useNoteStore((state) => state.notes);
  // const isGettingNotes = useNoteStore((state) => state.isGettingNotes);
  const isCreatingNote = useNoteStore((state) => state.isCreatingNote);
  // const isDeletingNote = useNoteStore((state) => state.isDeletingNote);
  const getNotes = useNoteStore((state) => state.getNotes);
  const createNote = useNoteStore((state) => state.createNote);
  const deleteNote = useNoteStore((state) => state.deleteNote);

  useEffect(() => {
    getNotes();
  }, []);

  const handleCreateNote = async () => {
    if (!open) {
      setOpen(true);
      return;
    }

    if (!content.trim()) {
      toast.error("Content is required");
      return;
    }

    await createNote({ content });
    setContent("");
    setOpen(false);
  };

  const handleDeleteNote = async (id: string) => {
    setDeletingNoteId(id);

    await deleteNote(id);
    setDeletingNoteId("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 px-4 pt-24 pb-4">
      <div className="max-w-lg mx-auto w-full">
        {/* Navbar */}
        <div className="flex items-center justify-between bg-white shadow px-6 py-4 fixed top-0 left-0 right-0">
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="h-7" />
          </Link>
          <h1 className="text-xl text-gray-800">Dashboard</h1>
          <button
            onClick={signout}
            className="text-primary text-sm underline underline-offset-2 font-medium"
          >
            Sign Out
          </button>
        </div>

        {/* User Info */}
        <div className="px-6 py-10 rounded-3xl shadow-md border border-gray-300">
          <p className=" mb-3 text-2xl font-bold capitalize">
            Welcome, {authUser?.name}!
          </p>
          <p className="text-gray-600 text-sm">
            Email: <span>{authUser?.email}</span>
          </p>
        </div>

        {/* Create Note Form */}
        <div className="py-4">
          {open && (
            <form className="bg-white shadow rounded-lg p-4 space-y-3">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Note content"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-0"
              />
            </form>
          )}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg mt-4 h-10"
            disabled={isCreatingNote}
            onClick={handleCreateNote}
          >
            {isCreatingNote ? (
              <div>
                <Loader className="size-5 animate-spin mx-auto" />
              </div>
            ) : (
              "Create Note"
            )}
          </button>
        </div>

        {/* Notes List */}
        <div className="py-4 flex-1">
          {notes.length === 0 ? (
            <p className="text-gray-500 text-center mt-6">
              No notes yet. Create one above 👆
            </p>
          ) : (
            <div className="grid gap-4">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="bg-white shadow rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <p className=" ">{note.content}</p>
                  </div>
                  <button onClick={() => handleDeleteNote(note._id)}>
                    {deletingNoteId === note._id ? (
                      <Loader className="size-5 animate-spin" />
                    ) : (
                      <Trash2 className="size-5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
