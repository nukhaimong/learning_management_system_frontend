// app/(dashboard)/layout.tsx
import { AppSidebar } from '@/components/layout/appSideBar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Role } from '@/constants';
import { adminRoutes, instructorRoutes, LearnerRoutes } from '@/routes/routes';
import { getMe } from '@/services/auth/auth.server.service';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getMe();

  const role = data?.role;

  const getRoutes = () => {
    switch (role) {
      case Role.Admin:
      case Role.SuperAdmin:
        return adminRoutes;
      case Role.Instructor:
        return instructorRoutes;
      default:
        return LearnerRoutes;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar routes={getRoutes()} />
      <main className="w-full">
        <header className="flex h-16 items-center border-b px-4">
          <SidebarTrigger />
          <div className="ml-4 font-semibold capitalize">{role} Portal</div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
