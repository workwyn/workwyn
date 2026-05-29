import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Branding (Hidden on mobile) */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-brand-blue p-12 lg:flex">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-brand-yellow/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

        <Link href="/" className="relative z-10 inline-block">
          <Image
            src="/images/Workwyn-logo-long-white.png"
            alt="Workwyn Logo"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
          />
        </Link>
        <div className="relative z-10 max-w-md text-white">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
            Collaborate.<br />
            Build.<br />
            <span className="text-brand-yellow">Make it happen.</span>
          </h1>
          <p className="mt-6 text-lg text-blue-100">
            Join a community of builders, creators, and doers turning visions into reality.
          </p>
        </div>
        <div className="relative z-10 text-sm font-medium text-brand-blue-dark/50">
          © {new Date().getFullYear()} Workwyn. All rights reserved.
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24">
        {/* Mobile Logo */}
        <div className="mb-8 flex justify-center lg:hidden">
          <Link href="/">
            <Image
              src="/images/Untitled-5_Workwyn-logo-long.png"
              alt="Workwyn Logo"
              width={100}
              height={30}
              className="h-7 w-auto object-contain"
            />
          </Link>
        </div>
        
        <div className="mx-auto w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
