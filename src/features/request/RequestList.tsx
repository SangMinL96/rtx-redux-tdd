import { useOverlay } from "@/common/overlay/useOverlay";
import {
  getRequestMutate,
  useDeleteRequestMutation,
  useGetRequestQuery,
} from "@/modules/request/query";
import { useAppDispatch } from "@/store/hook";
import { css } from "@emotion/react";
import { useState } from "react";

function RequestList() {
  const [isEdit, setIsEdit] = useState(false);
  const { data = [], isLoading } = useGetRequestQuery(null);
  const [deleteRequest] = useDeleteRequestMutation();
  const { OverlayPortal, overlay } = useOverlay();
  const dispatch = useAppDispatch();
  const handlerequestDelete = (id: string) => {
    overlay.open({
      title: "정말 삭제 하시겠습니까?",
      button: (
        <overlay.확인버튼
          onClick={(_, reset) => {
            reset();
            deleteRequest({ cmt_no: id });
          }}
        />
      ),
    });
  };
  const onTitleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const id = ev.target.id;
    const patchCollection = dispatch(
      getRequestMutate((draft) => {
        return draft.map((item: any) => {
          if (id == item.no) {
            return { ...item, title: ev.target.value };
          } else {
            return item;
          }
        });
      })
    );
    patchCollection.patches;
  };

  if (isLoading) return <div>...loading</div>;
  return (
    <>
      <div css={wrapper}>
        {data?.length === 0 && <div>문의 내용이 없습니다.</div>}
        {data?.map((request: any) => {
          return (
            <div
              data-testid="requests"
              key={`${request.no}_request`}
              css={requestListBox}
            >
              <p className="category">{`${request?.main_category}>${request.category_type}`}</p>

              <input
                data-testid={`input_${request.no}`}
                id={request.no}
                css={[
                  css`
                    border: ${isEdit ? "1px solid #eeeeee" : "none"};
                  `,
                ]}
                onChange={onTitleChange}
                defaultValue={request?.title}
                readOnly={!isEdit}
              />
              <button
                type="button"
                className="btn del"
                onClick={() => handlerequestDelete(request.no)}
              >
                삭제
              </button>
              <button
                type="button"
                className="btn edit"
                onClick={() => setIsEdit((prev) => !prev)}
              >
                {isEdit ? "확인" : "수정"}
              </button>
            </div>
          );
        })}
      </div>
      <OverlayPortal />
    </>
  );
}

export default RequestList;

const wrapper = css`
  margin-top: 20px;
  width: 100%;
`;
const requestListBox = css`
  margin-top: 10px;
  position: relative;
  text-align: start;
  width: 100%;
  min-height: 80px;
  padding: 15px 15px;
  padding-right: 40px;
  border-top: 1px solid #eeeeee;
  &:nth-last-child(1) {
    border-bottom: 1px solid #eeeeee;
  }
  input {
    padding: 5px 0;
    font-size: 15px;
    font-weight: bold;
  }
  .btn {
    position: absolute;
    right: 15px;
    padding: 3px 10px;
  }
  .btn.del {
    top: 12%;
  }
  .btn.edit {
    bottom: 12%;
  }
`;

const requestEmptyCss = css`
  margin-top: 100px;
  width: 100%;
  height: 250px;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;
