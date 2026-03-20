import express from "express";
import cors from "cors";
import MyprofileRoutes from "./routes/MyProfile/FacultyRoutes";
import ManageScheduleRoutes from "./routes/ManageSched/CourseRoute";
import authRoutes from "./routes/googleauth/auth"; 
import facultyRoutes from "./routes/MyProfile/FacultyRoutes";
import scheduleRoutes from "./routes/schedules/Scheduleinfo";
import announcementRoutes from "./routes/announcements/AnnouncementInfo";
import RoomRoutes from "./routes/rooms/RoomInfo";
import SubjectRoutes from "./routes/subjects/SubjectInfo";

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/faculty" , facultyRoutes);
// app.use("/api/schedules" , scheduleRoutes);
// app.use("/api/rooms" , RoomRoutes );
// app.use ("/api/subjects" , SubjectRoutes);

app.use("/Announcements" , announcementRoutes);
app.use("/Myprofile", MyprofileRoutes);
app.use('/ManageSchedule', ManageScheduleRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


