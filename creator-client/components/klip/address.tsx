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
    const requestAuth = setInterval(() => {
      if (klipState.status === 'prepared' && klipState.requestKey !== '') {
        const requestConfig: AxiosRequestConfig = {
          method: 'POST',
          url: '/api/auth/signin',
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
          dispatch(klipActions.set_status(data.status));
          clearInterval(requestAuth);
          router.push('/');
          return true;
        });
      }
    }, 1500);
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
        style={{
          color: 'white',
          fontSize: '1.2em',
        }}
        target="_blank"
        href={`https://www.klaytnfinder.io/account/${klipState.klaytnAddress}`}
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
