import React, { useEffect, useState } from "react";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { downloadpdf } from "../services/api";

const History = (result) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const response = await fetch(serverUrl + "/api/gemini/getnotes", {
        credentials: "include",
      });

      const data = await response.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(serverUrl + `/api/gemini/note/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  /* ---------- LOADING SKELETON ---------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow animate-pulse space-y-4"
          >
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-700">
        📚 Notes History
      </h2>

      {notes.length === 0 ? (
        <div className="text-center mt-20 text-gray-500 space-y-3">
          <p className="text-2xl">😕 No Notes Found</p>
          <p className="text-sm">Generate your first note to see history.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-gray-200 rounded-2xl shadow-md p-6 border hover:shadow-2xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
            >
              {/* TOP */}
              <div>
                <h3 className="text-2xl font-bold text-black-600 truncate">
                  {note.topic}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  🎓 {note.classLevel} | 📝 {note.examType}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>


              {/* ACTIONS */}
              <div className="flex justify-between mt-6 gap-3">
                <button
                  onClick={() => navigate(`/note/${note._id}`)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow"
                >
                  View
                </button>

                <button
                  onClick={() => deleteNote(note._id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow"
                >
                  Delete
                </button>
                  <button
                        onClick={()=>downloadpdf(result)}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
                      >
                        Download Notes
                      </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
