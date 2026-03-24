import { Request, Response } from "express";
import { 
  createEducation as addEducation, 
  getEducationByFaculty, 
  updateEducation, 
  deleteEducation 
} from "../../database/MyProfile/CredentialsDb";

export const createEducation = async (req: Request, res: Response): Promise<any> => {
  try {
    const { faculty_id, degree_level, discipline, school } = req.body;

    if (!faculty_id || !degree_level || !discipline || !school) {
      return res.status(400).json({ message: "Missing required education fields." });
    }

    const newEd = await addEducation(req.body);

    return res.status(201).json({
      message: "Education added successfully",
      data: newEd
    });

  } catch (error: any) {
    console.error("Create Education Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const fetchFacultyEducation = async (req: Request, res: Response): Promise<any> => {
  try {
    const faculty_id = req.params.faculty_id;

    if (!faculty_id) {
      return res.status(400).json({ message: "Faculty ID is required" });
    }

    const educationList = await getEducationByFaculty(faculty_id as string);

    return res.status(200).json({ data: educationList });

  } catch (error: any) {
    console.error("Fetch Education Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const editEducation = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id; // ✅ FIX: keep as string
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ message: "Invalid Education ID" });
    }

    const updatedEd = await updateEducation(id as string, updates);

    return res.status(200).json({
      message: "Education updated",
      data: updatedEd
    });

  } catch (error: any) {
    console.error("Update Education Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const removeEducation = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id; // ✅ FIX: string

    if (!id) {
      return res.status(400).json({ message: "Invalid Education ID" });
    }

    await deleteEducation(id as string);

    return res.status(200).json({
      message: "Education record deleted."
    });

  } catch (error: any) {
    console.error("Delete Education Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};