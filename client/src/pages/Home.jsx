import { useMemo } from "react";
import CollectionLayout from "../components/CollectionLayout";
import { allCategoriesProducts } from "../config/productsData";
import { useAdminStore } from "../store/useAdminStore";

const Home = () => {
  const adminProducts = useAdminStore((s) => s.adminProducts);
  const products = useMemo(
    () => [...allCategoriesProducts, ...adminProducts],
    [adminProducts]
  );

  return <CollectionLayout products={products} />;
};

export default Home;
