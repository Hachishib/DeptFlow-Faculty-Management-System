import express from "express";
import cors from "cors";
import authRoutes from "./ROUTES/googleauth/auth"; 
import facultyRoutes from "./ROUTES/MyProfileRwt/Facultyinfo";
import scheduleRoutes from "./ROUTES/schedules/Scheduleinfo";
import announcementRoutes from "./ROUTES/AnnouncementRwt/announcements/AnnouncementInfo";
import RoomRoutes from "./ROUTES/RoomInfo";
import SubjectRoutes from "./ROUTES/SubjectInfo";
import auditLogRoutes from "./ROUTES/AuditlogInfo";
import educationRoutes from "./ROUTES/MyProfileRwt/EducationInfo";
import credentialRoutes from "./ROUTES/MyProfileRwt/CredentialInfo";
import workExperienceRoutes from "./ROUTES/WorkExperienceInfo";
import researchRoutes from "./ROUTES/MyProfileRwt/ResearchInfo";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/faculty" , facultyRoutes);
app.use("/schedules" , scheduleRoutes);
app.use("/announcements" , announcementRoutes);
app.use("/rooms" , RoomRoutes );
app.use ("/subjects" , SubjectRoutes);
app.use("/auditlogs", auditLogRoutes);
app.use("/education", educationRoutes);
app.use("/credentials", credentialRoutes);
app.use("/work-experience", workExperienceRoutes);
app.use("/research", researchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


