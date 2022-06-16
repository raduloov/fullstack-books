import { useState, useEffect } from 'react';

enum Theme {
  THEME = 'theme',
  DARK = 'dark',
  LIGHT = 'light'
}

interface UseDarkModeOutput {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useDarkMode = (): UseDarkModeOutput => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem(Theme.THEME) === Theme.DARK ? true : false
  );

  useEffect(() => {
    const html = document.querySelector('html');
    if (darkMode) {
      html?.classList.add(Theme.DARK);
      html?.classList.add('bg-stone-800');
      localStorage.setItem(Theme.THEME, Theme.DARK);
    } else {
      html?.classList.remove(Theme.DARK);
      html?.classList.remove('bg-stone-800');
      localStorage.setItem(Theme.THEME, Theme.LIGHT);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return { darkMode, toggleDarkMode };
};
