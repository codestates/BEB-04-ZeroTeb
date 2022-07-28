import { css } from '@emotion/react';
import { Button } from '@mui/material';
import Axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import { FunctionComponent, MouseEventHandler, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { createEventActions } from '../../../store/event/createSlice';
import Progress from '../../Progress';

interface EventCreateTopProps {}

const EventCreateTop: FunctionComponent<EventCreateTopProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const createEventState = useSelector((state: RootState) => state.createEvent);
  const commonState = useSelector((state: RootState) => state.common);
  const dispatch = useDispatch();
  const publishHandler: MouseEventHandler = async () => {
    setIsLoading(() => true);
    if (
      createEventState.title === '' ||
      createEventState.contents === '' ||
      createEventState.location === '' ||
      createEventState.sub_location === '' ||
      createEventState.recruit_start_date <= 0 ||
      createEventState.recruit_end_date <= 0 ||
      createEventState.event_start_date <= 0 ||
      createEventState.recruit_end_date <= 0
    ) {
      return alert('내용을 입력해주세요');
    }
    dispatch(createEventActions.set_created_date(Number(Date.now().toString().substring(0, 10))));
    dispatch(createEventActions.set_modified_date(Number(Date.now().toString().substring(0, 10))));
    try {
      const thumbnailData = await Axios.post(
        '/api/file',
        { file: commonState.event_image.file },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (!thumbnailData.data?.savedPath) throw new Error(thumbnailData.data);

      let data = createEventState;

      const thumnail = dispatch(
        createEventActions.set_thumnail(
          `http://server.beeimp.com:18080/file?fn=${thumbnailData.data.savedPath}`
        )
      ).payload;

      const tokenImageUrlData = await Axios.post(
        '/api/file',
        { file: commonState.token_image.file },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (!tokenImageUrlData.data?.savedPath) throw new Error(tokenImageUrlData.data);

      const token_image_url = dispatch(
        createEventActions.set_token_image_url(
          `http://server.beeimp.com:18080/file?fn=${tokenImageUrlData.data.savedPath}`
        )
      ).payload;

      data = {
        ...data,
        thumnail,
        token_image_url,
      };

      const config: AxiosRequestConfig = {
        method: 'post',
        url: `/api/event/create`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
        data: data,
      };

      await Axios(config);
      // console.log(data);
      dispatch(createEventActions.clear());
      router.push('/');
    } catch (err) {
      alert('글쓰기에 실패했습니다.');
      console.error(err);
    }
    setIsLoading(() => false);
  };

  const wrapperStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
  `;

  const loadingWrapperStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    backdrop-filter: blur(5px);

    z-index: 1;
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
      {isLoading ? (
        <div css={loadingWrapperStyle}>
          <Progress></Progress>
        </div>
      ) : undefined}
    </div>
  );
};

export default EventCreateTop;
