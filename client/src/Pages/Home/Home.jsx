import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductsCard from "../../Components/ProductsCard/ProductsCard";
import { ClimbingBoxLoader } from "react-spinners";
import FeaturedProducts from "../../Components/FeaturedProducts/FeaturedProducts";
import LeftMenubar from "../../Components/LeftMenuBar/LeftMenuBar";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useState } from "react";

const Home = () => {
  const axiosCommon = useAxiosCommon();

  // search state data 
  const [search, setSearch] = useState(""); 

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", search], 
    queryFn: async () => {
      const res = await axiosCommon.get(`/all-products`, {
        params:  { search } 
      });
      return res.data;
    },
  });

  return (
    <div className="flex p-5 gap-5">
      {/* Left Side menubar / category bar */}
      <div className="flex-1">
        <LeftMenubar 
        setSearch={setSearch} />
      </div>

      <div className="w-full lg:w-3/4 ">
        <FeaturedProducts />
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <ClimbingBoxLoader color="#36d7b7" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {products?.map((product) => (
              <ProductsCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
