import TodoContainer from "@/features/todo/TodoContainer";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div css={container}>
      <button type="button" onClick={() => router.push("/request?id=123")}>
        테스트
      </button>
      <TodoContainer />
    </div>
  );
}

const container = css`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  text-align: center;
`;
``