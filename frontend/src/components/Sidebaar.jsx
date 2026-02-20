import React from "react";

function Sidebaar({ result }) {
  console.log("Sidebar Data:", result);

  if (!result) return null;

  return (
    <div className="  bg-blue-400 rounded-2xl border border-gray-200 shadow-sm p-5 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-xl">📌</span>
        <h3 className="text-lg font-semibold">Quick Exam View</h3>
      </div>

      {/* ================= SUBTOPICS ================= */}
      {result.subTopics && Object.keys(result.subTopics).length > 0 && (
        <section>
          <p className="text-sm font-semibold text-gray-700 mb-3">
            ⭐ Subtopics (Priority wise)
          </p>

          {Object.entries(result.subTopics).map(([priority, topics]) => (
            <div
              key={priority}
              className="mb-3 rounded-lg bg-gray-50 border border-gray-200 p-3"
            >
              <p className="text-sm font-semibold text-yellow-600 mb-1">
                {priority} Priority
              </p>

              <ul className="list-disc list-inside text-sm text-gray-600">
                {topics?.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* ================= IMPORTANCE ================= */}
      {result.importance && (
        <section className="rounded-lg bg-gray-50 border border-gray-200 p-3">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Importance Level
          </p>
          <span className="text-sm text-gray-600">
            {result.importance}
          </span>
        </section>
      )}

      {/* ================= QUESTIONS ================= */}
      {result.questions && (
        <section className="rounded-lg bg-gray-50 border border-gray-200 p-3">
          <p className="text-sm font-semibold text-gray-700 mb-2">
           ❓ Important Questions
          </p>

          {/* Short Questions */}
          {result.questions.short?.length > 0 && (
            <>
              <p className="text-xs font-semibold text-blue-600 mb-1">
                Short Questions
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
                {result.questions.short.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </>
          )}

          {/* Long Questions */}
          {result.questions.long?.length > 0 && (
            <>
              <p className="text-xs font-semibold text-purple-600 mb-1">
                Long Questions
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
                {result.questions.long.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </>
          )}

          {/* Diagram Question */}
          {result.questions.diagram && (
            <p className="text-sm text-gray-600">
              🖊 Diagram Question: {result.questions.diagram}
            </p>
          )}
        </section>
      )}

      {/* ================= REVISION POINTS ================= */}
      {result.revisionPoints?.length > 0 && (
        <section className="rounded-lg bg-orange-50 border border-gray-200 p-3">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Quick Revision Points
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {result.revisionPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ================= NOTES SUMMARY ================= */}
      {result.notes && (
        <section className="rounded-lg bg-blue-50 border border-gray-200 p-3">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Short Summary
          </p>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">
            {result.notes}
          </p>
        </section>
      )}

      {/* ================= DIAGRAM INFO ================= */}
      {result.diagram && (
        <section className="rounded-lg bg-yellow-50 border border-gray-200 p-3">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Diagram Type
          </p>
          <p className="text-sm text-gray-600">
            {result.diagram.type}
          </p>
        </section>
      )}

      {/* ================= CHART INFO ================= */}
      {result.charts?.length > 0 && (
        <section className="rounded-lg bg-gray-50 border border-gray-200 p-3">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Charts Included
          </p>
          <p className="text-sm text-gray-600">
            {result.charts.length} Chart(s) Generated
          </p>
        </section>
      )}
    </div>
  );
}

export default Sidebaar;
