import { productApis } from "@/apis/productApis";
import { userApis } from "@/apis/userApis";
import AdsBanners from "@/components/AdsBanners";
import GridProducts from "@/components/GridProducts";
import MultipleCarouselWithCards from "@/components/MultipleCarouselWithCards";
import SingleCarousel from "@/components/SingleCarousel";
import DefaultLayout from "@/layouts/DefaultLayout";
import { ProductType } from "@/types/ProductType";

type Props = {
   products: Array<ProductType>;
};

export default function Home(props: Props) {
   return (
      <DefaultLayout>
         <section className="overflow-x-hidden pb-10">
            <SingleCarousel />
            <div className="container w-4/5 mx-auto">
               <div className="pt-[50px]">
                  <h1 className="text-2xl py-2">HOT DEAL</h1>
                  <div className="w-screen relative left-[50%] translate-x-[-50%]">
                     <MultipleCarouselWithCards products={props.products} />
                  </div>
               </div>
               <div className="mt-[50px] mb-[50px]">
                  <h1 className="text-2xl my-4 uppercase">Salest BOX </h1>
                  <div className="w-screen relative left-[50%] translate-x-[-50%]">
                     <MultipleCarouselWithCards products={props.products} />
                  </div>
               </div>
               <AdsBanners />
               <div className="mt-[48px]">
                  <h1 className="text-2xl py-4 uppercase">
                     Recommend for you{" "}
                  </h1>
                  <div className="w-screen relative left-[50%] translate-x-[-50%]">
                     <GridProducts products={props.products} />
                  </div>
               </div>
            </div>
         </section>
      </DefaultLayout>
   );
}

export async function getStaticProps() {
   const products: ProductType[] = await productApis.getAllProducts();
   return {
      props: {
         products,
      },
   };
}
