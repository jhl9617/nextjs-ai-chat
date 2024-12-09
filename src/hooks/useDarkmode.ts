import { useState, useEffect } from 'react';

export function useDarkMode() {
  // localStorage에서 사용자 설정 불러오기
  const [darkMode, setDarkMode] = useState<'system' | 'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return (saved as 'system' | 'dark' | 'light') || 'system';
    }
    return 'system';
  });

  // 시스템 다크모드 상태 감지
  const [systemTheme, setSystemTheme] = useState<boolean>(false);

  useEffect(() => {
    // 시스템 다크모드 감지
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(darkModeMediaQuery.matches);

    // 시스템 테마 변경 감지
    const listener = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches);
    };

    darkModeMediaQuery.addEventListener('change', listener);
    return () => darkModeMediaQuery.removeEventListener('change', listener);
  }, []);

  // 실제 다크모드 상태 계산
  const isDarkMode = darkMode === 'system' ? systemTheme : darkMode === 'dark';

  // HTML class 적용
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 테마 변경 함수
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // 시스템 설정으로 복구
  const resetToSystem = () => {
    setDarkMode('system');
    localStorage.setItem('theme', 'system');
  };

  return {
    isDarkMode,
    toggleTheme,
    resetToSystem,
    currentTheme: darkMode,
  };
}