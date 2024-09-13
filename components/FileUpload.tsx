"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@/lib/uploadthing";
import toast from "react-hot-toast";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter
}

export default function FileUpload({
    onChange,
    endpoint
}: FileUploadProps) {
  return (
    <main className="flex h-1/3 flex-col items-center justify-between p-24">
      <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url)
        }}
        onUploadError={(error: Error) => {
          toast.error(`${error?.message}`)
        }}
      />
    </main>
  );
}