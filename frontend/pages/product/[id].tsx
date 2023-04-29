import DefaultLayout from "@/layouts/DefaultLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Rating } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import {
   faTruck,
   faMoneyBill,
   faShield,
   faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { formatK, formatPrice } from "@/utilities/FormatFunc";
import CommentSection from "@/components/CommentSection";
import { ProductType } from "@/types/ProductType";
import { productApis } from "@/apis/productApis";
import { ProductPhotoType } from "@/types/ProductPhotoType";
import { ProductSizeType } from "@/types/ProductSizeType";
import { ProductColorType } from "@/types/ProductColorType";
import ConfirmLoginModal from "@/components/ConfirmLoginModal";
import { useDispatch, useSelector } from "react-redux";
import { UserSliceType } from "@/redux/userSlice";
import { AppState } from "@/redux/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userApis } from "@/apis/userApis";
import { refreshCart, setProductToCart } from "@/redux/cartSlice";
import { toast } from "react-toastify";
import { CartProductType } from "@/types/CartProductType";
interface Props extends ProductType {
   photos: ProductPhotoType[];
   sizes: ProductSizeType[];
   colors: ProductColorType[];
}

interface FormState
   extends Pick<ProductType, "id" | "name" | "price" | "photoUrl"> {
   size: string;
   color: string;
   quantity: number;
}

const initialFormState: FormState = {
   id: "",
   name: "",
   price: 0,
   photoUrl: "",
   size: "",
   color: "",
   quantity: 1,
};

