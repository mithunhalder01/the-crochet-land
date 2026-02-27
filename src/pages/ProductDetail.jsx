import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center text-2xl">
      Product Detail Page for ID: {id}
    </div>
  );
};

export default ProductDetail;