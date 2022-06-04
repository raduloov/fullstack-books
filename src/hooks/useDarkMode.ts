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

const useDarkMode = (): UseDarkModeOutput => {
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

// const useDarkMode = (): UseDarkModeOutput => {
//   const [darkMode, setDarkMode] = useState<boolean>(false);

//   useEffect(() => {
//     const darkModeJSON = localStorage.getItem(Theme.DARK_MODE);

//     if (darkModeJSON) {
//       setDarkMode(JSON.parse(darkModeJSON));
//     } else {
//       localStorage.setItem(Theme.DARK_MODE, 'false');
//     }
//   }, []);

//   const toggle = () => {
//     setDarkMode(prev => !prev);
//     localStorage.setItem(Theme.DARK_MODE, JSON.stringify(!darkMode));
//   };

//   const html = document.querySelector('html');
//   if (darkMode) {
//     html?.classList.add('dark');
//     html?.classList.add('bg-stone-800');
//   } else {
//     html?.classList.remove('dark');
//     html?.classList.remove('bg-stone-800');
//   }

//   return {
//     darkMode,
//     toggle,
//     enable: () => setDarkMode(true),
//     disable: () => setDarkMode(false)
//   };
// };

export default useDarkMode;
