import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Toolbar = () => {
  return (
    <div className="flex w-full h-fit items-center px-5 py-4 bg-sidebar border-b-1">
      <SidebarTrigger variant="ghost" size="icon" className="py-4.5 px-4.5" />
      <ThemeToggle />
    </div>
  );
};

export default Toolbar;
