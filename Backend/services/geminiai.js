const geminiUrl =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

import dotenv from "dotenv";
dotenv.config();

export const generateNotes = async (prompt) => {
  try {
    const response = await fetch(
      `${geminiUrl}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let finalData;

    try {
      finalData = JSON.parse(cleanText);
    } catch {
      finalData = { notes: cleanText };
    }

    return finalData;

  } catch (error) {
    console.error("Error in generateNotes:", error);
    throw error;
  }
};
