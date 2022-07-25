import { FunctionComponent } from 'react';
import { AuthSignInWrapper } from '../../components/auth/signIn';
import KlipLogin from '../../components/klip/login';

interface AuthSignInProps {}

const AuthSignIn: FunctionComponent<AuthSignInProps> = () => {
  return (
    <AuthSignInWrapper>
      <KlipLogin></KlipLogin>
    </AuthSignInWrapper>
  );
};

export default AuthSignIn;
