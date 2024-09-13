import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handelAuth = () => {
  const {userId} = auth() 
  if(!userId) throw new Error("Unauthorized")
    return {userId} 
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware( () => handelAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["text","image","video","audio","pdf"])
    .middleware(()=>handelAuth())
    .onUploadComplete(()=>{}),
  chapterVideo: f({ video: { maxFileSize: "1GB", maxFileCount: 1 } })
    .middleware(()=>handelAuth())
    .onUploadComplete(()=>{}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;