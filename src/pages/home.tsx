// import ThemeSwitch from "@/components/theme-switch";
import { useEffect, useState, useRef } from "react";
import { Layout, Flex, Modal, Button } from "antd";
import Intro from "@/components/Intro";
import PhoneNumber from "@/components/PhoneNumber";
import Analyzing from "@/components/Analyzing";
import Result from "@/components/Result";
import { UserState } from "@/utils/types";
import QtLogo from "@/assets/qt-logo.svg?react";
import Styles from "@/scss/home.module.scss";
import Ranking from "../components/Ranking";
import dummy from "@/utils/dummy.json";
import { apis } from "@/helpers/apis";
import ModalError from "@/assets/error-modal.png";

const { Header } = Layout;

function Home() {
  // States
  const [user, setUser] = useState<UserState>({
    isAgree: false,
    gender: "",
    originNumber: "",
    formatNumber: "",
    lastSimilarity: 0,
    count: 0,
    rank: 4,
    spectrogram: "",
  });
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [rankerList, setRankerList] = useState<any>([]);
  const [rankerOption, setRankerOption] = useState<string>("f");
  const [callLoading, setCallLoading] = useState<boolean>(false);
  const [analyzeLoading, setAnalyzeLoading] = useState<boolean>(false);
  const [rankLoading, setRankLoading] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  // Refs
  const mainRef = useRef<any>(null);

  useEffect(() => {}, []);

  const call = () => {
    setCallLoading(true);
    const config = {
      phnm: user.originNumber.replace(/-/g, ""),
      gender: user.gender,
    };

    apis
      .start(config)
      .then((res) => {
        if (res.data.Success) {
          if (res.data.overtry_yn) {
            setCallLoading(false);
            return showModal();
          }
          const { gender, ...params } = config;
          status(params);
        }
      })
      .catch((e) => {
        console.log("Error in [call]: ", e);
        setCallLoading(false);
      });
  };

  const status = (params: object) => {
    apis
      .status(params)
      .then((res) => {
        console.log("Call Status: ", res.data.call_status);
        if (res.data.call_status === 2) {
          console.log("Call Ended.");
          setAnalyzeLoading(true);
          setTimeout(() => {
            setCallLoading(false);
            analyzing(params);
            setPageIndex(2);
          }, 1000);
        } else {
          setTimeout(() => status(params), 2500);
        }
      })
      .catch((e) => {
        console.log("Error in [status]: ", e);
        setCallLoading(false);
      });
  };

  const analyzing = (params: object) => {
    console.log("Analyzing...");
    apis
      .result(params)
      .then((res) => {
        setUser({
          ...user,
          lastSimilarity: res.data.last_similarity,
          count: res.data.total_cnt,
          spectrogram: res.data.spectrogram,
        });
        setTimeout(() => {
          console.log("Analyzing Ended.");
          setPageIndex(3);
          setAnalyzeLoading(false);
        }, 2000);
      })
      .catch((e) => console.log("Error in [analyzing]: ", e));
  };

  const getRankerList = (option: string) => {
    setRankerList(dummy);
    setRankerOption(option);
    setTimeout(() => {
      setRankLoading(false);
    }, 1000);
  };

  const checkRanking = () => {
    setRankLoading(true);
    getRankerList("f");
  };

  const retry = () => {
    setPageIndex(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    call();
  };

  const reset = () => {
    setUser({
      isAgree: false,
      gender: "",
      originNumber: "",
      formatNumber: "",
      lastSimilarity: 0,
      count: 5,
      rank: 0,
      spectrogram: "",
    });
    setPageIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showModal = () => {
    setIsModal(!isModal);
  };

  return (
    <main className={Styles.main} ref={mainRef}>
      <Header className={Styles.header}>
        {/* <ThemeSwitch /> */}
        <QtLogo className={Styles.qt_logo} />
        <span className={Styles.header_title}>
          We Build, Make AI Service & Connect You
        </span>
      </Header>
      <Modal
        open={isModal}
        onOk={showModal}
        onCancel={showModal}
        width={460}
        centered
        footer
      >
        <Flex vertical align="center">
          <img className={Styles.modal_error_img} src={ModalError} />
          <div className={Styles.modal_btn_wrapper}>
            <Button
              type="default"
              className={Styles.modal_btn}
              size="large"
              onClick={showModal}
            >
              확인
            </Button>
          </div>
        </Flex>
      </Modal>
      <Flex className={Styles.container} justify="center">
        <div className={Styles.background} />
        <div
          className={`${Styles.container_item} ${pageIndex === 0 ? Styles.active : Styles.inactive}`}
        >
          <Intro user={user} setUser={setUser} setPageIndex={setPageIndex} />
        </div>
        <div
          className={`${Styles.container_item} ${pageIndex === 1 ? Styles.active : Styles.inactive}`}
        >
          <PhoneNumber
            setPageIndex={setPageIndex}
            func={call}
            user={user}
            setUser={setUser}
            callLoading={callLoading}
          />
        </div>
        <div
          className={`${Styles.container_item} ${pageIndex === 2 ? Styles.active : Styles.inactive}`}
        >
          <Analyzing
            setPageIndex={setPageIndex}
            analyzeLoading={analyzeLoading}
          />
        </div>
        <div
          className={`${Styles.container_item} ${pageIndex === 3 ? Styles.active : Styles.inactive}`}
        >
          <Result
            setPageIndex={setPageIndex}
            retry={retry}
            user={user}
            setUser={setUser}
            func={checkRanking}
            reset={reset}
            rankLoading={rankLoading}
          />
        </div>
        <div
          className={`${Styles.container_item} ${pageIndex === 4 ? Styles.active : Styles.inactive}`}
        >
          <Ranking
            setPageIndex={setPageIndex}
            retry={retry}
            user={user}
            setUser={setUser}
            rankerList={rankerList}
            rankerOption={rankerOption}
            getRankerList={getRankerList}
            reset={reset}
          />
        </div>
      </Flex>
    </main>
  );
}

export default Home;
