import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/dashboard');
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');

    await axios
      .post('http://127.0.0.1:8080/api/auth/login', formData)
      .then((response) => {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('refresh-token', response.data.data.refresh_token);
        localStorage.setItem('id', response.data.data.id);
        history.push('/dashboard');
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };
  return (
    <div className="login-page">
      <div class="login-box">
        <div class="card card-outline card-primary">
          <div class="card-header text-center">
            <Link to={''} class="h1">
              <b>Admin</b>LTE
            </Link>
          </div>
          <div class="card-body">
            <p class="login-box-msg">Sign in</p>

            {(validation.message && validation.message.map && (
              <div className="alert alert-danger">
                {validation.message.map((valid) => (
                  <div>
                    {valid.Field} is {valid.Tag}
                  </div>
                ))}
              </div>
            )) ||
              (validation.message && (
                <div className="alert alert-danger">{validation.message}</div>
              ))}
            <form onSubmit={loginHandler} method="POST">
              <div class="input-group mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div class="input-group mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <button type="submit" class="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            {/* <div class="social-auth-links text-center mt-2 mb-3">
            <Link href="#" class="btn btn-block btn-primary">
              <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
            </Link>
            <Link href="#" class="btn btn-block btn-danger">
              <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
            </Link>
          </div> */}

            {/* <p class="mb-1">
            <Link href="forgot-password.html">I forgot my password</Link>
          </p> */}
            {/* <p class="mb-0">
            <a href="register.html" class="text-center">
              Register a new membership
            </a>
          </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
