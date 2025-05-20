import {Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarFooter} from '../components/ui/sidebar'
import { iconMap } from '../iconMap';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const items = [
    {
        title: 'Dashboard',
        icon: 'home',
        url: '#',
    },
    {
        title: 'Settings',
        icon: 'settings',
        url: '#'
    },
    {
        title: 'Profile',
        icon: 'user',
        url: '#',
    }
]

const SidebarComponent = () => {
    return (
       <Sidebar collapsible='icon'>
            <SidebarHeader>
                <SidebarTrigger className='cursor-pointer' />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items && items.map((item) => {
                                    const Icon = iconMap[item.icon];
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <a style={{color: 'black'}} href={item.url}>
                                                    <Icon />
                                                    <p style={{fontStyle: 'normal'}}>{item.title}</p>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>SH</AvatarFallback>
                </Avatar>
            </SidebarFooter>
        </Sidebar>
    );
}

export default SidebarComponent;
