import { ConfigProvider } from "antd";
import {
  legacyLogicalPropertiesTransformer,
  px2remTransformer,
  StyleProvider,
} from "@ant-design/cssinjs";
import { themeAntModes, themeConfig } from "@/helpers/theme-config";
import ko from "antd/locale/ko_KR";
import "@/scss/index.scss";
import { useThemeStore } from "@/stores/theme";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/helpers/query-client";
import { Helmet } from "react-helmet-async";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const px2rem = px2remTransformer({
  rootValue: 10, // 10px = 1rem;
});
function RootLayout({ children }: { children: React.ReactNode }) {
  const { isDarkMode, themeName, prefix } = useThemeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add(themeName);
    } else {
      document.body.classList.remove("dark");
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <StyleProvider
        transformers={[legacyLogicalPropertiesTransformer, px2rem]}
        hashPriority="high"
        autoClear
      >
        <ConfigProvider
          theme={{
            algorithm: themeAntModes[themeName],
            ...themeConfig,
          }}
          prefixCls={prefix}
          iconPrefixCls={prefix}
          locale={ko}
        >
          <Helmet>
            <meta
              name="theme-color"
              content={isDarkMode ? "#161616" : "#fff"}
            />
          </Helmet>

          {children}
        </ConfigProvider>
      </StyleProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default RootLayout;
