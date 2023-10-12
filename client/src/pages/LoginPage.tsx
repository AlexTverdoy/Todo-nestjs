import LoginForm from '../components/LoginForm';

type LoginPageProps = {
  loginHandler: () => void
}

function LoginPage({ loginHandler }: LoginPageProps) {
  return (
    <div className='home-page'>
      <LoginForm loginHandler={loginHandler} />
    </div>
  );
}

export default LoginPage;
