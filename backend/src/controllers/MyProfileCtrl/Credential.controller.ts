import { Request, Response } from "express";
import { 
  addCredential, 
  getCredentialsByFaculty, 
  updateCredential, 
  deleteCredential 
} from "../../DATABASE/MyProfileDb/CredentialDb";

export const createCredential = async (req: Request, res: Response): Promise<any> => {
  try {
    const { faculty_id, credential_type, title, issuer } = req.body;
    
    // Validate required fields based on your DB schema
    if (!faculty_id || !credential_type || !title || !issuer) {
      return res.status(400).json({ message: "Missing required credential fields." });
    }

    const newCred = await addCredential(req.body);
    return res.status(201).json({ message: "Credential added successfully", data: newCred });
    
  } catch (error: any) {
    console.error("Create Credential Error:", error.message);
    
    // Catching our database ENUM typo shield
    if (error.message.includes('valid_credential_type')) {
      return res.status(400).json({ 
        message: "Invalid credential type. Must be 'Certification', 'License', or 'Seminar'." 
      });
    }
    // Catching the year validation shield
    if (error.message.includes('valid_issue_year')) {
      return res.status(400).json({ message: "Invalid issue year provided." });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchFacultyCredentials = async (req: Request, res: Response): Promise<any> => {
  try {
    const faculty_id = req.params.faculty_id as string;
    
    if (!faculty_id) {
      return res.status(400).json({ message: "Faculty ID is required" });
    }

    const credList = await getCredentialsByFaculty(faculty_id);
    return res.status(200).json({ data: credList });
  } catch (error) {
    console.error("Fetch Credentials Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editCredential = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const updates = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Credential ID" });
    }

    const updatedCred = await updateCredential(id, updates);
    return res.status(200).json({ message: "Credential updated", data: updatedCred });
  } catch (error: any) {
    console.error("Update Credential Error:", error.message);
    if (error.message.includes('valid_credential_type')) {
      return res.status(400).json({ message: "Invalid credential type." });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeCredential = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Credential ID" });
    }

    await deleteCredential(id);
    return res.status(200).json({ message: "Credential record deleted." });
  } catch (error) {
    console.error("Delete Credential Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};