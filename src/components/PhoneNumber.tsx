import React from "react";
import { Button, Flex, Input } from "antd";
import TitleImgWoman from "@/assets/phone-number-woman.png";
import TitleImgMan from "@/assets/phone-number-man.png";

import Styles from "@/scss/PhoneNumber.module.scss";
import { CarouselProps } from "@/utils/types";

interface PhoneNumberProps extends CarouselProps {
  callLoading: boolean;
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({
  func,
  user,
  setUser,
  callLoading,
  setPageIndex,
}) => {
  const formatNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number: string = e.target.value;
    const hyphenNumber = number
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(.{0,4})(.{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
    let maskingNumber = hyphenNumber.split("-");
    if (maskingNumber[1]) {
      maskingNumber[1] = "*".repeat(maskingNumber[1].length);
      if (maskingNumber[2]) {
        const maskingLength = maskingNumber[2].length;
        if (maskingLength < 3) {
          maskingNumber[2] = "*".repeat(maskingNumber[2].length);
        } else {
          const firstNumbers = maskingNumber[2].slice(0, 2);
          const remainingNumbers = maskingNumber[2].slice(2);
          const convertedNumbers = firstNumbers.replace(/./g, "*");
          maskingNumber[2] = convertedNumbers + remainingNumbers;
        }
      }
    }

    return setUser({
      ...user,
      formatNumber: maskingNumber.join("-"),
      originNumber: hyphenNumber,
    });
  };

  return (
    <Flex vertical justify="center" align="center">
      <img
        className={Styles.title_img}
        src={user.gender === "man" ? TitleImgMan : TitleImgWoman}
      />
      <Input
        className={Styles.input_number}
        placeholder="전화번호 입력"
        value={user.originNumber}
        onChange={(e) => formatNumber(e)}
        maxLength={13}
      />
      <Flex className={Styles.btn_wrapper} vertical>
        <Button
          className={Styles.btn}
          type="primary"
          loading={callLoading}
          onClick={() => func?.()}
          disabled={user.originNumber.length < 12}
        >
          {!callLoading ? "전화걸기" : " "}
        </Button>
        <Button
          className={Styles.btn}
          onClick={() => {
            setPageIndex(0);
          }}
        >
          이전으로
        </Button>
      </Flex>
    </Flex>
  );
};

export default PhoneNumber;
