import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BarChartIcon from "@mui/icons-material/BarChart";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import TaskIcon from "@mui/icons-material/Task";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import ListIcon from "@mui/icons-material/List";

const IconComponent = ({ icon }: { icon: string }) => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case "Dashboard":
        return <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
      case "Analysis":
        return <AccountTreeIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
      case "Monitor":
        return <BarChartIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
      case "Workplace":
        return <MonitorHeartIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
      case "Project":
        return <TaskIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
      case "list":
        return <ListIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
      default:
        return <WorkspacesIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
    }
  };
  return getIcon(icon);
};
export default IconComponent;
