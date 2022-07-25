import { TextField } from '@mui/material';
import axios, { AxiosRequestConfig } from 'axios';
import { FunctionComponent, useState } from 'react';
import { Button } from 'react-bootstrap';
interface EventCreateAddressProps {}

// const MAP_ACCESS_KEY = process.env.NEXT_PUBLIC_MAP_ACCESS_KEY ?? '';
const MAP_ACCESS_KEY = process.env.NEXT_PUBLIC_MAP_ACCESS_KEY ?? '';

const EventCreateAddress: FunctionComponent<EventCreateAddressProps> = () => {
  console.log(process.env.NEXT_PUBLIC_MAP_ACCESS_KEY);
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
  const [page, setPage] = useState<number>(1);

  const requestConfig: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://www.juso.go.kr/addrlink/addrLinkApi.do',
    params: {
      confmKey: MAP_ACCESS_KEY,
      countPerPage: 5,
      currentPage: page,
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

    if (data.results?.common?.errorCode !== '0') throw new Error(data.results.common.errorMessage);
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

  return (
    <div>
      <div>
        <TextField
          label="주소"
          onChange={(e) => {
            setValue(() => e.target.value);
          }}
          value={inputValue}
        ></TextField>
        <Button onClick={searchRequest}>검색</Button>
      </div>
      <div>
        <ul>
          {jusoData.totalCount > 0 ? (
            jusoData.juso.map((juso, index) => (
              <li
                key={index}
                onClick={(e) => {
                  setValue(() => juso.address);
                  searchRequest();
                }}
              >
                <p>{juso.zipNo}</p>
                <p>{juso.address}</p>
              </li>
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default EventCreateAddress;
