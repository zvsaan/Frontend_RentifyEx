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
import { Link } from "react-router-dom";

function ProductVendor() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]); 

  return (
    <div className="body-flex">
      <div className="flex">
        <div className="col-10 p-5 mx-auto">
          <h1 className="text-center py-1">Data Product</h1>
          <div className="text-center mb-3">
            <Link to="/addproduct">
              <CButton className="btn btn-primary text-white me-2">Tambah Data</CButton>
            </Link>
          </div>
          <CCard className="mb-4 mx-auto">
            <CCardHeader>
              <strong>Tabel Product</strong>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis small">
                Tabel ini menampilkan data dari berapa product
              </p>
              <input
                type="text"
                placeholder="Search by title"
                value={searchQuery}
                onChange={handleSearchInputChange}
                style={{
                  width: '30%',
                  padding: '8px',
                  marginBottom: '16px',
                  borderRadius: '2rem',
                  border: '1px solid #1EB2A6',
                  fontSize: '14px',
                  color: '#1EB2A6',
                }}
              />
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
                    {filteredProducts.map((item, index) => (
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
                          <BiPencil
                            className="text-primary me-2"
                            style={{ cursor: 'pointer' }}
                            // onClick={() => handleEdit(item.id)}
                          />
                          <BiTrash
                            className="text-danger"
                            style={{ cursor: 'pointer' }}
                            // onClick={() => handleDelete(item.id)}
                          />
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

export default ProductVendor;