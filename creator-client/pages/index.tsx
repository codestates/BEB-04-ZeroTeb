import type { NextPage } from 'next';
import Wrapper from '../components/wrapper';
import Header from '../layouts/header';
import dynamic from 'next/dynamic';
import Progress from '../components/Progress';
const Animator = dynamic(
  import('react-scroll-motion').then((it) => it.Animator as ComponentType<never>),
  { ssr: false, loading: () => <Progress></Progress> }
);

import {
  Animator as Ani,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  FadeOut,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  StickyOut,
  Zoom,
  ZoomIn,
  ZoomOut,
} from 'react-scroll-motion';
import { ComponentType } from 'react';
import { css, keyframes } from '@emotion/react';
import ReactQrCode from 'react-qr-code';

const Home: NextPage = () => {
  const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
  const FadeUp = batch(Fade(), Move(), Sticky());
  const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -5px, 0);
  }

  70% {
    transform: translate3d(0, -5px, 0);
  }

  90% {
    transform: translate3d(0,-5px,0);
  }
`;
  const mouseScrollStyle = css`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    animation: ${bounce} 3s ease infinite;
  `;

  return (
    <Wrapper>
      <ScrollContainer>
        <ScrollPage>
          <Ani animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
            <div style={{ display: 'flex' }}>
              <p
                style={{
                  fontSize: '2.5em',
                  color: 'white',
                  whiteSpace: 'nowrap',
                  paddingRight: '0.3em',
                }}
              >
                TT에
              </p>
              <p style={{ fontSize: '2.5em', color: 'white', whiteSpace: 'nowrap' }}>
                오신 것을 환영합니다!
              </p>
            </div>
          </Ani>
        </ScrollPage>
        <ScrollPage>
          <Ani animation={ZoomInScrollOut}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '2em', color: 'white', whiteSpace: 'nowrap' }}>
                누구도 신뢰하지 않는
              </p>
              <p style={{ fontSize: '2em', color: 'white', whiteSpace: 'nowrap' }}>Klaytn 기반의</p>
              <p style={{ fontSize: '2em', color: 'white', whiteSpace: 'nowrap' }}>
                티켓팅 서비스 ✨
              </p>
            </div>
          </Ani>
        </ScrollPage>
        <ScrollPage>
          <Ani animation={FadeUp}>
            <span style={{ fontSize: '2.5em', color: 'white', whiteSpace: 'nowrap' }}>
              TT는 제공합니다
            </span>
          </Ani>
        </ScrollPage>
        <ScrollPage>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <div style={{ fontSize: '2em', textAlign: 'center' }}>
              <Ani animation={batch(MoveIn(1000, 0), MoveOut(-1000, -1000))}>
                <p style={{ color: 'white', whiteSpace: 'nowrap', padding: '0.5em' }}>
                  티켓팅에 대한 공평한 기회
                </p>
              </Ani>
              <Ani animation={batch(MoveIn(-1000, 1000), MoveOut(1000, -1000))}>
                <p style={{ color: 'white', whiteSpace: 'nowrap', padding: '0.5em' }}>
                  타켓 가격의 103% 보상
                </p>
              </Ani>
              {/* <span>TT 서비스는 제공합니다.</span> */}
              <Ani animation={batch(MoveOut(-1000, 0), MoveIn(1000, 1000))}>
                <p style={{ color: 'white', whiteSpace: 'nowrap', padding: '0.5em' }}>
                  영구적인 구매, 이용 내역
                </p>
              </Ani>
              <Ani animation={batch(MoveOut(1000, 0), MoveIn(-1000, 1000))}>
                <p style={{ color: 'white', whiteSpace: 'nowrap', padding: '0.5em' }}>
                  간편한 체크인
                </p>
              </Ani>
            </div>
          </div>
        </ScrollPage>
        <ScrollPage>
          <Ani animation={batch(Fade(), Sticky())}>
            {/* <span style={{ fontSize: '40px' }}>Done</span>
            <br /> */}
            <span style={{ fontSize: '2.5em', color: 'white', whiteSpace: 'nowrap' }}>
              지금 바로 시작하시죠!
            </span>
          </Ani>
        </ScrollPage>
        <ScrollPage>
          <Ani animation={batch(Fade(), Sticky(), ZoomOut())}>
            {/* <span style={{ fontSize: '40px' }}>Done</span>
            <br /> */}
            <div
              style={{ textAlign: 'center', fontSize: '1em', color: 'white', whiteSpace: 'nowrap' }}
            >
              <ReactQrCode value="http://server.beeimp.com:18080/file?fn=358a1386-1163-4792-ad8c-ef4923969850.jpg"></ReactQrCode>
              <p style={{ paddingTop: '1em' }}>휴대폰에서 QR코드를 인식해주세요!</p>
              <p style={{ fontSize: '0.5em' }}>
                (현재 스토어 배포 중이며, QR코드는 안드로이드 apk파일 다운로드를 지원합니다.)
              </p>
            </div>
          </Ani>
        </ScrollPage>
      </ScrollContainer>
      <div css={mouseScrollStyle}>
        <svg
          width="100pt"
          height="100pt"
          fill="#ffffff"
          version="1.1"
          viewBox="0 0 752 752"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="m459.87 341.1c-0.003906-45.297-36.715-82.012-82.016-82.016h-3.7109c-45.297 0.003906-82.012 36.715-82.016 82.016v69.707c0.003906 45.297 36.715 82.004 82.016 82.012h3.7109c45.297-0.003906 82.012-36.715 82.016-82.012zm-13.75 69.707c-0.003906 18.871-7.6289 35.895-19.996 48.266-12.375 12.363-29.398 19.988-48.273 19.996h-3.7109c-18.871-0.003906-35.898-7.6289-48.273-19.996-12.363-12.375-19.988-29.398-19.996-48.266l0.003906-69.707c0.003906-18.871 7.6289-35.898 19.996-48.273 12.375-12.363 29.398-19.988 48.273-19.996h3.7109c18.871 0.003907 35.895 7.6289 48.273 19.996 12.363 12.375 19.988 29.398 19.996 48.273z" />
            <path d="m375.89 328.18c-3.7969 0-6.875 3.0781-6.875 6.875v20.164c0 3.7969 3.0781 6.875 6.875 6.875s6.875-3.0781 6.875-6.875v-20.164c0.003906-3.7969-3.0742-6.875-6.875-6.875z" />
            <path d="m371.71 587.61c2.5117 2.0078 6.0742 2.0078 8.5898 0l34.371-27.496c2.9648-2.3711 3.4414-6.6953 1.0742-9.6602-2.3711-2.9648-6.6953-3.4414-9.6602-1.0742l-30.082 24.059-30.078-24.062c-2.9648-2.3711-7.293-1.8906-9.6602 1.0742-2.3711 2.9648-1.8906 7.2891 1.0742 9.6602z" />
            <path d="m406.08 202.63c2.9648 2.3711 7.2891 1.8906 9.6602-1.0742 2.3711-2.9648 1.8906-7.2891-1.0742-9.6602l-34.371-27.5c-2.5156-2.0117-6.0742-2.0117-8.5898 0l-34.371 27.496c-2.9648 2.3711-3.4492 6.6953-1.0742 9.6602 2.3711 2.9648 6.6953 3.4414 9.6602 1.0742l30.082-24.059z" />
          </g>
        </svg>
      </div>
      <Header></Header>
    </Wrapper>
  );
};

export default Home;
