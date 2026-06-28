import { createContext, useState, useEffect, type ReactNode } from "react";
import { type Category } from "@/types/finance";

interface CategoriesContextType {
  categories: Category[];
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
}
export const CategoriesContext = createContext<
  CategoriesContextType | undefined
>(undefined);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CategoriesContext.Provider
      value={{ categories, addCategory, deleteCategory }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
