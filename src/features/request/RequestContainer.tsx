import { useGetRequestQuery } from "@/modules/request/query";
import { css } from "@emotion/react";
import RequestList from "./RequestList";

function RequestContainer() {
  return (
    <div css={wrapper}>
      <h5>내 문의</h5>
      <RequestList />
    </div>
  );
}

export default RequestContainer;

const wrapper = css`
  width: 100%;
  height: 100%;
  h5 {
    margin-top: 20px;
    font-size: 20px;
  }
`;
