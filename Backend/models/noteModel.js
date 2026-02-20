import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    classLevel: {
      type: String,
      required: true,
    },

    revisionMode: {
      type: Boolean,
      default: false,
    },

    includeDiagram: Boolean,
    includeChart: Boolean,

    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("Notes", noteSchema);
export default Notes;
