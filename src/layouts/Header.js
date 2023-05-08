import React from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Header() {
  return (
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link" data-widget="pushmenu" href="#" role="button">
            <i class="fas fa-bars"></i>
          </Link>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <Link href="#" class="nav-link">
            Home
          </Link>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <Link href="#" class="nav-link">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
