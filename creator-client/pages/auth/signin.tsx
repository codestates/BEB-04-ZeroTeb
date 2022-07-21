import type { NextPage } from 'next';
import { useEffect } from 'react';
import { KlipLoginBtn } from '../../components/klip/KlipLoginBtn';
import { getCookie } from 'cookies-next';
import { decodeJwt } from '../../modules/utils';
import { useRouter } from 'next/router';

const AuthSignInPage: NextPage = () => {
  const accessToken = getCookie('access_token');
  const router = useRouter();
  useEffect(() => {
    const jwtPayload = decodeJwt(accessToken?.toString() ?? '');
    if (jwtPayload?.address !== '' && jwtPayload?.username) {
      router.push('/');
    }
  }, []);
  return (
    <div>
      SignIn
      <KlipLoginBtn></KlipLoginBtn>
    </div>
  );
};

export default AuthSignInPage;
