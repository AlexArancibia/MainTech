import { Chapter, Course, UserProgress } from "@prisma/client"
import CourseMobileSidebar from "./CourseMobileSidebar";
import NavbarRoutes from "@/components/NavbarRoutes";


interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}


function CourseNavbar({
  course,
  progressCount
}:CourseNavbarProps
) {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  )
}

export default CourseNavbar