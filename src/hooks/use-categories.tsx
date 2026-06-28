import { useContext } from "react";
import { CategoriesContext } from "@/context/categories-context";

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error(
      "useCategories deve ser usado dentro de um CategoriesProvider",
    );
  }
  return context;
};
