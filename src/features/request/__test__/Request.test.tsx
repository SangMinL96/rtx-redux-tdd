import { requestAPI } from "@/modules/request/query";
import { requestSlice } from "@/store/reducer/requestReducer";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import RequestContainer from "../RequestContainer";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("@/store/hook", () => {
  return {
    useAppDispatch: () => jest.fn(() => ({ patches: null })),
  };
});
let mockRequestData = [] as any[];
let mockIsLoading = true;
jest.mock("@/modules/request/query", () => {
  return {
    useGetRequestQuery: () => ({
      data: mockRequestData,
      isLoading: mockIsLoading,
    }),
    useDeleteRequestMutation: () => {
      const deleteRequest = (params: any) => {
        mockRequestData = mockRequestData.filter(
          (f) => String(f.no) === String(params.cmt_no)
        );
      };
      return [deleteRequest];
    },
    getRequestMutate: () => null,
  };
});
beforeEach(() => {
  mockRequestData = [];
  mockIsLoading = true;
});

const renderWithRedux = (ui: React.ReactNode) => {
  const store = configureStore({
    reducer: {
      [requestSlice?.name]: requestSlice.reducer,
    },
  });
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};
describe("내 문의 페이지 테스트", () => {
  describe("<RequestContainer/>", () => {
    it("렌더 테스트", async () => {
      renderWithRedux(<RequestContainer />);
      const el = screen.getByText("내 문의");
      expect(el).toBeInTheDocument();
    });
  });

  describe("<RequestList/>", () => {
    it("데이터 로딩 확인", async () => {
      mockIsLoading = true;
      renderWithRedux(<RequestContainer />);
      const 로딩중 = screen.getByText("...loading");
      expect(로딩중).toBeInTheDocument();
    });
    it("데이터가 1개 이상 일때", async () => {
      mockRequestData = mockData;
      mockIsLoading = false;
      renderWithRedux(<RequestContainer />);
      const 문의명 = screen.getAllByTestId("requests");
      expect(문의명.length).not.toBe(0);
    });
    it("데이터 UI바인딩 확인", async () => {
      mockRequestData = mockData;
      mockIsLoading = false;
      renderWithRedux(<RequestContainer />);
      const input = screen.getByTestId(`input_${mockData[0].no}`);
      expect(input).toHaveValue(mockData[0].title);
      expect(
        screen.getAllByText(
          `${mockData[0]?.main_category}>${mockData[0].category_type}`
        )[0]
      ).toBeInTheDocument();
    });
    it("데이터 UI바인딩 undefined일때", async () => {
      mockRequestData = [
        { ...mockData[0], title: undefined, main_category: undefined },
      ];
      mockIsLoading = false;
      renderWithRedux(<RequestContainer />);
      const input = screen.getByTestId(`input_${mockData[0].no}`);
      expect(input).toHaveValue("");
    });
    it("문의 삭제 테스트", async () => {
      mockRequestData = mockData;
      mockIsLoading = false;
      renderWithRedux(<RequestContainer />);
      const 삭제버튼 = screen.getAllByText("삭제");
      await userEvent.click(삭제버튼[0]);
      expect(screen.getByText("정말 삭제 하시겠습니까?")).toBeInTheDocument();
      const 삭제확인버튼 = screen.getByText("확인");
      await userEvent.click(삭제확인버튼);
      const 문의명 = screen.getAllByTestId("requests");
      // 
      expect(문의명.length - 1).toBe(mockRequestData.length);
    });

    it("문의 수정 버튼 클릭후 value변경", async () => {
      mockRequestData = mockData;
      mockIsLoading = false;
      renderWithRedux(<RequestContainer />);
      const input = screen.getByTestId(`input_${mockData[0].no}`);
      expect(input).toHaveAttribute("readOnly");
      const 수정버튼 = screen.getAllByText("수정");
      await userEvent.click(수정버튼[0]);
      expect(input).not.toHaveAttribute("readOnly");
      await userEvent.type(input, "추가텍스트");
      expect(input).toHaveValue("test추가텍스트");
    });
  });
});

