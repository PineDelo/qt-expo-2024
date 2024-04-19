import { Button, Checkbox, Modal, Flex } from "antd";
import { ConfigProvider, CheckboxProps } from "antd";
// import { CheckCircleTwoTone, CheckSquareOutlined } from "@ant-design/icons";
import TitleImg from "@/assets/intro-title.svg?react";
import CharacterWoman from "@/assets/woman.svg?react";
import CharacterMan from "@/assets/man.svg?react";
import React, { useState } from "react";
import Styles from "@/scss/Intro.module.scss";
import PrivacyPolicyContent from "./PrivacyPolicyContent";
import { CarouselProps } from "@/utils/types";


const Intro: React.FC<CarouselProps> = ({ user, setUser, setPageIndex }) => {
  const [isModal, setIsModal] = useState<boolean>(false);

  const policyHandler: CheckboxProps["onChange"] = (e) => {
    setUser({ ...user, isAgree: e.target.checked });
  };

  const setGender = (gender: string) => {
    if (gender === user.gender) {
      return setUser({
        ...user,
        gender: "",
      });
    }
    setUser({
      ...user,
      gender: gender,
    });
  };

  const showModal = () => {
    setIsModal(!isModal);
  };

  return (
    <Flex
      className={Styles.intro_wrapper}
      vertical
      align="center"
      justify="center"
    >
      <Modal
        title="개인정보취급방침"
        open={isModal}
        onOk={showModal}
        onCancel={showModal}
        width={758}
        centered
        footer
      >
        <PrivacyPolicyContent />
        <div className={Styles.modal_btn_wrapper}>
          <Button
            className={Styles.modal_btn}
            type="primary"
            size="large"
            onClick={showModal}
          >
            확인
          </Button>
        </div>
      </Modal>
      <TitleImg className={Styles.title_img} />

      <Flex className={Styles.flex_character} gap="middle">
        <div
          className={
            user.gender === "f"
              ? Styles.character_selected
              : Styles.character_wrapper
          }
          onClick={() => setGender("f")}
        >
          <CharacterWoman />
        </div>
        <div
          className={
            user.gender === "m"
              ? Styles.character_selected
              : Styles.character_wrapper
          }
          onClick={() => setGender("m")}
        >
          <CharacterMan />
        </div>
      </Flex>
      <Flex className={Styles.flex_agreement}>
        <ConfigProvider
          theme={{
            token: {
              // 하늘색
              colorPrimary: "#B2D7FF",
              colorPrimaryBorder: "#0078FE",
              controlInteractiveSize: 20,
            },
          }}
        >
          <Checkbox onChange={policyHandler}>
            개인정보취급방침에 동의합니다.
          </Checkbox>
          <span className={Styles.show_more} onClick={showModal}>
            (더보기)
          </span>
        </ConfigProvider>
      </Flex>
      <Button
        className={Styles.participate_btn}
        type="primary"
        disabled={!(user.isAgree && user.gender)}
        onClick={() => setPageIndex(1)}
      >
        참여하기
      </Button>
    </Flex>
  );
};

export default React.memo(Intro);
