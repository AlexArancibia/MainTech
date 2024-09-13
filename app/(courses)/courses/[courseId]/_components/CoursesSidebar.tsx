import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./CourseSiderbarItem";
import CourseProgress from "@/components/CourseProgress";


interface CoursesSidebarProps {
  course: Course & {
    chapters: (Chapter &{
      userProgress: UserProgress[] | null;
    })[]
  };
  progressCount: number
}

async function CoursesSidebar({
  course,
  progressCount,
}: CoursesSidebarProps) {

  const {userId} = auth();
  if (!userId) {
    return redirect("/dashboard");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id
      }
    }
  })

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-4 flex flex-col border-b">
        <h3>
          {course.title}
        </h3>  
        {/* CORREGIR TRUE POR PURCHASEE*/}
        {true && (
          <div className="mt-10">
            <CourseProgress
              variant="success"
              value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase} />

        ))}

      </div>
    </div>
  )
}

export default CoursesSidebar