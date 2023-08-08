import React from "react";
import styled from "styled-components";
import { useOverlayState } from "../useOverlayState";

function Body({ children, is취소 = false }: any) {
  const reset = useOverlayState((state) => state.reset);
  return (
    <StyledBody>
      <p>{children}</p>
      {is취소 && (
        <p className="cancel" onClick={() => reset()}>
          취소
        </p>
      )}
    </StyledBody>
  );
}

export default React.memo(Body);
const StyledBody = styled.div`
  position: relative;
  margin-top: 20px;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  color: #262626;
  text-align: center;
  white-space: pre-wrap;
  p {
    white-space: pre-wrap;
  }
  .n_body {
    margin-top: 15px;
  }
  p.cancel {
    left: 50%;
    font-weight: 400;
    font-size: 16px;
    transform: translateX(-50%);
    position: absolute;
    bottom: -140px;
    color: white;
    text-decoration: underline;
    z-index: 99999;
    cursor: pointer;
  }
`;
