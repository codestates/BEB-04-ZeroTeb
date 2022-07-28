import { css } from '@emotion/react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

interface EventViewImageProps {
  url: string;
  size: string;
}

const EventViewImage: FunctionComponent<EventViewImageProps> = ({ url, size = '50xp' }) => {
  const [imageHeight, setImageHeight] = useState<number>(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const screenResize = () => {
    setImageHeight(() => ((wrapRef.current?.clientWidth ?? 0) / 16) * 9);
  };

  useEffect(() => {
    screenResize();
    window.addEventListener('resize', screenResize);
    return () => {
      window.removeEventListener('resize', screenResize);
    };
  }, []);
  const wrapperStyle = css`
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
    width: calc(${size});
    height: calc(${size} * 0.5625);
    min-width: calc(${size});
    min-height: calc(${size} * 0.5625);
    /* height: ${imageHeight}px; */
    border: 1px solid rgba(50, 50, 50, 0.3);
  `;
  const imageStyle = css`
    width: 100%;
    height: 100%;

    background-image: url(${url});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  `;
  return (
    <div css={wrapperStyle}>
      <div css={imageStyle}></div>
    </div>
  );
};

export default EventViewImage;
