import { imageAssets } from "@/assets";
import BackToHome from "@/components/BackToHome";
import EmptyLayout from "@/layouts/EmptyLayout";
import { validateEmail } from "@/utilities/FormatFunc";
import { TextInput } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/apis/authApis";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { UserLoginType } from "@/types/UserType";
import { setLogin } from "@/redux/userSlice";
import { toast } from "react-toastify";

const initialFormState: UserLoginType = {
   email: "",
   password: "",
};

const initialErrorState: UserLoginType = {
   email: "",
   password: "",
};

const Login = () => {
   const router = useRouter();
   const dispatch = useDispatch();

   const loginMutation = useMutation({
      mutationFn: authApi.login,
      onSuccess: (res) => {
         dispatch(
            setLogin({
               user: res.data.user,
               token: res.data.token,
            })
         );
         setFormData(() => initialFormState);
         router.push("/");
      },
      onError: () => {
         toast("Tài khoản hoặc mật khẩu không đúng.", {
            type: "error",
         });
      },
   });

   const [formData, setFormData] = useState<UserLoginType>(initialFormState);
   const [errorForm, setErrorForm] = useState<UserLoginType>(initialErrorState);

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let isValid = true;
      if (!formData.email) {
         isValid = false;
         handleChangeError("email", "Email must not be empty.");
      } else if (!validateEmail(formData.email)) {
         isValid = false;
         handleChangeError("email", "An invalid email address.");
      }

      if (!formData.password) {
         isValid = false;
         handleChangeError("password", "Password must not be empty.");
      }
      if (!isValid) return;

      loginMutation.mutate(formData);
   };

   const handleChangeError = (name: string, msg: string) => {
      setErrorForm((prev) => ({ ...prev, [name]: msg }));
   };

   const handleChange =
      (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
         setFormData((prev) => ({ ...prev, [name]: event.target.value }));
         setErrorForm((prev) => ({ ...prev, [name]: "" }));
      };

   return (
      <EmptyLayout styles="overflow-hidden max-h-screen">
         <BackToHome />
         <section className="bg-gray-50 dark:bg-gray-900">
            <div className=" flex flex-col items-center justify-center pb-8 mx-auto md:h-screen lg:py-0">
               <a
                  href="#"
                  className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
               >
                  <img
                     src={imageAssets.logo.src}
                     className="w-8 h-8 mr-2  bg-black rounded-full p-1"
                     alt="Flowbite Logo"
                  />
                  Lofi Shop
               </a>
               <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                     <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Welcome back !
                     </h1>
                     <h1 className="text-base opacity-50 leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Login to your account.
                     </h1>
                     <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleSubmit}
                     >
                        <div>
                           <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              Your email
                           </label>
                           <TextInput
                              id="email"
                              type="email"
                              name="email"
                              color={`${errorForm.email ? "failure" : "#000"}`}
                              value={formData.email}
                              onChange={handleChange("email")}
                              helperText={
                                 <React.Fragment>
                                    {errorForm.email && (
                                       <>
                                          <span className="font-medium">
                                             {errorForm.email}
                                          </span>
                                       </>
                                    )}
                                 </React.Fragment>
                              }
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="password"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              Password
                           </label>
                           <TextInput
                              id="password"
                              type="password"
                              name="password"
                              color={`${
                                 errorForm.password ? "failure" : "#000"
                              }`}
                              value={formData.password}
                              onChange={handleChange("password")}
                              helperText={
                                 <React.Fragment>
                                    {errorForm.password && (
                                       <>
                                          <span className="font-medium">
                                             {errorForm.password}
                                          </span>
                                       </>
                                    )}
                                 </React.Fragment>
                              }
                           />
                        </div>

                        <div className="flex items-center justify-between pt-4 ">
                           <div className="flex items-start">
                              <div className="flex items-center h-5">
                                 <input
                                    id="remember"
                                    aria-describedby="remember"
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                 />
                              </div>
                              <div className="ml-3 text-sm">
                                 <label
                                    htmlFor="remember"
                                    className="text-gray-500 dark:text-gray-300"
                                 >
                                    Remember me
                                 </label>
                              </div>
                           </div>
                           <a
                              href="#"
                              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                           >
                              Forgot password?
                           </a>
                        </div>
                        <button
                           type="submit"
                           className="w-full text-white bg-gray-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                           Sign in
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                           Don’t have an account yet?{" "}
                           <Link
                              href="/auth/sign-up"
                              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                           >
                              Sign up
                           </Link>
                        </p>
                     </form>
                  </div>
               </div>
            </div>
         </section>
      </EmptyLayout>
   );
};

export default Login;
