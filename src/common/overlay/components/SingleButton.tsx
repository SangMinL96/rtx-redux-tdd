import React from "react";
import styled from "styled-components";
import { useOverlayState } from "../useOverlayState";

type Props = {
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>, setIsOpen: any) => void;
  children?: React.ReactNode;
};

function SingleButton({ children, onClick }: Props) {
  const reset = useOverlayState((state) => state.reset);
  const onButtonClick = (ev: any) => {
    if (onClick) {
      return onClick(ev, reset);
    }
    return reset();
  };
  return (
    <Button1>
      <button type="button" onClick={onButtonClick}>
        {children ? children : "확인"}
      </button>
    </Button1>
  );
}
export default React.memo(SingleButton);
const Button1 = styled.div`
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  height: 56px;
  > button {
    width: 100%;
    height: 56px;
    color: #4866e4;
    border: 1px solid #eeeeee;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;
