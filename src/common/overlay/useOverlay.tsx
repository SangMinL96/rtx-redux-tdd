import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import shallow from "zustand/shallow";
import Body from "./components/Body";
import Desc from "./components/Desc";
import SingleButton from "./components/SingleButton";
import { useOverlayState } from "./useOverlayState";

function OverlayPortal() {
  const isDesktop = false;
  const router = useRouter();
  const [mount, setMount] = useState(false);
  const [isOpen, jsxBody, jsxButton, reset, setIsOpen, isTodayClose, bgClick] =
    useOverlayState(
      (state) => [
        state.isOpen,
        state.jsxBody,
        state.jsxButton,
        state.reset,
        state.setIsOpen,
        state.isTodayClose,
        state.bgClick,
      ],
      shallow
    );
  useEffect(() => {
    setMount(true);
    return () => {
      setMount(false);
      reset();
    };
  }, []);

  const onBgClick = () => {
    if (bgClick) {
      bgClick(reset);
    }
    return reset();
  };

  if (!mount) return null;
  return (
    isOpen && (
      <Container isDesktop={isDesktop}>
        <div className="modal_wrapper">{jsxBody}</div>
        <Divider />
        {jsxButton ? jsxButton : null}
        <BgBox isDesktop={isDesktop} onClick={onBgClick} />
      </Container>
    )
  );
}

type OpenType = {
  title: string;
  body?: any;
  button?: any;
  bgClick?: (value: any) => void;
};
export const useOverlay = () => {
  const [setIsOpen, setJsxBody, setJsxButton, setIsTodayClose, setBgClick] =
    useOverlayState(
      (state) => [
        state.setIsOpen,
        state.setJsxBody,
        state.setJsxButton,
        state.setIsTodayClose,
        state.setBgClick,
      ],
      shallow
    );
  return {
    overlay: {
      open: ({ title, body, button, bgClick }: OpenType) => {
        setJsxBody(
          <>
            <h5>
              <p>{title}</p>
            </h5>
            {body ? body : null}
          </>
        );
        setJsxButton(button);
        setBgClick(bgClick);
        setIsOpen(true);
      },
      확인버튼: SingleButton,
      body: Body,
      desc: Desc,
    },
    OverlayPortal,
  };
};

type StyledType = {
  isDesktop: boolean;
};
const Container = styled.div<StyledType>`
  position: fixed;
  top: 0;
  z-index: 9997;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .modal_wrapper {
    position: relative;
    z-index: 9999;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    width: 320px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 35px 20px;
    flex-direction: column;
    > h5 {
      text-align: center;
      p {
        font-size: 16px;
        font-weight: 700;
        color: #262626;
        white-space: pre-wrap;
        line-height: 23px;
      }
    }
  }
`;

const Divider = styled.div`
  z-index: 9999;
  width: 320px;
  height: 1px;
  background-color: #eaeaea;
`;

const BgBox = styled.div<StyledType>`
  position: fixed;
  top: 0;
  z-index: 9998;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;
const TodayNotRender = styled.div`
  width: 320px;
  text-align: end;
  margin-top: 5px;
  color: #eeeeee;
  font-size: 14px;
  z-index: 10000;
`;