export const mockData = [
  {
    attach_file01: "",
    attach_file02: "",
    attach_file03: "",
    attach_file04: "",
    blind: 0,
    blind_cnt: 0,
    blind_reason: "",
    brandplus_no: 0,
    category_type: "",
    comment: "test",
    complete: 0,
    contents_category: 13,
    contents_no: 0,
    customer_memo: "",
    del_ok: 0,
    enterprise_code: "",
    goods_no: 0,
    hide: 1,
    honeymoon: 0,
    hp: "010-0000-0000",
    last_reply: 0,
    last_reply_date: "0000-00-00 00:00:00",
    last_request_date: "2023-06-22T08:42:38.000Z",
    list_no: 0,
    main_category: "셀프견적",
    marry_date: "0000-00-00",
    name: "test",
    no: 62237,
    order_no: 0,
    product_no: 0,
    quotation_no: 0,
    reg_date: "2023-06-22T08:42:38.000Z",
    reply_cnt: 0,
    reply_id: "",
    request_memo: "",
    request_type: 1508,
    request_type_text: "견적문의",
    request_url:
      "http://localhost:3010/calculator?tab=%ED%97%A4%EC%96%B4%2F%EB%A9%94%EC%9D%B4%ED%81%AC%EC%97%85&step=3&s_ent=co_sl_s197%3A%3A%EC%96%B8%EC%95%84%EB%8D%94%EB%8D%B0%EC%9D%B4&d_ent=co_sl_d252%3A%3A%EB%AA%A8%EB%84%A4%EB%9C%A8%EC%95%84%EB%A5%B4&m_ent=co_sl_m081%",
    solved: 0,
    status: 0,
    temp_save: 0,
    title: "test",
    undecided: 1,
    undertaker: "",
    view_cnt: 0,
    web_id: "test1",
    with_id: "iwd435990",
  },
  {
    attach_file01: "",
    attach_file02: "",
    attach_file03: "",
    attach_file04: "",
    blind: 0,
    blind_cnt: 0,
    blind_reason: "",
    brandplus_no: 0,
    category_type: "",
    comment: "test",
    complete: 0,
    contents_category: 13,
    contents_no: 0,
    customer_memo: "",
    del_ok: 0,
    enterprise_code: "",
    goods_no: 0,
    hide: 1,
    honeymoon: 0,
    hp: "010-0000-0000",
    last_reply: 0,
    last_reply_date: "0000-00-00 00:00:00",
    last_request_date: "2023-06-22T08:42:38.000Z",
    list_no: 0,
    main_category: "셀프견적",
    marry_date: "0000-00-00",
    name: "test",
    no: 61237,
    order_no: 0,
    product_no: 0,
    quotation_no: 0,
    reg_date: "2023-06-22T08:42:38.000Z",
    reply_cnt: 0,
    reply_id: "",
    request_memo: "",
    request_type: 1508,
    request_type_text: "견적문의",
    request_url:
      "http://localhost:3010/calculator?tab=%ED%97%A4%EC%96%B4%2F%EB%A9%94%EC%9D%B4%ED%81%AC%EC%97%85&step=3&s_ent=co_sl_s197%3A%3A%EC%96%B8%EC%95%84%EB%8D%94%EB%8D%B0%EC%9D%B4&d_ent=co_sl_d252%3A%3A%EB%AA%A8%EB%84%A4%EB%9C%A8%EC%95%84%EB%A5%B4&m_ent=co_sl_m081%",
    solved: 0,
    status: 0,
    temp_save: 0,
    title: "test",
    undecided: 1,
    undertaker: "",
    view_cnt: 0,
    web_id: "test1",
    with_id: "iwd435990",
  },
];
