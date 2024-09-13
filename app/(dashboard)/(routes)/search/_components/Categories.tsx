"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSportsMode
} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./CategoryItem";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Fitness": FcSportsMode,
  "Computer Science": FcMultipleDevices,
  "Engineering": FcEngineering,
};

export const Categories: React.FC<CategoriesProps> = ({ items }) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => {
        return (
          <CategoryItem
            key={item.id}
            label = {item.name}
            icon = {iconMap[item.name]}
            value = {item.id}
          />
        );
      })}
    </div>
  );
};
