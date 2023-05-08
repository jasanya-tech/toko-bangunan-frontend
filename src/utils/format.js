export const formatCurrency = (value) => {
  return value.toLocaleString('id-ID', {
    currency: 'IDR',
  });
};

export const balanceBodyTemplateDatatable = (rowdata) => {
  return formatCurrency(rowdata.selling_price);
};

export const imageBodyTemplateDatatable = (rowData) => {
  return (
    <img
      src={`http://localhost:8080/public/images/product-img/${rowData.image}`}
      alt={rowData.image}
      className="shadow-2 border-round"
      style={{ width: '64px' }}
    />
  );
};
