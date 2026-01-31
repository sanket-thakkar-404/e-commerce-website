import { useMemo } from "react";
import CollectionLayout from "./CollectionLayout";
import { products } from "../config/productsData";
import { useAdminStore } from "../store/useAdminStore";

const LeatherBagCollection = () => {
  const adminProducts = useAdminStore((s) => s.adminProducts);
  const productsList = useMemo(
    () => [...products, ...adminProducts.filter((p) => p.category === "leather")],
    [adminProducts]
  );

  return (
    <CollectionLayout products={productsList} title="Leather Bags" />
  );
};

export default LeatherBagCollection;
