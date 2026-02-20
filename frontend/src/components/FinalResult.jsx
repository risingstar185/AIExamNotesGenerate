import React from "react";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import Mermaid from "./Mermaid";
import Recharts from "./Recharts";
import { downloadpdf } from "../services/api";

const FinalResult = ({ result }) => {
  const handleDownload = async () => {
    const element = document.getElementById("notes-wrapper");
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    canvas.toBlob((blob) => {
      if (blob) saveAs(blob, "ExamNotes.png");
    });
  };

  return (
    <div className="space-y-6" id="notes-wrapper">
      <h2 className="text-2xl font-bold text-gray-800">Generated Notes</h2>

      {/* Notes */}
      {result.notes && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">📘 Notes</h3>
          <pre className="whitespace-pre-wrap text-gray-700 text-sm">
            {result.notes}
          </pre>
        </div>
      )}

      {/* Diagram */}
      {result.diagram && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">📊 Diagram</h3>
          <Mermaid diagram={result.diagram?.data} />
          <p className="text-italic font-[10px]">💥 If you need diagram took a screenshot for the future</p>
        </div>
      
      )}

      {/* Revision Points */}
      {result.revisionPoints && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">
            📌 Quick Revision Points
          </h3>
          <ul className="list-disc list-inside text-gray-700 text-sm">
            {result.revisionPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Questions */}
      {result.questions && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">
            ❓ Important Questions
          </h3>

          {result.questions.short?.length > 0 && (
            <>
              <p className="text-sm font-semibold text-blue-600 mb-1">
                Short Questions
              </p>
              <ul className="list-disc list-inside text-gray-700 text-sm mb-2">
                {result.questions.short.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </>
          )}

          {result.questions.long?.length > 0 && (
            <>
              <p className="text-sm font-semibold text-purple-600 mb-1">
                Long Questions
              </p>
              <ul className="list-disc list-inside text-gray-700 text-sm mb-2">
                {result.questions.long.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </>
          )}

          {result.questions.diagram && (
            <p className="text-sm text-gray-700 mt-2">
              🖊 Diagram: {result.questions.diagram}
            </p>
          )}
        </div>
      )}

      {/* Charts */}
      {result.charts && result.charts.length > 0 ? (
        <div className="bg-blue-50 p-4 rounded-lg border space-y-4">
          <h3 className="text-lg font-semibold mb-2">📈 Charts</h3>
          <Recharts charts={result.charts} />
            <p className="text-italic font-[10px]">💥 If you need diagram took a screenshot for the future</p>
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">📈 Charts</h3>
          <p className="text-sm text-gray-600">
            Charts are not relevant for this topic.
          </p>
        </div>
        
      )}

      {/* Subtopics */}
      {result.subTopics && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">⭐ Subtopics</h3>
          {Object.entries(result.subTopics).map(([priority, topics]) => (
            <div key={priority} className="mb-2">
              <p className="text-sm font-semibold text-yellow-600">
                {priority} Priority
              </p>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {topics.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Download Button */}
      <button
        onClick={()=>downloadpdf(result)}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
      >
        Download Notes
      </button>
    </div>
  );
};

export default FinalResult;
