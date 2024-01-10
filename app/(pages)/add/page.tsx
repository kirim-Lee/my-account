import { Close } from '@/app/component/icon/Close';

const AddAccount = () => {
  return (
    <div className="modal-page">
      <div className="flex flex-[auto_30px] flex-row w-full justify-between">
        <h1 className="title h1 grow text-center">Register</h1>
        <button className="flex-none button circle">
          <Close color="white" className="w-5 h-5" />
        </button>
      </div>

      <h4 className="title h4">계산하기</h4>
      <div className="wrap-radio mb-2">
        <button>예금</button>
        <button>적금</button>
      </div>
      <div className="wrap-input">
        <div className="wrap w-1/3">
          <input type="text" className="text-input" placeholder="금액" />
        </div>
        <div className="wrap w-1/3">
          <input type="text" className="text-input" placeholder="개월" />
        </div>
        <div className="wrap w-1/3">
          <input type="text" className="text-input pr-7" placeholder="금리" />
          <span className="input-info-text">%</span>
        </div>
      </div>

      <h4 className="title h4 mt-3">입력하기</h4>
      <div className="wrap-input">
        <div className="wrap">
          <input type="text" className="text-input" placeholder="은행명" />
        </div>
        <div className="wrap">
          <input
            type="text"
            className="text-input"
            placeholder="만기일 YY.MM.DD"
          />
        </div>
      </div>
      <div className="wrap-input">
        <div className="wrap">
          <input
            type="text"
            className="text-input pr-10"
            placeholder="최종금액"
          />
          <span className="input-info-text">만원</span>
        </div>
        <div className="wrap">
          <input
            type="text"
            className="text-input"
            placeholder="이자"
            disabled
          />
        </div>
        <div className="wrap">
          <input type="text" className="text-input" placeholder="(세전)" />
        </div>
      </div>

      <div className="wrap-input">
        <div className="wrap">
          <input
            type="text"
            className="text-input-under text-right text-3xl"
            placeholder="예상 총 금액"
          />
        </div>
      </div>

      <button type="submit" className="button full mt-2">
        등록하기
      </button>
    </div>
  );
};

export default AddAccount;
