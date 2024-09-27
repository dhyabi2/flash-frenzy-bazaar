import { HomeIcon, CalendarIcon, UploadIcon } from "lucide-react";
import Home from "./pages/Home.jsx";
import CategorySchedule from "./pages/CategorySchedule.jsx";
import UploadManagement from "./pages/UploadManagement.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Home />,
  },
  {
    title: "Schedule",
    to: "/schedule",
    icon: <CalendarIcon className="h-4 w-4" />,
    page: <CategorySchedule />,
  },
  {
    title: "Upload",
    to: "/upload",
    icon: <UploadIcon className="h-4 w-4" />,
    page: <UploadManagement />,
  },
];