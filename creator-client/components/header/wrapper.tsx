import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface HeaderWrapperProps {
  children: ReactNode;
  isScroll: boolean;
}

const HeaderWrapper: FunctionComponent<HeaderWrapperProps> = ({ children, isScroll }) => {
  const coverStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${isScroll ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.4)'};
  `;

  const wrapperStyle = css`
    position: relative;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

    width: 100%;
    max-width: 1500px;
    height: 100%;
  `;
  return (
    <div css={coverStyle}>
      <div css={wrapperStyle}>{children}</div>
    </div>
  );
};

export default HeaderWrapper;
