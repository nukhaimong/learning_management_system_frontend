import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Routes } from '@/types/routes.type';
import Link from 'next/link';

interface AppSidebarProps {
  routes: Routes[];
}

export function AppSidebar({ routes }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="p-0">
                      <Link
                        href={item.url}
                        className="flex h-full w-full items-center px-4 py-2 gap-3 transition-all duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground group"
                      >
                        <span className="text-sm font-medium ">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
