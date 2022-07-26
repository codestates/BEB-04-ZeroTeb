import { ComponentType, FunctionComponent, useState } from 'react';
import { css } from '@emotion/react';
import {
  EventCreateType,
  EventCreateEditor,
  EventCreateTitle,
  EventCreateTop,
  EventCreateWrapper,
  EventDateTimePicker,
  EventCreateCategory,
  EventCreateUpload,
  EventCreatePrices,
} from '../../components/event/create';
import { createEventActions } from '../../store/event/createSlice';
import EventCreateAddress from '../../components/event/create/address';
import { commonActions } from '../../store/commonSlice';

interface PostEventCreateProps {}

const CreateEvent: FunctionComponent<PostEventCreateProps> = () => {
  const [isVisibleJuso, setIsVisibleJuso] = useState<boolean>(false);

  const coverStyle = css`
    position: relative;
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 50px;
  `;

  return (
    <div css={coverStyle}>
      <EventCreateWrapper></EventCreateWrapper>
      <EventCreateWrapper>
        <EventCreateTitle></EventCreateTitle>
        <EventCreateCategory></EventCreateCategory>
        <EventCreateType></EventCreateType>
        <EventCreatePrices></EventCreatePrices>
        <EventCreateAddress
          isVisibleJuso={isVisibleJuso}
          setIsVisibleJuso={setIsVisibleJuso}
        ></EventCreateAddress>
        <EventDateTimePicker
          title="티켓 구매/응모 가능"
          startDateActions={createEventActions.set_recruit_start_date}
          endDateActions={createEventActions.set_recruit_end_date}
        ></EventDateTimePicker>
        <EventDateTimePicker
          title="이벤트 행사"
          startDateActions={createEventActions.set_event_start_date}
          endDateActions={createEventActions.set_event_end_date}
        ></EventDateTimePicker>
        <EventCreateUpload
          title="이벤트 이미지"
          action={commonActions.set_event_image}
        ></EventCreateUpload>
        <EventCreateUpload
          title="토큰 이미지"
          action={commonActions.set_token_image}
        ></EventCreateUpload>
        <EventCreateEditor></EventCreateEditor>
        <EventCreateTop></EventCreateTop>
      </EventCreateWrapper>
    </div>
  );
};

export default CreateEvent;
