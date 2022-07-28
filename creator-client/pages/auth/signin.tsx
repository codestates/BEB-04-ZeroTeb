import type { NextPage } from 'next';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { decodeJwt } from '../../modules/utils';
import { useRouter } from 'next/router';
import AuthSignIn from '../../layouts/auth/sign-in';

const AuthSignInPage: NextPage = () => {
  const accessToken = getCookie('access_token');
  const router = useRouter();
  useEffect(() => {
    const jwtPayload = decodeJwt(accessToken?.toString() ?? '');
    if (jwtPayload?.address !== '' && jwtPayload?.username) {
      router.push('/');
    }
  }, []);
  return <AuthSignIn></AuthSignIn>;
};

export default AuthSignInPage;
