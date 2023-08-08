import todoReducer from "@/store/reducer/todoReducer";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import TodoContainer from "../TodoContainer";

const renderWithRedux = (ui: React.ReactNode) => {
  const store = configureStore({
    reducer: {
      todo: todoReducer,
    },
  });
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};
describe("Todo페이지 테스트", () => {
  describe("Todo 등록 & 삭제 테스트", () => {
    renderWithRedux(<TodoContainer />);
    it("렌더 테스트", async () => {
      expect(screen.getByText(/리덕스 TDD 투두리스트/i)).toBeInTheDocument();
    });
    it("투두리스트가 1개도 존재하지 않음", async () => {
      renderWithRedux(<TodoContainer />);
      expect(
        screen.getByText("오늘의 투두리스트 목록이 없습니다.")
      ).toBeInTheDocument();
    });

    it("1개의 투두를 등록후 확인", async () => {
      renderWithRedux(<TodoContainer />);
      const input = screen.getByPlaceholderText("할일을 입력해주세요");
      await userEvent.type(input, "투두 등록테스트 입니다.");
      await userEvent.keyboard("{Enter}");
      expect(screen.getByText("투두 등록테스트 입니다.")).toBeInTheDocument();
      const 삭제버튼 = await screen.findAllByText("x");
      expect(삭제버튼[0]).toHaveClass("delete todo");
    });

    it("1개의 투두를 등록후 삭제합니다.", async () => {
      renderWithRedux(<TodoContainer />);
      const input = screen.getByPlaceholderText("할일을 입력해주세요");
      await userEvent.type(input, "투두테스트1");
      await userEvent.keyboard("{Enter}");
      const 삭제버튼 = screen.getAllByText("x");
      await userEvent.click(삭제버튼[0]);
      expect(
        screen.getByText("오늘의 투두리스트 목록이 없습니다.")
      ).toBeInTheDocument();
    });
    it("여러개 투두를 등록후 길이가 0이 될때까지 삭제한다", async () => {
      renderWithRedux(<TodoContainer />);
      const input = screen.getByPlaceholderText("할일을 입력해주세요");
      await userEvent.type(input, "투두테스트1");
      await userEvent.keyboard("{Enter}");
      await userEvent.type(input, "투두테스트2");
      await userEvent.keyboard("{Enter}");
      expect(screen.getAllByTestId("todos")).toHaveLength(2);

      const 삭제버튼 = screen.getAllByText("x");
      await userEvent.click(삭제버튼[0]);
      await userEvent.click(삭제버튼[1]);
      expect(
        screen.getByText("오늘의 투두리스트 목록이 없습니다.")
      ).toBeInTheDocument();
    });
  });
  describe("Todo input 테스트", () => {
    it("인풋값이 정상적으로 입력 되는지 확인", async () => {
      renderWithRedux(<TodoContainer />);
      const input = screen.getByPlaceholderText("할일을 입력해주세요");
      await userEvent.type(input, "투두테스트1");
      const 삭제버튼 = screen.getByText("x");
      expect(input).toHaveValue("투두테스트1");
      expect(삭제버튼).toHaveClass("delete input");
    });
    it("인풋값 입력후 삭제버튼 클릭시 값이 정상적으로 없어지는지 확인", async () => {
      renderWithRedux(<TodoContainer />);
      const input = screen.getByPlaceholderText("할일을 입력해주세요");
      await userEvent.type(input, "투두테스트1");
      const 삭제버튼 = screen.getByText("x");
      expect(input).toHaveValue("투두테스트1");
      await userEvent.click(삭제버튼);
      expect(input).toHaveValue("");
    });
  });
});
