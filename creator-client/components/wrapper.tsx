import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FunctionComponent<WrapperProps> = ({ children }) => {
  const wrapperStyle = css`
    padding-top: 100px;
  `;
  return <div css={wrapperStyle}>{children}</div>;
};

export default Wrapper;
