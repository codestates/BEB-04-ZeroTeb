import { css } from '@emotion/react';
import { FunctionComponent } from 'react';

interface HeaderLogoProps {
  isScroll: boolean;
}

const HeaderLogo: FunctionComponent<HeaderLogoProps> = ({ isScroll }) => {
  const logoImageUrl = isScroll ? '/static/logo.gif' : '/static/logo.png';
  const wrapperStyle = css`
    grid-row: 1/2;
    grid-column: 1/3;

    position: relative;
    display: flex;
    align-items: center;
  `;
  const logoStyle = css`
    width: 200px;
    height: 100%;

    background-image: url(${logoImageUrl});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `;
  return (
    <div css={wrapperStyle}>
      <div css={logoStyle}></div>
    </div>
  );
};

export default HeaderLogo;
