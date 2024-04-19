import React from "react";
import { MoonLoader } from "react-spinners";
import AnalyzingImg from "@/assets/analyzing.svg?react";
import { Flex } from "antd";
import Styles from "@/scss/Analzing.module.scss";

interface AnalyzingProps {
  analyzeLoading: boolean;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
}

const Analyzing: React.FC<AnalyzingProps> = ({ analyzeLoading }) => {
  return (
    <Flex vertical justify="center" align="center">
      <MoonLoader
        className={Styles.loading_bar}
        loading={analyzeLoading}
        color="#0078FE"
        size={150}
      />
      <AnalyzingImg className={Styles.loading_txt} />
    </Flex>
  );
};

export default React.memo(Analyzing);
