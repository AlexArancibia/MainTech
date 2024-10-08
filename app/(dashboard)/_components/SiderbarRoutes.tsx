"use client"

import { BarChart, Compass, Layout, List } from "lucide-react"
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/dashboard'
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/search'
  },
  
]

const teacherRoutes = [
  {
    icon: List,
    label: 'Courses',
    href: '/teacher/courses'
  },
  {
    icon: BarChart,
    label: 'Browse',
    href: '/teacher/analytics'
  },
  
]

function SiderbarRoutes() {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher")
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col w-full">
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href} />
        ))}
    </div>
  )
}

export default SiderbarRoutes