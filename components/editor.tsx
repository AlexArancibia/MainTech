"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const Editor = ({
  onChange,
  value,
}: EditorProps) => {
  return (
    <div className="bg-white" >
      <ReactQuill
        theme="snow" // Pass the theme prop
        value={value}
        onChange={onChange}
      />
    </div>
  );
};