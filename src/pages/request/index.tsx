import RequestContainer from "@/features/request/RequestContainer";
import { css } from "@emotion/react";

export default function RequestPageIndex() {
  return (
    <div css={container}>
      <RequestContainer />
    </div>
  );
}

const container = css`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  text-align: center;
`;
