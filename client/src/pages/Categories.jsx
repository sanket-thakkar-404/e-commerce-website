import { useLocation, Outlet } from "react-router-dom";
import { useMemo } from "react";
import CollectionLayout from "../components/CollectionLayout";
import { allCategoriesProducts } from "../config/productsData";
import { useAdminStore } from "../store/useAdminStore";

const Categories = () => {
  const location = useLocation();
  const adminProducts = useAdminStore((s) => s.adminProducts);
  const products = useMemo(
    () => [...allCategoriesProducts, ...adminProducts],
    [adminProducts]
  );
  const isCategoriesIndex = location.pathname === "/categories" || location.pathname === "/categories/";

  if (isCategoriesIndex) {
    return (
      <CollectionLayout
        products={products}
        title="All Categories"
      />
    );
  }

  return <Outlet />;
};

export default Categories;
