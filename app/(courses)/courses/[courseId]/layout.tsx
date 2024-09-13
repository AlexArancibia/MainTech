import { getProgress } from "@/actions/getProgress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CoursesSidebar from "./_components/CoursesSidebar";
import CourseNavbar from "./_components/CourseNavbar";

const CourseLayout = async ({
  children,
  params
}: {
  children : React.ReactNode;
  params: {courseId: string};}) => {

  const {userId} = auth()
  if (!userId) {
    return redirect("/dashboard")
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId
    },
    include:{
      chapters:{
        where: {
          isPublished: true,
        },
        include: {
          userProgress:{
            where: {
              userId
            }
          }
        },
        orderBy:{
          position:"asc"
        }
      }
    }
  });

  if(!course){
    return redirect("/dashboard")
  }

  const progressCount = await getProgress(userId,course.id)

  return(
    <div className="h-full">  
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
      <CourseNavbar
          course={course}
          progressCount={progressCount} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50" >
        <CoursesSidebar
          course={course}
          progressCount={progressCount} />
      </div>
      <main className="md:pl-80 pt-20 h-full">
        {children}
      </main>
    </div>
  )
}

export default CourseLayout