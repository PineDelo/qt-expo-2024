import { MappingAlgorithm } from 'antd';

export {};

declare global {
  type ThemeAntModeType = {
    [key: string]: MappingAlgorithm;
  };

  type ThemeStringModeType = {
    [key: string]: string;
  };
}
