import { userApis } from "@/apis/userApis";
import { imageAssets } from "@/assets";
import DefaultLayout from "@/layouts/DefaultLayout";
import { InvoiceType } from "@/types/InvoiceType";
import { ParamsType } from "@/types/ParamsType";
import { formatPrice } from "@/utilities/FormatFunc";
import Image from "next/image";
import React from "react";

type Props = {
   invoice: InvoiceType;
};

const Order = (props: Props) => {
   console.log("Props: ", props.invoice);

   return (
      <DefaultLayout>
         <div className="mx-auto p-16">
            <div className="mb-8 text-4xl text-center px-3">
               <span>Thank you !</span>
            </div>

            <div className="text-center text-sm px-3">
               Cảm ơn bạn đã tin tưởng sử dụng dịch vụ của chúng tôi. Chúng tôi
               sẽ hoàn thành đơn hàng sớm nhất có thể !
            </div>
            <div className="flex items-center justify-between mb-8 px-3">
               <div>
                  <span className="text-2xl font-bold">Hóa đơn: </span>
                  <span className="text-xl"> {props.invoice.order.id}</span>
                  <br />
                  <span>Ngày tạo</span>:{" "}
                  {new Date(props.invoice.order.createdDate).toLocaleString(
                     "en"
                  )}
                  <br />
               </div>
               <div className="text-right">
                  <Image
                     src={imageAssets.logo}
                     priority
                     alt="lofishop-logo"
                     className="w-24 h-24 rounded-full bg-black"
                  />
               </div>
            </div>

            <div className="flex justify-between mb-8 px-3">
               <div>
                  <h2 className="font-bold">Bill To: </h2>
                  Thịnh Nguyễn
                  <br />
                  +84 783877917
                  <br />
                  Bend, OR 97703 USA
                  <br />
                  hello@pixelandtonic.com
                  <br />
               </div>
               <div className="text-right">
                  <h2 className="font-bold">LofiShop</h2>
                  <br />
                  Street 3/2, District 10
                  <br />
                  HCM City
                  <br />
                  thinhnguyent.2002@gmail.com
               </div>
            </div>

            <div className="border border-t-2 border-gray-200 mb-8 px-3"></div>

            <div className="mb-8 px-3">
               <div className="h-14 bg-white py-1 px-4 grid grid-cols-2 items-center text-center">
                  <div className="flex items-center ml-24 ">
                     <span>Tên sản phẩm</span>
                  </div>
                  <ul className="grid items-center grid-cols-4 ">
                     <li>Đơn giá</li>
                     <li>Số lượng</li>
                     <li>Số tiền</li>
                  </ul>
               </div>
               {props.invoice.cart.map((product) => (
                  <>
                     <div className="bg-white  px-4 h-28 grid grid-cols-2 items-center text-center">
                        <div className="flex items-center gap-4 ">
                           <img
                              src={product.photoUrl}
                              className="h-20 w-20"
                              alt="product-img"
                           />
                           <span>{product.name}</span>
                           <div className="opacity-70">
                              Size {product.sizeId}
                           </div>
                        </div>
                        <ul className="grid items-center grid-cols-4 ">
                           <li>{formatPrice(product.price)}</li>
                           <li className="flex items-center h-7 justify-center text-[10px]">
                              <input
                                 className="w-20 h-full text-center"
                                 min={1}
                                 disabled
                                 defaultValue={product.quantity}
                                 type={"number"}
                              />
                           </li>
                           <li className="text-blue-600">
                              {formatPrice(product.quantity * product.price)}
                           </li>
                        </ul>
                     </div>
                     ;
                  </>
               ))}
            </div>

            <div className="flex justify-between mb-4 bg-gray-200 px-3 py-2">
               <div>Phí vận chuyển</div>
               <div className="text-right font-medium">{formatPrice(0)}</div>
            </div>
            <div className="flex justify-between mb-4 bg-gray-200 px-3 py-2">
               <div>Phí tổng</div>
               <div className="text-right font-medium">
                  {formatPrice(props.invoice.order.totalPrice)}
               </div>
            </div>

            <div className="flex justify-between items-center mb-2 px-3">
               <div className="text-2xl leading-none">
                  <span className="">Tổng tiền</span>:
               </div>
               <div className="text-2xl text-right font-medium">
                  {formatPrice(props.invoice.order.totalPrice)}
               </div>
            </div>

            <div className="flex mb-8 justify-end px-3">
               <div className="text-right w-1/2 px-0 leading-tight">
                  <small className="text-xs">
                     Nếu có bất kỳ thắc mắc gì, liên hệ qua email:
                     thinhnguyent.2002@gmail.com hoặc hotline: (+84) 783877917
                  </small>
               </div>
            </div>
         </div>
      </DefaultLayout>
   );
};

export default Order;

export async function getServerSideProps({ params }: { params: ParamsType }) {
   const response = await userApis.checkoutCart({
      userId: params.id,
   });
   const invoice = response.data;
   return {
      props: {
         invoice,
      },
   };
}
