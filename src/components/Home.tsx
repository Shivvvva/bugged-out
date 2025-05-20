import SidebarComponent from "@/layouts/Sidebar";
import { SidebarProvider } from "./ui/sidebar";


const Home = () => {
    return (
        <>
        <SidebarProvider>
            <SidebarComponent />
        </SidebarProvider>
        </>
    );
}

export default Home;
