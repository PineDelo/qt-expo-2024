import { ThemeConfig, theme } from 'antd';
const { darkAlgorithm, defaultAlgorithm } = theme;

const themeAntModes: ThemeAntModeType = {
  dark: darkAlgorithm,
  light: defaultAlgorithm,
};

// const token: { [key: number]: Partial<AliasToken> } = {
//   1: {
//     // colorPrimary: '#1677ff',
//   },
//   2: {
//     colorPrimary: '#52c41a',
//   },
// };

const themeConfig: ThemeConfig = {
  token: {
    // borderRadius: 2,
    // colorBgLayout: '#fff',
    // colorBgContainer: '#f7f7f7',
    // colorTextBase: 'red',
    // colorBgContainer: 'green',
    // colorBgLayout: 'red',
    // colorText: 'green',
    // colorBgBase: 'yellow',
    // ...token[2],
  },
  components: {
    Layout: {
      headerHeight: 50,
      headerPadding: 0,
    },
    Typography: {
      titleMarginTop: 0,
      titleMarginBottom: 0,
    },
  },
  hashed: false,
  // cssVar: { prefix: 'qua', key: 'qqq' },
};

export { themeConfig, themeAntModes };
