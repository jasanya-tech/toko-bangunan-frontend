import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';

function Dashboard() {
  const history = useHistory();
  const [products, setProducts] = useState([]);

  let token = localStorage.getItem('token');
  let refrehToken = localStorage.getItem('refresh-token');
  let id = localStorage.getItem('id');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/');
    }
    fetchDataProduct();
  });

  const fetchDataProduct = async () => {
    let header = new Headers();
    header.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    header.append('Access-Control-Allow-Credentials', 'true');

    axios.defaults.headers.common['Authorization'] = token;
    axios
      .get('http://localhost:8080/api/product')
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div class="wrapper">
      <Header />
      <Sidebar />
      <div class="content-wrapper">
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0">Dashboard</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <Link href="#">Home</Link>
                  </li>
                  <li class="breadcrumb-item active">Dashboard v1</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-3 col-6">
                <div class="small-box bg-info">
                  <div class="inner">
                    <h3>{products.length}</h3>
                    <p>Product</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-bag"></i>
                  </div>
                  <Link to={'/dashboard/product'} class="small-box-footer">
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="small-box bg-success">
                  <div class="inner">
                    <h3>
                      53<sup Style="font-size: 20px">%</sup>
                    </h3>

                    <p>Pembelian Product</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-stats-bars"></i>
                  </div>
                  <Link href="#" class="small-box-footer">
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="small-box bg-warning">
                  <div class="inner">
                    <h3>44</h3>

                    <p>Pengeluaran</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-person-add"></i>
                  </div>
                  <Link href="#" class="small-box-footer">
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="small-box bg-danger">
                  <div class="inner">
                    <h3>65</h3>

                    <p>Pemasukan</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-pie-graph"></i>
                  </div>
                  <Link href="#" class="small-box-footer">
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <aside class="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
}

export default Dashboard;
