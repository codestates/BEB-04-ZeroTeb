import { css } from '@emotion/react';
import { Button } from '@mui/material';
import Axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import { FunctionComponent, MouseEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface EventCreateTopProps {}

const EventCreateTop: FunctionComponent<EventCreateTopProps> = () => {
  const router = useRouter();
  const createEventState = useSelector((state: RootState) => state.createEvent);

  const publishHandler: MouseEventHandler = async () => {
    if (createEventState.title === '' || createEventState.contents === '') {
      return alert('내용을 입력해주세요');
    }
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/post`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      withCredentials: true,
      data: createEventState,
    };

    try {
      await Axios(config);
      router.push('/');
    } catch (err) {
      alert('글쓰기에 실패했습니다.');
    }
  };

  const wrapperStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
  `;

  return (
    <div css={wrapperStyle}>
      {/* <HeadLogo></HeadLogo> */}
      <div></div>
      <div>
        <Button variant="contained" onClick={publishHandler} color="secondary" size="large">
          Publish
        </Button>
      </div>
    </div>
  );
};

export default EventCreateTop;
