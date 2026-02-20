import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
});

const clearMermaid = (diagram) => {
  if (!diagram) return "";

  let clean = diagram
    .replace(/\r/g, "")       // remove carriage return
    .replace(/\t/g, " ")      // tabs to spaces
    .replace(/'/g, "")        // remove single quotes (parser safe)
    .trim();

  // If AI sends everything in one line, force line breaks before arrows
  clean = clean.replace(/-->/g, "\n-->");

  // Ensure graph keyword exists
  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

const Mermaid = ({ diagram }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const renderDiagram = async () => {
      try {
        if (!diagram || !containerRef.current) return;

        containerRef.current.innerHTML = "";

        const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;
        const safeDiagram = clearMermaid(diagram);

        const { svg } = await mermaid.render(id, safeDiagram);

        if (mounted) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error("Mermaid render failed:", err);
      }
    };

    renderDiagram();
    return () => {
      mounted = false;
    };
  }, [diagram]);

  return (
    <div className="bg-white border rounded-lg p-4 overflow-x-auto">
      <div ref={containerRef} />
    </div>
  );
};

export default Mermaid;
