import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const applyTheme = (t: 'dark' | 'light') => {
    const root = document.documentElement;
    root.setAttribute('data-theme', t);
    if (t === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_theme') as 'dark' | 'light' | null;
    const initial = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('portfolio_theme', next);
    applyTheme(next);
  };

  return { theme, toggleTheme };
}
