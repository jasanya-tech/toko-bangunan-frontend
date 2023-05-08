import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';

function Sidebar() {
  const [user, setUser] = useState({});
  const history = useHistory();
  let token = localStorage.getItem('token');
  let refreshToken = localStorage.getItem('refresh-token');
  const userId = localStorage.getItem('id');
  const location = history.location.pathname;

  const getToken = async () => {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');

    axios.defaults.headers.common['Authorization'] = refreshToken;
    axios.defaults.headers.common['id'] = userId;
    await axios
      .post('http://localhost:8080/api/auth/refresh-token')
      .then((response) => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh-token');
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('refresh-token', response.data.data.refresh_token);

        refreshToken = response.data.data.refresh_token;
        token = response.data.data.token;
        alert(
          'Your token has expired, you have successfully generated a new token. please try again your request'
        );
      })
      .catch((error) => {
        if (error.response.data.message === 'Token is expired') {
          alert('Your refresh token is expired, please login again');
          localStorage.removeItem('token');
          localStorage.removeItem('refresh-token');
          localStorage.removeItem('id');
          history.push('/');
        } else {
          alert('Your refresh token is invalid, please login again');
          localStorage.removeItem('token');
          localStorage.removeItem('refresh-token');
          localStorage.removeItem('id');
          history.push('/');
        }
      });
  };

  const fetchData = async () => {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');

    axios.defaults.headers.common['Authorization'] = token;
    await axios
      .get(`http://localhost:8080/api/auth/${userId}/detail`)
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        if (error.response.data.message === 'Token is expired') {
          getToken();
        } else {
          alert('Your token fetch data is invalid, please login again');
          localStorage.removeItem('token');
          localStorage.removeItem('refresh-token');
          localStorage.removeItem('id');
          history.push('/');
        }
      });
  };

  useEffect(() => {
    if (!token || !refreshToken) {
      history.push('/');
    }
    fetchData();
  }, []);

  const logout = async () => {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');

    axios.defaults.headers.common['Authorization'] = token;
    axios.defaults.headers.common['id'] = userId;
    await axios
      .get('http://localhost:8080/api/auth/logout')
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh-token');
        localStorage.removeItem('id');
        history.push('/');
      })
      .catch((error) => {
        if (error.response.data.message === 'Token is expired') {
          alert('get token');
          getToken();
        } else {
          alert('Your token is invalid, please login again');
          localStorage.removeItem('token');
          localStorage.removeItem('refresh-token');
          localStorage.removeItem('id');
          history.push('/');
        }
      });
  };

  return (
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <a href="../../index3.html" class="brand-link">
        <img
          src={logo}
          className="brand-image img-circle elevation-3"
          alt="logo"
        />

        <span class="brand-text font-weight-light">MUTIARA-TOKO</span>
      </a>

      <div class="sidebar">
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <imgage
              src={logo}
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div class="info">
            <Link href="#" class="d-block">
              {user.username}
            </Link>
          </div>
        </div>

        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li class="nav-item">
              <Link
                to={'/dashboard'}
                className={`${
                  location === '/dashboard' ? 'nav-link active' : 'nav-link'
                }`}
              >
                <i class="nav-icon fas fa-th"></i>
                <p>Dashboard</p>
              </Link>
            </li>

            <li
              className={`${
                location === '/dashboard/product' ||
                location === '/dashboard/product/pembelian'
                  ? 'nav-item menu-open'
                  : 'nav-item'
              }`}
            >
              <Link
                to={'#'}
                className={`${
                  location === '/dashboard/product' ||
                  location === '/dashboard/product/pembelian'
                    ? 'nav-link active'
                    : 'nav-link'
                }`}
              >
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Product
                  <i class="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <Link
                    to={'/dashboard/product/pembelian'}
                    className={`${
                      location === '/dashboard/product/pembelian'
                        ? 'nav-link active'
                        : 'nav-link'
                    }`}
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Pembelian</p>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    to={'/dashboard/product'}
                    className={`${
                      location === '/dashboard/product'
                        ? 'nav-link active'
                        : 'nav-link'
                    }`}
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Product</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li
              className={`${
                location === '/dashboard/catatan/pengeluaran' ||
                location === '/dashboard/catatan/pemasukan'
                  ? 'nav-item menu-open'
                  : 'nav-item'
              }`}
            >
              <Link
                href="#"
                className={`${
                  location === '/dashboard/catatan/pengeluaran' ||
                  location === '/dashboard/catatan/pemasukan'
                    ? 'nav-link active'
                    : 'nav-link'
                }`}
              >
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Catatan
                  <i class="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <Link
                    to={'/dashboard/catatan/pengeluaran'}
                    className={`${
                      location === '/dashboard/catatan/pengeluaran'
                        ? 'nav-link active'
                        : 'nav-link'
                    }`}
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Pengeluaran</p>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    to={'/dashboard/catatan/pemasukan'}
                    className={`${
                      location === '/dashboard/catatan/pemasukan'
                        ? 'nav-link active'
                        : 'nav-link'
                    }`}
                  >
                    <i class="far fa-circle nav-icon"></i>
                    <p>Pemasukan</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li class="nav-item">
              <button onClick={logout} class="btn btn-primary">
                <p>Logout</p>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
