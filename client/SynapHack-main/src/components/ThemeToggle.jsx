import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enabled = stored ? stored === 'dark' : prefersDark;
    setIsDark(enabled);
    document.documentElement.classList.toggle('dark', enabled);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center justify-center h-10 px-3 rounded-lg bg-[#f0f0f4] text-[#111118] dark:bg-[#1f1f24] dark:text-white text-sm font-bold"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {isDark ? 'Light' : 'Dark'}
    </button>
  );
}


