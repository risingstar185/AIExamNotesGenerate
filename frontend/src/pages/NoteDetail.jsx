import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import Mermaid from "../components/Mermaid";
import Recharts from "../components/Recharts";

const NoteDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);


  console.log("Note ID from URL:", note);
  const fetchNote = async () => {
    try {
      const response = await axios.get(
        serverUrl + `/api/gemini/note/${id}`,
        { withCredentials: true }
      );

      setNote(response.data);

    } catch (error) {
      console.error("Error fetching note:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Loading Note...
      </div>
    );
  }

  if (!note) {
    return (
      <div className="text-center mt-20 text-red-500 text-lg">
        Note Not Found
      </div>
    );
  }

  const result = note.content || {};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-700">
          {note.topic}
        </h1>

        <p className="text-gray-500 text-sm">
          {new Date(note.createdAt).toLocaleString()}
        </p>

        <hr />

        {/* Notes */}
        {result?.notes && (
          <div>
            <h2 className="text-xl font-semibold">Notes</h2>
            <p className="whitespace-pre-line text-gray-700 mt-2">
              {result.notes}
            </p>
          </div>
        )}

        {/* Diagram */}
        {result?.diagram?.data && (
          <div>
            <h2 className="text-xl font-semibold">Diagram</h2>
            <Mermaid diagram={result.diagram.data} />
          </div>
        )}

        {/* Revision Points */}
        {result?.revisionPoints?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-green-700">
              Revision Points
            </h2>
            <ul className="list-disc pl-6 mt-2">
              {result.revisionPoints.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Questions */}
        {result?.questions && (
          <div>
            <h2 className="text-xl font-semibold text-purple-700">
              Important Questions
            </h2>

            {result.questions.short?.length > 0 && (
              <>
                <p className="font-medium mt-2">Short:</p>
                <ul className="list-decimal pl-6">
                  {result.questions.short.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </>
            )}

            {result.questions.long?.length > 0 && (
              <>
                <p className="font-medium mt-2">Long:</p>
                <ul className="list-decimal pl-6">
                  {result.questions.long.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {/* Charts */}
        {result?.charts?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-blue-700">
              Charts
            </h2>
            <Recharts charts={result.charts} />
          </div>
        )}

      </div>
    </div>
  );
};

export default NoteDetail;
