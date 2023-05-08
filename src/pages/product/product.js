import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import Header from '../../layouts/Header';
import Sidebar from '../../layouts/Sidebar';
import { getProduct } from '../../services/product-service';
import {
  balanceBodyTemplateDatatable,
  imageBodyTemplateDatatable,
} from '../../utils/format';

function Product() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  // search
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      selling_price: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      stock_product: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
    });
    setGlobalFilterValue('');
  };

  const renderHeader = () => {
    return (
      <div>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  // action button

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          // onClick={() => alert()}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          // onClick={() => alert()}
        />
      </React.Fragment>
    );
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/');
    }
    getProduct().then((response) => {
      setProducts(response.data.data);
      setLoading(false);
    });
    initFilters();
  }, []);

  return (
    <div class="wrapper">
      <Header />
      <Sidebar />
      <div class="content-wrapper">
        <section class="content-header"></section>

        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">Data Product</h3>
                  </div>
                  <div class="card-body">
                    <DataTable
                      value={products}
                      size="small"
                      responsiveLayout="scroll"
                      showGridlines
                      stripedRows
                      paginator
                      rows={5}
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      tableStyle={{ minWidth: '50rem' }}
                      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                      currentPageReportTemplate="{first} to {last} of {totalRecords}"
                      // paginatorLeft={paginatorLeft}
                      // paginatorRight={paginatorRight}
                      loading={loading}
                      dataKey="id"
                      filters={filters}
                      globalFilterFields={[
                        'name',
                        'selling_price',
                        'stock_product',
                      ]}
                      header={header}
                      emptyMessage="No product found."
                    >
                      <Column field="name" header="Name"></Column>
                      <Column
                        field="selling_price"
                        header="harga jual"
                        body={balanceBodyTemplateDatatable}
                      ></Column>
                      <Column
                        field="stock_product"
                        header="stock product"
                      ></Column>
                      <Column
                        field="image"
                        header="Image"
                        body={imageBodyTemplateDatatable}
                      ></Column>
                      <Column
                        header="Action"
                        body={actionBodyTemplate}
                        exportable={false}
                        style={{ minWidth: '12rem' }}
                      ></Column>
                    </DataTable>
                  </div>
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
export default Product;
