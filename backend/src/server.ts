import express from "express";
import cors from "cors";
import authRoutes from "./routes/googleauth/auth"; 
import facultyRoutes from "./routes/MyProfileRwt/faculty/Facultyinfo";
import scheduleRoutes from "./routes/schedules/Scheduleinfo";
import announcementRoutes from "./routes/AnnouncementRwt/announcements/AnnouncementInfo";
import RoomRoutes from "./routes/RoomInfo";
import SubjectRoutes from "./routes/SubjectInfo";
import auditLogRoutes from "./routes/AuditlogInfo";
import educationRoutes from "./routes/MyProfileRwt/EducationInfo";
import credentialRoutes from "./routes/MyProfileRwt/CredentialInfo";
import workExperienceRoutes from "./routes/work_experience/WorkExperienceInfo";
import researchRoutes from "./routes/MyProfileRwt/ResearchInfo";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/faculty" , facultyRoutes);
app.use("/api/schedules" , scheduleRoutes);
app.use("/api/announcements" , announcementRoutes);
app.use("/api/rooms" , RoomRoutes );
app.use ("/api/subjects" , SubjectRoutes);
app.use("/api/auditlogs", auditLogRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/credentials", credentialRoutes);
app.use("/api/work-experience", workExperienceRoutes);
app.use("/api/research", researchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


