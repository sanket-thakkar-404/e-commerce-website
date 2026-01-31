import { useMemo } from "react";
import CollectionLayout from "./CollectionLayout";
import { womenClothes } from "../config/productsData";
import { useAdminStore } from "../store/useAdminStore";

const WomenCollection = () => {
  const adminProducts = useAdminStore((s) => s.adminProducts);
  const products = useMemo(
    () => [...womenClothes, ...adminProducts.filter((p) => p.category === "women")],
    [adminProducts]
  );

  return (
    <CollectionLayout products={products} title="Women's Collection" />
  );
};

export default WomenCollection;
