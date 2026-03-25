import express from "express";
import cors from "cors";
import authRoutes from "./routes/googleauth/auth"; 
import facultyRoutes from "./routes/MyProfileRwt/Facultyinfo";
import scheduleRoutes from "./routes/schedules/Scheduleinfo";
import announcementRoutes from "./routes/AnnouncementRwt/announcements/AnnouncementInfo";
import RoomRoutes from "./routes/RoomInfo";
import SubjectRoutes from "./routes/SubjectInfo";
import auditLogRoutes from "./routes/AuditlogInfo";
import educationRoutes from "./routes/MyProfileRwt/EducationInfo";
import credentialRoutes from "./routes/MyProfileRwt/CredentialInfo";
import workExperienceRoutes from "./routes/WorkExperienceInfo";
import researchRoutes from "./routes/MyProfileRwt/ResearchInfo";

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


