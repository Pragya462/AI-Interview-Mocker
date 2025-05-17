import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Side Image Section */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Interview Preparation Image"
            src="https://www.recruiter.com/recruiting/wp-content/uploads/2022/10/ai-job-interviews.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
        </section>

        {/* Right Side Sign-In Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl text-center">
            <h2 className="mb-5 text-2xl font-bold text-black sm:text-3xl md:text-4xl">
              Welcome to PrepBot🦑
            </h2>
            <p className="mb-7 leading-relaxed text-black/90">
              Make your Interview Preparation easy with PrepBot.
            </p>
            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}
