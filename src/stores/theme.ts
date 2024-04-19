import { SiderTheme } from 'antd/es/layout/Sider';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
  isDarkMode: boolean;
  themeName: SiderTheme;
  prefix: string;
  changeMode: (state: boolean) => void;
};

export const useThemeStore = create(
  persist<State>(
    (set) => ({
      isDarkMode: false,
      themeName: 'light',
      prefix: 'qt',
      changeMode: (state) => {
        set({ isDarkMode: state });
        set({ themeName: state ? 'dark' : 'light' });
      },
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
