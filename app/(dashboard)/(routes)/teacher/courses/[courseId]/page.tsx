
import { IconBadge } from "@/components/iconBadge";
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server";
import { CircleDollarSign, File, LayoutDashboard, ListCheck } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import PriceForm from "./_components/PriceForm";
import AttachForm from "./_components/AttachmentForm";
import ChaptersForm from "./_components/ChaptersForm";
import Banner from "@/components/Banner";
import Actions from "./_components/Actions";
 
async function CourseIdPage({params} : {params: {courseId: string}}) {

  const {userId} = auth();
  if (!userId){
    return redirect("/")
  }
  const course = await db.course.findUnique({
    where:{
      id: params.courseId,
      userId
    },
    include: {
      chapters: {
        orderBy: {
          position:"asc"
        }
      },
      attachments: {
        orderBy: {
          createdAt:"desc"
        }
      }
    }
  });

  const categories = await db.category.findMany({
    orderBy:{
      name:"asc"
    }
  })


  if(!course){
    return redirect("/")
  }

  const requierdFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some(chapter => chapter.isPublished)
  ];

  const totalFields = requierdFields.length
  const completedFields = requierdFields.filter(Boolean).length
  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requierdFields.every(Boolean)
  
  return (
    <>
      {!course.isPublished && (
        <Banner 
          label="This course is unpublished. It will no be visible to the students" />
      ) }
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1>
              Course setup
            </h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>


        <Actions 
        disabled={!isComplete}
        courseId={params.courseId}
        isPublished={course.isPublished} />


        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} size="sm" />
              <h3>
                Custimize your course
              </h3>
            </div>
            <TitleForm
              initialData={course}
              courseId={course.id} />

          <DescriptionForm
              initialData={course}
              courseId={course.id} />

          <ImageForm
              initialData={course}
              courseId={course.id} />
            
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListCheck} size="sm" />
                <h3>Course chapters</h3>
              </div>
              <div>
              <ChaptersForm 
              initialData={course}
              courseId={course.id} />
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} size="sm" />
              <h3>Sell your course</h3>
            </div>
            <PriceForm
              initialData={course}
              courseId={course.id} />
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} size="sm" />
              <h3>Resources & Attachments</h3>
            </div>
            <AttachForm
              initialData={course}
              courseId={course.id} />

          </div>
          
        </div>
      </div>
    </>
  )
}

export default CourseIdPage