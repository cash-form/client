"use client";

import { useRouter } from "next/navigation";
import LoginForm from "components/client/form/loginForm";

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <LoginForm onClose={handleLoginSuccess} />
      </div>
    </div>
  );
}