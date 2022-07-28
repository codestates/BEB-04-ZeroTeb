import { css, TextField } from '@mui/material';
import { ChangeEvent, ChangeEventHandler, FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { createEventActions } from '../../../store/event/createSlice';
import EventCreateItemWrapper from './item-wrapper';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface EventCreatePricesProps {}

const EventCreatePrices: FunctionComponent<EventCreatePricesProps> = () => {
  const [eventClasses, setEventClasses] = useState<string[]>(['']);
  const dispatch = useDispatch();
  const createEventState = useSelector((state: RootState) => state.createEvent);
  const price = createEventState.price;
  const title = createEventState.type === 'sale' ? '판매 가격' : '당첨자';
  const propertiesHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const value = Number(e.target.value);
    switch (e.target.name) {
      case 'price':
        dispatch(
          createEventActions.set_price([
            ...price.slice(0, index),
            {
              ...price[index],
              class: index,
              [e.target.name]: value > 0 ? value : createEventState.type === 'sale' ? 1 : 0,
            },
            ...price.slice(index + 1),
          ])
        );
        break;
      case 'count':
        dispatch(
          createEventActions.set_price([
            ...price.slice(0, index),
            {
              ...price[index],
              class: index,
              [e.target.name]: value > 0 ? value : createEventState.type === 'sale' ? 1 : 0,
            },
            ...price.slice(index + 1),
          ])
        );
        break;
      default:
    }
  };

  const addPropertiesHandler = () => {
    dispatch(
      createEventActions.set_price([
        ...price,
        {
          class: price.length,
          count: 1,
          price: 1,
        },
      ])
    );
    setEventClasses((state) => [...state, '']);
  };

  const removePropertiesHandler = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    index: number
  ) => {
    const removeEventClasses = eventClasses.filter((item, itemIndex) => index !== itemIndex);
    if (removeEventClasses.length > 0) {
      setEventClasses(() => removeEventClasses);
      const removeProperties = price.filter((item, itemIndex) => index !== itemIndex);
      dispatch(createEventActions.set_price(removeProperties));
    }
  };

  const wrapperStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const classListStyle = css`
    list-style: none;
    > li {
      display: flex;
      justify-content: flex-start;
      align-content: center;
      width: 100%;
    }
  `;

  const inputStyle = css`
    width: 28%;
    margin: 1%;
  `;
  const removeButtonStyle = css`
    width: 10%;
    border: none;
    background: none;
  `;
  const removeIconStyle = css`
    font-size: 2em;
    opacity: 0.5;
    :hover {
      opacity: 1;
    }
  `;

  const addButtonWrapperStyle = css`
    width: 100%;
  `;

  const addButtonStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 1em;
    border: none;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 0 1em;
    :hover {
      transition-duration: 0.3s;
      background-color: rgba(255, 255, 255, 1);
    }
  `;
  return (
    <EventCreateItemWrapper title={title}>
      <div css={wrapperStyle}>
        {title === '판매 가격' ? (
          <>
            <ul css={classListStyle}>
              {eventClasses.map((eventClass, index) => {
                return (
                  <li key={index}>
                    <TextField
                      css={inputStyle}
                      label={'등급'}
                      name={'class_name'}
                      placeholder={'ex) A, B, C, ...'}
                      onChange={(e) => {
                        setEventClasses((state) => [
                          ...state.slice(0, index),
                          e.target.value,
                          ...state.slice(index + 1),
                        ]);
                      }}
                      value={eventClass}
                    ></TextField>
                    <TextField
                      css={inputStyle}
                      label={'가격(KLAY)'}
                      name={'price'}
                      type={'number'}
                      // placeholder={'Value..'}
                      onChange={(e) => {
                        propertiesHandler(e, index);
                      }}
                      value={String(price[index].price)}
                    ></TextField>
                    <TextField
                      css={inputStyle}
                      label={'인원수'}
                      name={'count'}
                      type={'number'}
                      // placeholder={'Value..'}
                      onChange={(e) => {
                        propertiesHandler(e, index);
                      }}
                      value={String(price[index].count)}
                    ></TextField>
                    {index > 0 ? (
                      <button
                        css={removeButtonStyle}
                        onClick={(e) => {
                          removePropertiesHandler(e, index);
                        }}
                      >
                        <DeleteIcon css={removeIconStyle}></DeleteIcon>
                      </button>
                    ) : undefined}
                  </li>
                );
              })}
            </ul>
            <div css={addButtonWrapperStyle}>
              <button css={addButtonStyle} onClick={addPropertiesHandler}>
                <span>추가</span>
              </button>
            </div>
          </>
        ) : (
          <ul css={classListStyle}>
            <li>
              <TextField
                css={inputStyle}
                label={'등급'}
                name={'class_name'}
                placeholder={'ex) A, B, C, ...'}
                onChange={(e) => {
                  setEventClasses((state) => [e.target.value]);
                }}
                value={'Event'}
                disabled
              ></TextField>
              <TextField
                css={inputStyle}
                label={'가격(KLAY)'}
                name={'price'}
                type={'number'}
                // placeholder={'Value..'}
                onChange={(e) => {
                  propertiesHandler(e, 0);
                }}
                value={String(price[0].price)}
              ></TextField>
              <TextField
                css={inputStyle}
                label={'인원수'}
                name={'count'}
                type={'number'}
                // placeholder={'Value..'}
                onChange={(e) => {
                  propertiesHandler(e, 0);
                }}
                value={String(price[0].count)}
              ></TextField>
            </li>
          </ul>
        )}
      </div>
    </EventCreateItemWrapper>
  );
};

export default EventCreatePrices;
