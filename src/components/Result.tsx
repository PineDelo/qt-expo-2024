import React from "react";
import { CarouselProps } from "@/utils/types";
import MatchTxt from "@/assets/result-match-blue.svg?react";
import InfoImg from "@/assets/result-info.svg?react";
import { Button, Flex } from "antd";
import Styles from "@/scss/Result.module.scss";

interface ResultProps extends CarouselProps {
  retry: () => void;
  reset: () => void;
  rankLoading: boolean;
}

const Result: React.FC<ResultProps> = ({
  retry,
  user,
  reset,
  rankLoading,
  func,
  setPageIndex,
}) => {
  return (
    <Flex
      className={Styles.result_wrapper}
      vertical
      justify="center"
      align="center"
    >
      <Flex className={Styles.title} justify="center" align="center">
        <MatchTxt />
        <span className={Styles.match_rate}>
          {String(user.lastSimilarity * 100)}%
        </span>
      </Flex>
      <p className={Styles.count_content}>
        남은 참여 횟수는 <span className={Styles.count}>{user.count}회</span>{" "}
        입니다.
      </p>
      <Flex>
        <Flex vertical gap={24}>
          <div>
            <p className={Styles.spectrogram_title}>재윤의 스펙트로그램</p>
            <img
              className={Styles.spectrogram_img}
              src={`http://192.168.0.10:10403${user.spectrogram}`}
            />
          </div>
          <div>
            <p className={Styles.spectrogram_title}>참여자의 스펙트로그램</p>
            <img
              className={Styles.spectrogram_img}
              src={`http://192.168.0.10:10403${user.spectrogram}`}
            />
          </div>
        </Flex>
        <InfoImg className={Styles.result_info} />
      </Flex>
      <Flex className={Styles.btn_group} vertical align="center">
        <Button
          className={Styles.btns}
          type="primary"
          onClick={retry}
          disabled={user.count === 0}
        >
          재도전 하기
        </Button>
        <Button
          className={Styles.btns}
          loading={rankLoading}
          onClick={() => setPageIndex(4)}
        >
          랭킹 확인하기
        </Button>
        <Button
          className={Styles.btns}
          type="default"
          style={{
            marginBottom: "5rem",
            background: "none",
            border: "none",
          }}
          onClick={reset}
        >
          처음으로
        </Button>
      </Flex>
    </Flex>
  );
};

export default React.memo(Result);
