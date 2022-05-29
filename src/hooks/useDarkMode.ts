import { useState, useEffect } from 'react';

enum Theme {
  DARK_MODE = 'dark-mode'
}

interface UseDarkModeOutput {
  darkMode: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

const useDarkMode = (): UseDarkModeOutput => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const darkModeJSON = localStorage.getItem(Theme.DARK_MODE);

    if (darkModeJSON) {
      setDarkMode(JSON.parse(darkModeJSON));
    } else {
      localStorage.setItem(Theme.DARK_MODE, 'false');
    }
  }, []);

  const toggle = () => {
    setDarkMode(prev => !prev);
    localStorage.setItem(Theme.DARK_MODE, JSON.stringify(!darkMode));
  };

  const html = document.querySelector('html');
  if (darkMode) {
    html?.classList.add('dark');
    html?.classList.add('bg-stone-800');
  } else {
    html?.classList.remove('dark');
    html?.classList.remove('bg-stone-800');
  }

  return {
    darkMode,
    toggle,
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false)
  };
};

export default useDarkMode;
