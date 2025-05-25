import SidebarComponent from "@/layouts/Sidebar";
import { SidebarProvider } from "./ui/sidebar";
import Toolbar from "@/layouts/Toolbar";

const Home = () => {
  return (
    <>
      <SidebarProvider>
        <SidebarComponent />
        <Toolbar />
      </SidebarProvider>
    </>
  );
};

export default Home;
