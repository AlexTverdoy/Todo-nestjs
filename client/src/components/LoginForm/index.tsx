import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useApi } from '../../contexts/ApiProvider';

type LoginFormProps = {
  loginHandler: () => void
}

function LoginForm({ loginHandler }: LoginFormProps) {
  const apiClient = useApi();

  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    newUsername: '',
    newPassword: ''
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await apiClient.post('/auth/login',
      {
        username: formValues.username,
        password: formValues.password
      });
    if (response.ok) {
      localStorage.setItem('a_t', response.body.access_token);
      loginHandler();
    } else {
      setError(response.body.message[0]);
    }
  }

  const handleRegister: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await apiClient.post('/auth/signup',
      {
        username: formValues.newUsername,
        password: formValues.newPassword
      });
    if (response.ok) {
      setIsSignUp(false);
      setError(null);
    } else {
      setError(response.body.message[0]);
    }
  }

  return (
    <div>
      {isSignUp
        ?
        <form className='login-form' onSubmit={handleRegister}>
          <p>Login</p>
          <input
            name='newUsername'
            value={formValues.newUsername}
            onChange={handleInputChange}
          />
          <p>Password</p>
          <input
            name='newPassword'
            type='password'
            value={formValues.newPassword}
            onChange={handleInputChange}
          />
          <button className='form-btn' type='submit'>Register</button>
          {error &&
            <span className="error-label">
              {error}
            </span>
          }
          <span
            className='change-form-btn'
            onClick={() => {
              setIsSignUp(false)
              setError(null);
            }}
          >
            Go to Login
          </span>
        </form>
        :
        <form className='login-form' onSubmit={handleLogin}>
          <p>Login</p>
          <input
            name='username'
            value={formValues.username}
            onChange={handleInputChange}
          />
          <p>Password</p>
          <input
            name='password'
            type='password'
            value={formValues.password}
            onChange={handleInputChange}
          />
          <button className='form-btn' type='submit'>Login</button>
          {error &&
            <span className="error-label">
              {error}
            </span>
          }
          <span
            className="change-form-btn"
            onClick={() => {
              setIsSignUp(true)
              setError(null);
            }}
          >
            Go to Registration
          </span>
        </form>
      }
    </div>
  );
}

export default LoginForm;