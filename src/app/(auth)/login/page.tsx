"use client";

import { login as loginAuth } from "@/api/services/authService";
import { getProfile } from "@/api/services/getProfile";
import desktopImage from "@/assets/images/desktop-login-icon.png";
import mobileImage from "@/assets/images/mobile-login-icon.png";
import Button from "@/components/buttons/Button";
import ErrorPopup from "@/components/ErrorPopup";
import InputFieldType1 from "@/components/inputfields/InputFieldType1";
import LogoBox from "@/components/LogoBox";
import ToggleTheme from "@/components/ToggleTheme";
import { storeRoleInCookie, storeTokenInCookie } from "@/lib/tokenCookies";
import { AppRouter } from "@/router";
import { errorStore } from "@/stores/errorStore";
import { useUserStore } from "@/stores/userStore";
import { loginSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/stores/useToast";
import Toast from "@/components/customtoast/CustomToast";

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { isError, setError } = errorStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(inputData: LoginFormData) {
    setLoading(true);
    try {
      const response = await loginAuth(inputData.email, inputData.password);

      if (!response?.token) {
        throw new Error("An unknown error occurred. Please try again.");
      }

      await storeTokenInCookie(response.token);
      const user = await getProfile();

      if (!user || !user.role) {
        throw new Error("Invalid user profile data");
      }
      // login(user); // Store user in store
      await storeRoleInCookie(user.role);

      // Redirect user to dashboard based on role
      if (user.role === "admin") {
        router.push(AppRouter.staffDashboardStaff);
      } else if (user.role === "staff") {
        router.push(AppRouter.staffDashboardStaff);
      } else if (user.role === "student") {
        router.push(AppRouter.studentDashboard);
      } else if (user.role === "tutor") {
        router.push(AppRouter.tutorDashboard);
      } else {
        throw new Error("Invalid user role");
      }
      return;
    } catch (error: any) {
      setError(
        error.errorText ||
          error.message ||
          "An unknown error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {isError && <ErrorPopup />}
      <div className="h-svh w-svw overflow-clip flex items-center justify-center bg-login sm:px-4">
        <div className="flex flex-col sm:flex-row justify-between bg-theme sm:bg-secondaryBackground sm:shadow-xl sm:rounded-3xl h-full w-full sm:w-full sm:max-w-[800px] sm:h-[583px] relative">
          {/* Top Section */}
          <div className="flex flex-col items-center justify-center w-full sm:w-1/2 bg-theme sm:rounded-l-3xl sm:p-6">
            {/* Mobile Image */}
            <Image
              src={mobileImage}
              alt="Login Illustration"
              loading="lazy"
              className="object-contain sm:hidden"
            />

            {/* Desktop Image */}
            <Image
              src={desktopImage}
              alt="Login Illustration"
              className="w-[80%] object-contain hidden sm:block"
            />
          </div>

          {/* Middle Section */}
          <div className="flex flex-col justify-center items-start sm:w-1/2 bg-secondaryBackground px-6 py-7 sm:px-2 mx-5 sm:shadow-none shadow-cusShadow rounded-lg">
            <div className="hidden sm:block absolute top-6 right-8">
              <ToggleTheme />
            </div>

            <h2 className="text-4xl font-semibold text-primaryText">Login</h2>
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="w-full mt-1 flex flex-col"
            >
              <div className="mt-3.5 flex flex-col gap-3">
                <InputFieldType1
                  id="email"
                  label="Email"
                  type="email"
                  ariaLabel="Enter your email here"
                  placeholder="Enter Your Email"
                  register={register("email")}
                  error={errors.email?.message}
                />

                <InputFieldType1
                  id="password"
                  label="Password"
                  type="password"
                  ariaLabel="Enter your password here"
                  placeholder="Enter Your Password"
                  register={register("password")}
                  error={errors.password?.message}
                />
              </div>
              <div className="flex justify-center mt-6">
                <Button
                  text="Sign In"
                  type="submit"
                  ariaLabel="Sign in button"
                  fullWidth={true}
                  disabled={loading}
                />
              </div>
              <Link
                href="/forget-password"
                className="pt-2 text-xs text-center text-theme cursor-pointer hover:underline"
              >
                Forgot password?
              </Link>
            </form>
          </div>

          {/* Bottom Section */}
          <div className="flex justify-between items-center w-full sm:w-auto p-6 sm:p-4 sm:absolute sm:top-0 sm:left:0">
            <div className="sm:hidden">
              <ToggleTheme />
            </div>
            <LogoBox />
          </div>
        </div>
        <Toast message={toast?.message} type={toast?.type} />
      </div>
    </>
  );
}
