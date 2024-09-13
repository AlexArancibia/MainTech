import { IconBadge } from "@/components/iconBadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterDescriptionForm from "./_components/ChapterDescriptionForm";
import ChapterAccessForm from "./_components/ChapterAccessForm";
import ChapterVideoForm from "./_components/ChapterVideoForm";
import Banner from "@/components/Banner";
import ChapterActions from "../../_components/ChapterActions";

const ChapterIdPage = async ({
  params
}: {params: {courseId:string ; chapterId:string}
}) => {
  const {userId} = auth()
  if (!userId) {
    return redirect("/")
  }

  const chapter = await db.chapter.findUnique({
    where : {
      id: params.chapterId,
      courseId: params.courseId
    },
    include:{
      muxData:true
    }
  })

  if(!chapter) {
    return redirect("/")
  }

  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean)
  console.log(isComplete)

  return (
    <>
    {!chapter.isPublished && (
      <Banner 
      variant="warning"
      label="This chapter is unpublished. It will not be visible in the course" />
    )}
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/teacher/courses/${params.courseId}`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to course setup
          </Link>
          
          <div className="flex flex-col gap-y-2">
            <h1>Chapter Creation</h1>

            <div className="flex flex-row items-center justify-between">
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>

            <ChapterActions
            disabled={!isComplete}
            isPublished={chapter.isPublished}
            courseId={params.courseId}
            chapterId={params.chapterId}/>
          </div>
          </div>
          
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Columna izquierda */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} size="sm" />
                  <h3>Customize your chapter</h3>
                </div>
                <ChapterTitleForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
                <ChapterDescriptionForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
              </div>

              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} size="sm" />
                <h3>Access Settings</h3>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
  
            {/* Columna derecha */}
            <div className="space-y-4">
              
  
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Video} size="sm" />
                <h3>Add a video</h3>
              </div>
              <ChapterVideoForm 
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
  
  export default ChapterIdPage;