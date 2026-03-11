import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth"; 
import facultyRoutes from "./routes/faculty/Facultyinfo";
import scheduleRoutes from "./routes/schedules/Scheduleinfo";
import announcementRoutes from "./routes/announcements/AnnouncementInfo";
import RoomRoutes from "./routes/rooms/RoomInfo";
import SubjectRoutes from "./routes/subjects/SubjectInfo";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/faculty" , facultyRoutes);
app.use("/api/schedules" , scheduleRoutes);
app.use("/api/announcements+" , announcementRoutes);
app.use("/api/rooms" , RoomRoutes );
app.use ("/api/subjects" , SubjectRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


