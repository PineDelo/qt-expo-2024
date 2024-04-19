import React from "react";
import { Flex, Button } from "antd";
import { MoonLoader } from "react-spinners";
import MatchTxt from "@/assets/result-match-black.svg?react";
import RankingTxt from "@/assets/ranking.svg?react";
import RankingDesc from "@/assets/ranking-desc.png";
import BookmarkRanker from "@/assets/first-ranker.svg?react";
import Styles from "@/scss/Ranking.module.scss";
import { CarouselProps } from "@/utils/types";

interface RankingProps extends CarouselProps {
  retry: () => void;
  reset: () => void;
  rankerList: any;
  rankerOption: string;
  getRankerList: (option: string) => void;
}

const Ranking: React.FC<RankingProps> = ({
  retry,
  reset,
  user,
  goTo,
  rankerList,
  rankerOption,
  getRankerList,
}) => {
  return (
    <Flex justify="center" align="center">
      {rankerList.length < 1 ? (
        <Flex align="center" justify="center">
          <MoonLoader
            className={Styles.loading_bar}
            loading={rankerList.length}
            color="#0078FE"
            size={150}
          />
        </Flex>
      ) : (
        <Flex
          className={Styles.ranking_wrapper}
          vertical
          align="center"
          justify="center"
        >
          <Flex className={Styles.title} justify="center" align="center">
            <MatchTxt />
            <span className={Styles.match_rate}>48.75%</span>
          </Flex>
          <Flex className={Styles.title} justify="center" align="center">
            <RankingTxt />
            <span className={Styles.match_rate}>{user.rank}위</span>
          </Flex>
          <img className={Styles.ranking_desc} src={RankingDesc} />
          <Flex className={Styles.button_group} gap={10}>
            <Button
              className={Styles.button_option}
              type={rankerOption === "f" ? "primary" : "default"}
              onClick={() => getRankerList("woman")}
            >
              주희 랭킹
            </Button>
            <Button
              className={Styles.button_option}
              type={rankerOption === "m" ? "primary" : "default"}
              onClick={() => getRankerList("man")}
            >
              재윤 랭킹
            </Button>
            <Button
              className={Styles.button_option}
              type={rankerOption === "all" ? "primary" : "default"}
              onClick={() => getRankerList("all")}
            >
              성공한 사람
            </Button>
          </Flex>
          <Flex className={Styles.ranker_list} vertical justify="flex-start">
            {rankerList?.map((data: any, idx: number) => {
              const ranking = idx + 1;
              return idx === 0 ? (
                <Flex>
                  <BookmarkRanker className={Styles.bookmark} />
                  <Flex
                    className={Styles.ranker}
                    style={{
                      marginTop: "1.6rem",
                      width: "51.6rem",
                      borderColor: "#0078fe",
                    }}
                    justify="space-between"
                    align="center"
                  >
                    <Flex justify="center" align="center">
                      <Flex
                        className={Styles.rank_num_wrapper}
                        justify="center"
                        align="center"
                      >
                        <span
                          className={Styles.rank_num}
                          style={{ color: "#0078fe" }}
                        >
                          {ranking}
                        </span>
                      </Flex>
                      <Flex vertical>
                        <span className={Styles.phone}>{data.phone}</span>
                        <span className={Styles.date}>{data.date}</span>
                      </Flex>
                    </Flex>
                    <span className={Styles.rate}>{data.rate}%</span>
                  </Flex>
                </Flex>
              ) : (
                <Flex>
                  <Flex
                    className={Styles.ranker}
                    style={{
                      marginTop: "1.6rem",
                    }}
                    justify="space-between"
                    align="center"
                  >
                    <Flex justify="center" align="center">
                      <Flex
                        className={Styles.rank_num_wrapper}
                        justify="center"
                        align="center"
                      >
                        <span className={Styles.rank_num}>{ranking}</span>
                      </Flex>
                      <Flex vertical>
                        <span className={Styles.phone}>{data.phone}</span>
                        <span className={Styles.date}>{data.date}</span>
                      </Flex>
                    </Flex>
                    <span className={Styles.rate}>{data.rate}%</span>
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
          <Flex className={Styles.bottom_button_group} vertical gap={16}>
            <Button
              className={Styles.buttons}
              type="primary"
              onClick={retry}
              disabled={user.count === 0}
            >
              재도전 하기
            </Button>
            <Button
              className={Styles.buttons}
              type="default"
              onClick={() => {
                goTo?.("prev");
              }}
            >
              이전으로
            </Button>
            <Button
              className={Styles.buttons}
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
      )}
    </Flex>
  );
};

export default React.memo(Ranking);
