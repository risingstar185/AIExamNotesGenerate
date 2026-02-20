import axios from "axios"
import { serverUrl } from "../App"
import { setUserData } from "../redux/userSlice"

const getCurrentUser=async(dispatch)=>{
  try {
    const result=await axios.get(serverUrl + '/api/user/currentuser',{withCredentials:true})
    console.log(result.data)
    dispatch(setUserData(result.data))
  } catch (error) {
    console.error(error)
  }
}

export const generateNotes=async(payload)=>{
  try {
    const result=await axios.post(serverUrl + '/api/gemini/generate',payload,{withCredentials:true})
    console.log(result.data)
    return result.data
  }
    catch (error) {
    console.error(error)
    throw error
  }
}

export const downloadpdf = async (result) => {
  try {
    const response = await axios.post(
      serverUrl + "/api/pdf/generate-pdf",
      { result },
      {
        responseType: "blob",
        withCredentials: true,
      }
    );

    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "exam_notes.pdf";
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getCurrentUser;
