"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao fazer login");
      }
    } catch (err) {
      setError("Erro de rede. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-['Montserrat']">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center mb-6">
          <img
            src="/assets/logo.png"
            alt="La Roche Logo"
            className="h-20 w-auto bg-[#00315e] p-2 rounded shadow-md"
          />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#00315e] font-['Playfair_Display']">
          Acesso Restrito
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Painel de Gerenciamento La Roche
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha de Acesso
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00315e] focus:border-[#00315e] sm:text-sm text-black"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm font-medium p-2 bg-red-50 rounded border border-red-100">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00315e] hover:bg-[#005090] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00315e] disabled:opacity-70 transition-colors"
              >
                {loading ? "Verificando..." : "Entrar no Painel"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
