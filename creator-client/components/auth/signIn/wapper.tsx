import { css } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

interface AuthSignInWrapperProps {
  children: ReactNode;
}

const AuthSignInWrapper: FunctionComponent<AuthSignInWrapperProps> = ({ children }) => {
  const wrapperStyle = css`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  `;
  return <div css={wrapperStyle}>{children}</div>;
};

export default AuthSignInWrapper;
