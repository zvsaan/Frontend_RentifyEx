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

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/product/");
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
                      <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                      <CTableHeaderCell scope="col">City</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Deskripsi</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {products.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell>{item.title}</CTableHeaderCell>
                        <CTableHeaderCell>{item.city}</CTableHeaderCell>
                        <CTableDataCell>{item.category}</CTableDataCell>
                        <CTableDataCell>{item.price}</CTableDataCell>
                        <CTableDataCell>{item.desc}</CTableDataCell>
                        <CTableDataCell>
                          <img
                            src={`http://localhost:8080/uploads/${item.photo}`}
                            alt={item.title}
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                          />
                        </CTableDataCell>
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

export default Product;