import loginImage from "@/assets/login-image.jpg";
import GoogleSignInButton from "@/components/buttons/google-sigin-button";
import LoginForm from "@/components/forms/login-form";
import { ROUTES } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="bg-card flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">Login to SCM</h1>
          <div className="space-y-5">
            <GoogleSignInButton />
            <div className="flex items-center gap-3">
              <div className="bg-muted h-px flex-1" />
              <span>OR</span>
              <div className="bg-muted h-px flex-1" />
            </div>
            <LoginForm />
            <Link
              href={ROUTES.SIGNUP}
              className="block text-center hover:underline"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
        <Image
          src={loginImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
