import {Category, Course} from "@prisma/client";

import React from 'react'
import CourseCard from "@/components/CourseCard";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: {id: string}[];
  progress: number | null
}

interface CoursesListProps {
  items:CourseWithProgressWithCategory[]
}

export const CoursesList = ({
  items
}:CoursesListProps) => {
  return (
    <div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grids-cols-4 gap-4">
      {items.map((item) => (
        <CourseCard
          key={item.id}
          id={item.id}
          title={item.title}
          imageUrl={item.imageUrl!}
          chaptersLenght = {item.chapters.length} 
          price={item.price!}
          progress={item.progress}
          category={item?.category?.name!} />
      ))}
    </div>
    </div>
  )
}
 