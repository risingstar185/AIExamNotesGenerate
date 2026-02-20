import Notes from "../models/noteModel.js";

export const getMyNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic classLevel examType revisionMode includeChart includeDiagram notes revisionPoints createdAt"
      )
      .sort({ createdAt: -1 });

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "No notes found for this user" });
    }

    res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: "Get current user notes server error" });
  }
};

export const getSingleNote = async (req, res) => {
  try {
    const note = await Notes.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      content: note.content, // ya note.content jo model me ho
      topic: note.topic,
      
      createdAt: note.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Get single note server error" });
  }
};


export const deleteNote = async (req, res) => {
  try {
    const note = await Notes.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Delete note server error" });
  }
};
