import { authApi } from "@/apis/authApis";
import { imageAssets } from "@/assets";
import BackToHome from "@/components/BackToHome";
import EmptyLayout from "@/layouts/EmptyLayout";
import { UserCreateType, UserErrorCreateType } from "@/types/UserType";
import { validateEmail } from "@/utilities/FormatFunc";
import { useMutation } from "@tanstack/react-query";
import { FileInput, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const initialFormState: UserCreateType = {
   avatar: null,
   email: "",
   password: "",
   confirmPassword: "",
   phone: "",
   username: "",
   acceptedTerm: false,
};

const initialErrorState: UserErrorCreateType = {
   avatar: "",
   email: "",
   password: "",
   confirmPassword: "",
   phone: "",
   username: "",
   acceptedTerm: "",
};

const SignUp = () => {
   const mutation = useMutation({
      mutationFn: authApi.register,
   });

   const [previewAvatar, setPreviewAvatar] = useState<string | null>();
   const [formState, setFormState] = useState<UserCreateType>(initialFormState);
   const [errorForm, setErrorForm] =
      useState<UserErrorCreateType>(initialErrorState);

   const handlePreviewAvatar = (file: ChangeEvent<HTMLInputElement>) => {
      setErrorForm((prev) => ({ ...prev, avatar: "" }));
      if (file && file.target.files && file.target.files[0]) {
         setPreviewAvatar(URL.createObjectURL(file.target.files[0]));

         setFormState((prev: UserCreateType) => {
            return { ...prev, avatar: file.target.files?.[0] };
         });
      } else {
         setPreviewAvatar(null);
         setFormState((prev: UserCreateType) => {
            return { ...prev, avatar: null };
         });
      }
   };

   const handleOnChange =
      (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
         setFormState((prev) => {
            return {
               ...prev,
               [name]: event.target.value,
            };
         });

         setErrorForm((prev) => ({ ...prev, [name]: "" }));
      };

   const resetAllStates = () => {
      setFormState(() => initialFormState);
      setErrorForm(() => initialErrorState);
      setPreviewAvatar(null);
      const checkboxTerm: HTMLInputElement | null = document.getElementById(
         "terms"
      ) as HTMLInputElement;

      checkboxTerm.checked = false;

      const inputFile: HTMLInputElement | null = document.getElementById(
         "avatar"
      ) as HTMLInputElement;
      inputFile.value = "";
   };

   const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let isValid = true;

      const handleSetErrorForm = (name: string, msg: string) => {
         setErrorForm((prev) => ({ ...prev, [name]: msg }));
      };

      // Check valid email
      if (!formState.email) {
         isValid = false;
         handleSetErrorForm("email", "Please enter your email address !");
      } else if (!validateEmail(formState.email)) {
         isValid = false;
         handleSetErrorForm(
            "email",
            "Please enter a valid email address to use as your Lofi ID."
         );
      } else handleSetErrorForm("email", "");

      // Check valid username
      if (!formState.username) {
         isValid = false;
         handleSetErrorForm("username", "Please enter your username !");
      } else handleSetErrorForm("username", "");

      // Check valid password
      if (!formState.password) {
         isValid = false;
         handleSetErrorForm("password", "Please enter your password !");
      } else handleSetErrorForm("password", "");

      // Check valid confirm password
      if (!formState.confirmPassword) {
         isValid = false;
         handleSetErrorForm(
            "confirmPassword",
            "Please enter your confirm password !"
         );
      } else if (formState.confirmPassword !== formState.password) {
         isValid = false;
         handleSetErrorForm(
            "confirmPassword",
            "The password and confirm password you entered did not match together."
         );
      } else handleSetErrorForm("confirmPassword", "");

      // Check valid phone
      if (!formState.phone) {
         isValid = false;
         handleSetErrorForm("phone", "Please enter your phone !");
      } else handleSetErrorForm("phone", "");

      // Check valid avatar
      if (!formState.avatar) {
         isValid = false;
         handleSetErrorForm("avatar", "Please input your avatar !");
      } else handleSetErrorForm("avatar", "");

      // Check valid form
      if (!isValid) {
         return;
      }
      mutation.mutateAsync(formState, {
         onSuccess: () => {
            resetAllStates();
            toast("Register successfully.", {
               type: "success",
            });
         },
      });
      // Reset State
   };

   return (
      <EmptyLayout>
         <BackToHome />

         <section
            className={`bg-gray-50 dark:bg-gray-900 ${
               previewAvatar ? "py-52" : "py-32"
            }`}
         >
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
               {/* Logo & Shop name */}
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
                     <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                     </h1>
                     <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleSubmitForm}
                     >
                        {/* Email */}
                        <div>
                           <div className="mb-2 block">
                              <Label htmlFor="email" value="Email" />
                           </div>
                           <TextInput
                              id="email"
                              type="email"
                              name="email"
                              color={`${errorForm.email ? "failure" : "#000"}`}
                              value={formState.email}
                              onChange={handleOnChange("email")}
                              helperText={
                                 <React.Fragment>
                                    {errorForm.email && (
                                       <>
                                          <span className="font-medium mr-1">
                                             {errorForm.email}
                                          </span>
                                       </>
                                    )}
                                 </React.Fragment>
                              }
                           />
                        </div>
                        {/* Username */}
                        <div>
                           <div className="mb-2 block">
                              <Label htmlFor="username" value="Your username" />
                           </div>
                           <TextInput
                              id="username"
                              type="text"
                              name="username"
                              color={`${
                                 errorForm.username ? "failure" : "#000"
                              }`}
                              value={formState.username}
                              onChange={handleOnChange("username")}
                              helperText={
                                 <React.Fragment>
                                    {errorForm.username && (
                                       <>
                                          <span className="font-medium mr-1">
                                             {errorForm.username}
                                          </span>
                                       </>
                                    )}
                                 </React.Fragment>
                              }
                           />
                        </div>
                        {/* Password */}
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
                              value={formState.password}
                              name="password"
                              color={`${
                                 errorForm.password ? "failure" : "#000"
                              }`}
                              onChange={handleOnChange("password")}
                              helperText={
                                 <React.Fragment>
                                    {errorForm.password && (
                                       <>
                                          <span className="font-medium mr-1">
                                             {errorForm.password}
                                          </span>
                                       </>
                                    )}
                                 </React.Fragment>
                              }
                           />
                        </div>
                        {/* Confirm password */}
                        <div>
                           <label
                              htmlFor="confirm-password"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              Confirm password
                           </label>
                           <TextInput
                              type="password"
                              value={formState.confirmPassword}
                              name="confirm-password"
                              id="confirm-password"
                              onChange={handleOnChange("confirmPassword")}
                              color={`${
                                 errorForm.confirmPassword ? "failure" : "#000"
                              }`}
                              helperText={
                                 <React.Fragment>
                                    {errorForm.confirmPassword && (
                                       <>
                                          <span className="font-medium mr-1">
                                             {errorForm.confirmPassword}
                                          </span>
                                       </>
                                    )}
                                 </React.Fragment>
                              }
                           />
                        </div>
                        {/* Phone */}
                        <div>
                           <div className="mb-2 block">
                              <Label htmlFor="phone" value="Phone" />
                           </div>
                           <TextInput
                              id="phone"
                              type="tel"
                              name="phone"
                              value={formState.phone}
                              color={`${errorForm.phone ? "failure" : "#000"}`}
                              onChange={handleOnChange("phone")}
                              helperText={
                                 <React.Fragment>
                                    {errorForm.phone && (
                                       <>
                                          <span className="font-medium mr-1">
                                             {errorForm.phone}
                                          </span>
                                       </>
                                    )}
                                 </React.Fragment>
                              }
                           />
                        </div>
                        {/* Upload file */}
                        <div id="fileUpload">
                           <div className="mb-2 block">
                              <Label htmlFor="avatar" value="Upload avatar" />
                           </div>
                           {previewAvatar && (
                              <img
                                 className="my-4 rounded-full object-cover h-32 w-32"
                                 src={previewAvatar}
                                 alt="preview avatar"
                              />
                           )}
                           <FileInput
                              id="avatar"
                              onChange={handlePreviewAvatar}
                              helperText={
                                 <>
                                    {errorForm.avatar ? (
                                       <>
                                          <span className="font-medium mr-1">
                                             {errorForm.avatar}
                                          </span>
                                       </>
                                    ) : (
                                       "A profile picture is useful to identify you."
                                    )}
                                 </>
                              }
                              color={`${errorForm.avatar ? "failure" : "#000"}`}
                           />
                        </div>
                        {/* Accepted Terms and Conditions */}
                        <div className="flex items-start pt-4">
                           <div className="flex items-center h-5">
                              <TextInput
                                 name="terms"
                                 required={true}
                                 id="terms"
                                 aria-describedby="terms"
                                 type="checkbox"
                              />
                           </div>
                           <div className="ml-3 text-sm">
                              <label
                                 htmlFor="terms"
                                 className="font-light text-gray-500 dark:text-gray-300"
                              >
                                 I accept the{" "}
                                 <a
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    href="#"
                                 >
                                    Terms and Conditions
                                 </a>
                              </label>
                           </div>
                        </div>
                        <button
                           type="submit"
                           className="w-full text-white bg-gray-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                           Create an account
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                           Already have an account?{" "}
                           <Link
                              href="/auth/login"
                              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                           >
                              Login here
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

export default SignUp;
