"use client";

import { useEffect, useState } from "react";
import AdminPanel from "./AdminPanel";

export default function AdminListener() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const secretCode = "admin"; // Secret code word
  const [inputBuffer, setInputBuffer] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't listen if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toLowerCase();
      setInputBuffer((prev) => {
        const newBuffer = (prev + key).slice(-secretCode.length);
        if (newBuffer === secretCode) {
          setIsAdminOpen(true);
        }
        return newBuffer;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isAdminOpen) return null;

  return <AdminPanel onClose={() => setIsAdminOpen(false)} />;
}