const ProductPage = (props: Props) => {
   const dispatch = useDispatch();
   const [refresh, setRefresh] = useState<boolean>(false);

   useQuery({
      queryKey: ["cart", refresh],
      queryFn: () => userApis.getCart(user.data?.id!),
      onSuccess(data: CartProductType[]) {
         dispatch(setProductToCart(data));
      },
      keepPreviousData: true,
   });

   const addToCartMutation = useMutation({
      mutationFn: userApis.addProductIntoCart,
      onSuccess: () => {
         dispatch(refreshCart());
         toast("Thêm vào giỏ hàng thành công", {
            theme: "dark",
            type: "success",
            autoClose: 1000,
         });
         setRefresh(() => !refresh);
      },
      onError: () => {
         toast("Có lỗi xảy ra !", {
            theme: "dark",
            type: "error",
            autoClose: 1000,
         });
      },
   });

   const user = useSelector<AppState>((state) => state.user) as UserSliceType;
   const [ratingStart] = useState(
      Array(Math.floor(props.rating)).fill("start")
   );
   const [formState, setFormState] = useState<FormState>(initialFormState);

   const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

   const handleAddToCart = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!user.data) {
         setShowLoginModal(true);
      } else {
         if (!formState.size || !formState.color || formState.quantity === 0) {
            toast("Vui lòng chọn đầy đủ thông tin.", {
               theme: "dark",
               type: "error",
               autoClose: 1000,
            });
            return;
         }

         addToCartMutation.mutate({
            id: user.data.id!,
            ProductId: props.id,
            UserId: user.data.id!,
            SizeId: formState.size,
            ColorId: formState.color,
            Quantity: formState.quantity,
         });
      }
   };

   const handleChange = (name: string, value: string | number) => {
      setFormState((prev) => ({ ...prev, [name]: value }));
   };

   return (
      <DefaultLayout>
         <form
            onSubmit={handleAddToCart}
            className="bg-slate-300 px-[10%] py-[48px]"
         >
            {/* Review product */}
            <div className="flex align-middle border-none gap-8 bg-white p-4 pb-8">
               <div style={{ flexBasis: "40%" }}>
                  <img src={props.photoUrl} alt="product-img" />
                  <div className="grid grid-cols-5 w-full gap-1 pl-1 mt-4">
                     {props.photos.map((photo, key) => {
                        return (
                           <Image
                              loader={() => photo.url}
                              key={key}
                              width={90}
                              height={90}
                              src={photo.url}
                              alt={"product-img"}
                           />
                        );
                     })}
                  </div>
               </div>
               <div>
                  <h1 className="capitalize text-xl">{props.name}</h1>
                  <div
                     className="flex align-middle gap-4"
                     style={{ alignItems: "center" }}
                  >
                     <Rating className="my-1">
                        <p className="mr-1 text-red-600">{props.rating}</p>
                        {ratingStart.map((_, key) => {
                           return <Rating.Star key={key} />;
                        })}
                     </Rating>
                     <div className="w-[1px] h-9 bg-gray-300 " />
                     <a href="#">
                        <span className="mr-2 underline">{formatK(438)}</span>
                        Đánh giá
                     </a>
                     <div className="w-[1px] h-9 bg-gray-300 " />
                     <a href="#">
                        <span className="mr-2">{formatK(props.orders)}</span>
                        Đã bán
                     </a>
                  </div>
                  <div className="p-4 flex content-center">
                     <h1 className="text-2xl font-[500]">
                        {formatPrice(props.price)}
                     </h1>
                  </div>

                  <div className="w-full rounded-md p-8 border grid grid-cols-3 gap-2">
                     <div className="flex flex-col gap-2 opacity-70 text-center ">
                        <FontAwesomeIcon icon={faTruck} />
                        <p className="text-center">
                           <span className="font-bold mx-1 text-center">
                              Miễn phí giao hàng
                           </span>
                           tối đa
                           <span className="font-bold mx-1 text-center">
                              15k
                           </span>
                           cho sản phẩm này
                        </p>
                     </div>
                     <div className="flex flex-col gap-2 opacity-70 text-center ">
                        <FontAwesomeIcon icon={faShield} />
                        <p className="text-center">
                           <span className="font-bold mx-1 text-center">
                              Bảo hiểm sản phẩm
                           </span>
                           khi
                           <span className="font-bold mx-1 text-center">
                              vận chuyển
                           </span>
                        </p>
                     </div>
                     <div className="flex flex-col gap-2 opacity-70 text-center ">
                        <FontAwesomeIcon icon={faMoneyBill} />
                        <p className="text-center">
                           <span className="font-bold mx-1 text-center">
                              Đổi trả hàng
                           </span>
                           trong
                           <span className="font-bold mx-1 text-center">
                              7 ngày
                           </span>
                        </p>
                     </div>
                  </div>
                  <div className="flex gap-4 content-center my-6">
                     <h1 className="opacity-60">Mã giảm giá của shop</h1>
                     <div className="px-2 bg-blue-600 opacity-60 hover:opacity-100 cursor-pointer text-white">
                        Giảm <span>5k</span>
                     </div>
                     <div className="px-2 bg-blue-600 opacity-60 hover:opacity-100 cursor-pointer text-white">
                        Giảm <span>10k</span>
                     </div>
                  </div>
                  <div className="flex gap-2 content-center my-6 align-middle">
                     <h1 className="opacity-60 mr-8 py-1">Màu sắc</h1>
                     {props.colors.map((color) => (
                        <button
                           type="button"
                           key={color.colorId}
                           onClick={() => handleChange("color", color.colorId)}
                           className={`px-3 py-2 hover:border-blue-600 hover:text-blue-600 ${
                              color.colorId === formState.color &&
                              "border-blue-600 text-blue-600"
                           }   cursor-pointer transition-all  border  text-black`}
                        >
                           {color.name}
                        </button>
                     ))}
                  </div>
                  <div className="flex gap-2 content-center my-6 align-middle">
                     <h1 className="opacity-60 mr-8 py-1">Size</h1>

                     {props.sizes.map((size, key) => {
                        return (
                           <button
                              type="button"
                              key={key}
                              onClick={() => handleChange("size", size.sizeId)}
                              className={`px-4 py-1 hover:border-blue-600 hover:text-blue-600 cursor-pointer  border  text-black
                               ${
                                  size.sizeId === formState.size &&
                                  "border-blue-600 text-blue-600"
                               }`}
                           >
                              {size.sizeId}
                           </button>
                        );
                     })}
                  </div>
                  <div className="flex gap-2 content-center my-6 align-middle">
                     <h1 className="opacity-60 mr-8 py-1">Số lượng</h1>
                     <input
                        type={"number"}
                        value={formState.quantity}
                        min={1}
                        onChange={(e) =>
                           handleChange("quantity", e.target.value)
                        }
                        className="px-2 py-1  cursor-pointer transition-all  border  text-black"
                     ></input>
                  </div>
                  <div className="flex content-center gap-4 mt-10">
                     <button
                        type="submit"
                        className="px-8 py-2 text-lg bg-blue-200 border border-blue-600 text-blue-600 hover:opacity-80"
                     >
                        <FontAwesomeIcon
                           className="mr-4"
                           icon={faCartShopping}
                        />
                        <span>Thêm vào giỏ hàng</span>
                     </button>
                     <button className="px-4 py-2 text-lg bg-blue-600 text-white hover:opacity-80">
                        Mua ngay
                     </button>
                  </div>
               </div>
            </div>

            {/* Product detail */}
            <div className="flex align-middle border-none gap-8 mt-10 bg-white p-4">
               <div>
                  <h1 className="font-[500] text-black text-2xl">
                     Chi tiết sản phẩm
                  </h1>
                  <div className="flex gap-2 content-center my-6 align-middle">
                     <h1 className="opacity-60 mr-8 py-1 w-24">Danh mục</h1>
                     <div className="px-2 py-1 ">
                        <Breadcrumb
                           aria-label="Solid background breadcrumb example"
                           className="bg-gray-50 py-3 px-5  dark:bg-gray-900"
                        >
                           <Breadcrumb.Item href="/">LofiShop</Breadcrumb.Item>
                           <Breadcrumb.Item href="#">
                              Hoodie và Áo khoác nỉ
                           </Breadcrumb.Item>
                           <Breadcrumb.Item href="#">
                              Áo khoác nỉ
                           </Breadcrumb.Item>
                        </Breadcrumb>
                     </div>
                  </div>

                  <div className="flex gap-2 content-center my-6 align-middle">
                     <h1 className="opacity-60 mr-8 py-1 w-24">
                        Chiều dài tay
                     </h1>
                     <div className="px-2 py-1 text-black">Dài tay</div>
                  </div>
                  <div className="flex gap-2 content-center my-6 align-middle">
                     <h1 className="opacity-60 mr-8 py-1  w-24">Phong cách</h1>
                     <div className="px-2 py-1 text-black">{props.style}</div>
                  </div>
                  <div className="flex gap-2 content-center my-6 align-middle">
                     <h1 className="opacity-60 mr-8 py-1  w-24">Chất liệu</h1>
                     <div className="px-2 py-1 text-black">
                        {props.material}
                     </div>
                  </div>
                  <div className="flex gap-2 content-center my-6 align-middle">
                     <h1 className="opacity-60 mr-8 py-1  w-24">Xuất xứ</h1>
                     <div className="px-2 py-1 text-black">{props.origin}</div>
                  </div>
                  <div className="flex gap-2 content-center my-6 align-middle">
                     <h1 className="opacity-60 mr-8 py-1  w-24">Mẫu</h1>
                     <div className="px-2 py-1 text-black">{props.sample}</div>
                  </div>
                  <h1 className="font-[500] text-black text-2xl">
                     Mô tả chi tiết
                  </h1>
                  <p className="my-4">{props.description}</p>
               </div>
            </div>
            {/* Comment section */}
            <CommentSection product={props} />
         </form>
         {showLoginModal && <ConfirmLoginModal onShow={setShowLoginModal} />}
      </DefaultLayout>
   );
};

export default ProductPage;

export async function getStaticPaths() {
   const products = await productApis.getAllProducts();
   const paths = products.map((product: ProductType) => {
      return {
         params: { id: product.id },
      };
   });

   return {
      paths,
      fallback: false,
   };
}

type ParamsType = {
   id: string;
};

export async function getStaticProps({ params }: { params: ParamsType }) {
   const productInfo = await productApis.getProductInfo(params.id);

   return {
      props: {
         ...productInfo,
      },
   };
}
