"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const Preview = ({
  value,
}: PreviewProps) => {
  return (
    <div className="font-dm" >
      <ReactQuill
        theme="bubble" // Pass the theme prop
        value={value}
        readOnly
      />
    </div>
  );
};