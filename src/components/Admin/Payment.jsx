import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiPencil, BiTrash } from 'react-icons/bi';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
// import img from '..'
// import img from '../../assets/uploads/img.jpg'

function Payment() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sewa/");
      setProducts(response.data.data);
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="body-flex">
      <div className="flex">
        <div className="col-10 p-5 mx-auto">
          <h1 className="py-1">Data Register User</h1>

          <CCard className="mb-4 mx-auto">
            <CCardHeader>
              <strong>Tabel Product</strong>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis small">
                Tabel ini menampilkan data dari berapa product
              </p>

              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Nama User</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Product</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Hari</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {products.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell>{item.id_user}</CTableHeaderCell>
                        <CTableHeaderCell>{item.id_product}</CTableHeaderCell>
                        <CTableDataCell>{item.hari}</CTableDataCell>
                        <CTableDataCell>{item.tanggal}</CTableDataCell>
                        <CTableDataCell>{item.harga}</CTableDataCell>
                        <CTableDataCell>{item.total}</CTableDataCell>
                        <CTableDataCell>
                          <CButton className="btn btn-primary text-white me-2">
                            Verifikasi
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </div>
      </div>
    </div>
  );
}

export default Payment;