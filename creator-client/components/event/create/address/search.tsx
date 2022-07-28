import { css, TextField } from '@mui/material';
import axios, { AxiosRequestConfig } from 'axios';
import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import { Button } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import { createEventActions } from '../../../../store/event/createSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import CloseIcon from '@mui/icons-material/Close';

// const MAP_ACCESS_KEY = process.env.NEXT_PUBLIC_MAP_ACCESS_KEY ?? '';
const MAP_ACCESS_KEY = process.env.NEXT_PUBLIC_MAP_ACCESS_KEY ?? '';

interface EventCreateAddressSearchProps {
  isVisibleJuso: boolean;
  setIsVisibleJuso: Dispatch<SetStateAction<boolean>>;
}

const EventCreateAddressSearch: FunctionComponent<EventCreateAddressSearchProps> = ({
  isVisibleJuso,
  setIsVisibleJuso,
}) => {
  const dispatch = useDispatch();
  const createEventState = useSelector((state: RootState) => state.createEvent);
  const [inputValue, setValue] = useState<string>('');
  const [jusoData, setJusoData] = useState<{
    totalCount: number;
    juso: {
      address: string;
      zipNo: string;
    }[];
  }>({
    totalCount: 0,
    juso: [],
  });
  const [result, setResult] = useState<{ address: string; sub_address: string }>({
    address: '',
    sub_address: '',
  });
  const requestConfig: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://www.juso.go.kr/addrlink/addrLinkApi.do',
    params: {
      confmKey: MAP_ACCESS_KEY,
      countPerPage: 50,
      currentPage: 1,
      keyword: inputValue,
      resultType: 'json',
    },
    headers: {
      'Content-Type': 'application/xml',
    },
  };

  const searchRequest = async () => {
    const res = await axios(requestConfig);
    const data = res.data;
    console.log(data);

    if (data.results?.common?.errorCode !== '0') {
      // throw new Error(data.results.common.errorMessage)
      setJusoData(() => ({
        totalCount: 0,
        juso: [],
      }));
    }
    if (!data.results?.juso) return;
    const juso = data.results.juso.map((juso: { roadAddr: string; zipNo: string }) => {
      const address = juso.roadAddr;
      const zipNo = juso.zipNo;
      return { address, zipNo };
    });
    setJusoData(() => ({
      totalCount: Number(data.results.common.totalCount),
      juso,
    }));
  };

  const wrapperStyle = css`
    position: relative;

    width: 100%;

    display: ${isVisibleJuso ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;

    backdrop-filter: blur(1em);

    z-index: 1;
  `;

  const titleStyle = css`
    text-align: center;
    margin: 1em 0;
  `;

  const searchWrapperStyle = css`
    display: flex;
    justify-content: center;
    align-content: center;
    padding-left: 1em;
  `;

  const searchInputStyle = css`
    width: 100%;
  `;

  const searchButtonStyle = css`
    width: 5em;
    border: none;
    background: none;
  `;

  const searchIconStyle = css`
    font-size: 2.5em;
    color: rgba(0, 0, 0, 0.5);
    :hover {
      color: rgba(0, 0, 0, 0.7);
    }
  `;

  const jusoListWrapperStyle = css`
    position: relative;
    height: calc(100% - 2em);
    border: 1px solid rgba(100, 100, 100, 0.7);
    overflow-y: ${jusoData.juso.length > 0 ? 'scroll' : 'none'};
    max-height: 30vh;

    margin: 1em;
  `;

  const jusoListStyle = css`
    width: 100%;
  `;

  const jusoItemStyle = css`
    margin: 0.5em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    :hover {
      transition-duration: 0.3s;
      background-color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
    }
  `;

  const emptyTextStyle = css`
    text-align: center;
    width: 100%;
    padding: 1em;
  `;

  const submitStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
  `;

  const submitInputStyle = css`
    width: 100%;
    margin: 0.5em;
  `;

  const submitButtonStyle = css`
    padding: 1em 2em;
    border: 1px solid rgba(100, 100, 100, 0.3);
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0.5em;
    :hover {
      transition-duration: 0.5s;
      background-color: rgba(255, 255, 255, 1);
    }
  `;

  const closeButtonStyle = css`
    position: absolute;
    font-size: 2em;
    top: 5%;
    right: 8%;
    color: rgba(150, 150, 150, 0.5);
    :hover {
      color: rgba(150, 150, 150, 1);
    }
  `;

  return (
    <div
      css={wrapperStyle}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsVisibleJuso(() => false);
        }
      }}
    >
      <h2 css={titleStyle}>행사장 주소 입력</h2>
      <div css={searchWrapperStyle}>
        <TextField
          css={searchInputStyle}
          label="주  소"
          placeholder="주소 입력.."
          onChange={(e) => {
            setValue(() => e.target.value);
          }}
          value={inputValue}
        ></TextField>
        <Button css={searchButtonStyle} onClick={searchRequest}>
          <SearchIcon css={searchIconStyle}></SearchIcon>
        </Button>
      </div>
      <div css={jusoListWrapperStyle}>
        <ul css={jusoListStyle}>
          {jusoData.totalCount > 0 ? (
            jusoData.juso.map((juso, index) => (
              <li
                key={index}
                css={jusoItemStyle}
                onClick={async (e) => {
                  setResult(() => ({
                    address: juso.address,
                    sub_address: '',
                  }));
                }}
              >
                <p>{juso.zipNo}</p>
                <p>{juso.address}</p>
              </li>
            ))
          ) : (
            <p css={emptyTextStyle}>검색 결과가 없습니다.</p>
          )}
        </ul>
      </div>
      <div css={submitStyle}>
        <TextField
          css={submitInputStyle}
          disabled
          label="입력한 주소"
          value={result.address}
        ></TextField>
        <TextField
          css={submitInputStyle}
          label="상세 주소"
          value={result.sub_address}
          onChange={(e) => {
            setResult((state) => ({ ...state, sub_address: e.target.value }));
          }}
        ></TextField>
        <Button
          css={submitButtonStyle}
          onClick={() => {
            const juso = [result.address, result.sub_address].join(' ');
            const jusoSplit = juso.split(' ');
            dispatch(createEventActions.set_location(jusoSplit[0]));
            dispatch(createEventActions.set_sub_location(jusoSplit.slice(1).join(' ')));
            setIsVisibleJuso(false);
          }}
        >
          저 장
        </Button>
      </div>
      <CloseIcon
        css={closeButtonStyle}
        onClick={() => {
          setIsVisibleJuso(false);
        }}
      ></CloseIcon>
    </div>
  );
};

export default EventCreateAddressSearch;
