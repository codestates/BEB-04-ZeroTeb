import React, { FunctionComponent, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import QRCode from 'react-qr-code';
import { isMobile } from '../../modules/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { klipActions } from '../../store/klipSlice';
import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';

interface KlipAddressProps {}

const KlipAddress: FunctionComponent<KlipAddressProps> = () => {
  const klipState = useSelector((state: RootState) => state.klip);
  const router = useRouter();
  const dispatch = useDispatch();

  const onBtnGetKlipAddr = () => {};

  useEffect(() => {
    if (klipState.requestKey === '') {
      const bappName = 'TT_APP';
      const successLink = '';
      const failLink = '';
      const requestConfig: AxiosRequestConfig = {
        method: 'post',
        url: 'https://a2a-api.klipwallet.com/v2/a2a/prepare',
        data: {
          bapp: { name: bappName },
          callback: { success: successLink, fail: failLink },
          type: 'auth',
        },
      };
      axios(requestConfig).then((res) => {
        dispatch(klipActions.set_requestKey(res.data.request_key));
        dispatch(klipActions.set_status(res.data.status));
      });
    }
  }, []);

  useEffect(() => {
    const requestAuth = setInterval(() => {
      if (klipState.status === 'prepared' && klipState.requestKey !== '') {
        const requestConfig: AxiosRequestConfig = {
          method: 'POST',
          url: 'http://localhost:8080/auth/signin',
          data: {
            request_key: klipState.requestKey,
          },
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        };
        axios(requestConfig).then((res) => {
          console.log(res);
          const data = res.data;
          if (!data.address) return false;
          dispatch(klipActions.set_requestKey(''));
          dispatch(klipActions.set_klaytnAddress(data.address));
          clearInterval(requestAuth);
          return true;
        });
      }
    }, 5000);
    return () => {
      clearInterval(requestAuth);
    };
  }, [klipState.requestKey]);

  if (klipState.requestKey) {
    if (isMobile.Android()) {
      return (
        <Button
          href={`intent://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${klipState.requestKey}#Intent;scheme=kakaotalk;package=com.kakao.talk;end`}
        >
          Klip 주소 얻어오기
        </Button>
      );
    }
    if (isMobile.IOS()) {
      return (
        <Button
          href={`kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${klipState.requestKey}`}
        >
          Klip 주소 얻어오기
        </Button>
      );
    }
    return (
      <QRCode value={`https://klipwallet.com/?target=/a2a?request_key=${klipState.requestKey}`} />
    );
  } else if (klipState.klaytnAddress) {
    return (
      <a
        target="_blank"
        href={`${process.env.REACT_APP_SCOPE_URL}/account/${klipState.klaytnAddress}`}
        rel="noreferrer"
      >
        {klipState.klaytnAddress}
      </a>
    );
  } else {
    return <Button onClick={onBtnGetKlipAddr}>Klip 주소 얻어오기</Button>;
  }
};

export default KlipAddress;
