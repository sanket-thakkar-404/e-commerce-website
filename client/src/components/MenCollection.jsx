import { useMemo } from "react";
import CollectionLayout from "./CollectionLayout";
import { menClothes } from "../config/productsData";
import { useAdminStore } from "../store/useAdminStore";

const MenCollection = () => {
  const adminProducts = useAdminStore((s) => s.adminProducts);
  const products = useMemo(
    () => [...menClothes, ...adminProducts.filter((p) => p.category === "men")],
    [adminProducts]
  );

  return (
    <CollectionLayout products={products} title="Men's Collection" />
  );
};

export default MenCollection;
