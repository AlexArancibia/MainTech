import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node"

const {video} = new Mux({
  tokenId: process.env['MUX_TOKEN_ID']!, // This is the default and can be omitted
  tokenSecret: process.env['MUX_TOKEN_SECRET']!, // This is the default and can be omitted
});
export async function DELETE(
  req:Request,
  {params}: {params:{courseId: string} }
) {
  try {
    const { userId} = auth()
    if (!userId) { 
      return new NextResponse("Unauthorized",{status:401})
     }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId   
      },
      include:{
        chapters:{
          include:{
            muxData:true
          }
        }
      }
   })

   if(!course) {
    return new NextResponse("Not found" , {status:404})
   }

   for (const chapter of course.chapters){
    if (chapter.muxData?.assetId){
      await video.assets.delete(chapter.muxData.assetId)
    }
   }

   const deletedCourse = await db.course.delete({
    where: {
      id: params.courseId
    }
   })

   return NextResponse.json(deletedCourse)
    
  } catch (error) {
    console.log("[COURSE_ID_DELETE]",error);
    
  }
}


export async function PATCH(
  req:Request,
  {params}: {params:{courseId: string} }
) {
  try {

    const {userId} = auth()
    
    const {courseId} = params;
    const values = await req.json()
    if (!userId) {
      return new NextResponse("Unauthorized", {status : 401});
    }
    const course = await db.course.update({
      where: {
        id: courseId,
        userId
      },
      data: {
        ...values,
      }
    });
    return new NextResponse(JSON.stringify(course), { status: 200 });

  } catch (error) {
    console.log("[COURSE_ID]", error)
    return new NextResponse("Internal Error", {status:500})    
  }   
}