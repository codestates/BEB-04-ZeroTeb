import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { decodeJwt } from '../modules/utils';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user';

function MyApp({ Component, pageProps }: AppProps) {
  const accessToken = getCookie('access_token');
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const jwtPayload = decodeJwt(accessToken?.toString() ?? '');
      if (!jwtPayload) throw new Error();
      if (jwtPayload?.address !== '' && jwtPayload?.username) {
        dispatch(userActions.set_username(jwtPayload.username));
        dispatch(userActions.set_address(jwtPayload.address));
        dispatch(userActions.set_isAuth(true));
      }
    } catch (err) {
      router.push('/auth/signin');
    }
  }, []);
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
