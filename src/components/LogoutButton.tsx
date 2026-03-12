"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
    >
      <i className="ph ph-sign-out text-lg"></i>
      {isLoggingOut ? "Saindo..." : "Sair do Painel"}
    </button>
  );
}
