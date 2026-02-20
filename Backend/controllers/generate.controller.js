import Notes from "../models/noteModel.js";
import UserModel from "../models/userModel.js";
import { generateNotes } from "../services/geminiai.js";
import { buildPrompt } from "../utils/promptBuilder.js";

export const generateNotesController = async (req, res) => {
  try {
    const { topic, classLevel, revisionMode=false, includeDiagram=false, includeChart=false } = req.body;
    if(!topic || !classLevel){
      return res.status(400).json({ error: "Topic and Class Level are required" });
    }
    const user=await UserModel.findById(req.userId);
    if(!user){
      return res.status(404).json({ error: "User not found" });
    }
    if(user.credits<10){
      user.isCreditAvailable=false;
      await user.save();
      return res.status(403).json({ error: "Insufficient credits" });
    }
const prompt=buildPrompt({ topic, classLevel, revisionMode, includeDiagram, includeChart });
const aiRespnse= await generateNotes(prompt);

const newNote=await Notes.create({
  user:user._id,
  topic,
  classLevel,
  revisionMode,
  includeDiagram,
  includeChart,
  content:aiRespnse
})

if (user.credits < 10) return error;

user.credits -= 10;
if(!Array.isArray(user.notes)){
  user.notes=[];
}

user.notes.push(newNote._id);



await user.save();

res.status(200).json({ message: "Notes generated successfully", notesId:newNote._id, content:aiRespnse  ,remainingCredits:user.credits,});

  } catch (error) {
    console.error("Error in generateNotesController:", error);
    res.status(500).json({ error: "Failed to generate notes" });
  }
};
