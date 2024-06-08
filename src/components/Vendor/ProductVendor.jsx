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
import { Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductVendor() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [show, setShow] = useState(false);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const UpdateDataProduct = async (event) => {
  event.preventDefault();
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('city', city);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('photo', photo);

    const putData = await axios.put(
      `http://localhost:8080/update/product/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    alert(putData.data.messages);
    window.location.reload();
  } catch (error) {
    alert("Data Gagal diubah");
  }
};

  const showModal = (data) => {
    setId(data.id);
    setTitle(data.title);
    setCity(data.city);
    setCategory(data.category);
    setPrice(data.price);
    setPhoto(data.photo);
    setShow(true);
  };
  const closeModal = () => {
    setId("");
    setTitle("");
    setCity("");
    setCategory("");
    setPrice("");
    setPhoto("");
    setShow(false);
  };

  const [showDelete, setShowDelete] = useState(false);
  const showModalDelete = (data) => {
    setId(data.id);
    setTitle(data.title);
    setCity(data.city);
    setCategory(data.category);
    setPrice(data.price);
    setPhoto(data.photo);
    setShowDelete(true);
  };

  const closeModalDelete = () => {
    setId("");
    setTitle("");
    setCity("");
    setCategory("");
    setPrice("");
    setPhoto("");
    setShowDelete(false);
  };

  const DeleteDataUser = async (event) => {
    event.preventDefault();
    try {
      const deleteData = await axios.delete(
        `http://localhost:8080/delete/product/${id}`
      );
      alert(deleteData.data.messages);
      window.location.reload();
    } catch (error) {
      alert("Data Gagal dihapus");
    }
  };

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

          <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Form Update Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={UpdateDataProduct}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                ></Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>price</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>price</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </Form.Group>
                <Button type="submit" color="primary" className="px-4">
                  Update
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showDelete} onHide={closeModalDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Apakah Anda yakin menghapus data ini?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Detail Data</h5>
                    <div className="row">
                      <p className="col-4 card-text">title User</p>
                      <p className="col-6 card-text">: {title}</p>
                    </div>
                    <div className="row">
                      <p className="col-4 card-text">city</p>
                      <p className="col-6 card-text">: {city}</p>
                    </div>
                    <div className="row">
                      <p className="col-4 card-text">category</p>
                      <p className="col-6 card-text">: {category}</p>
                    </div>
                    <div className="row">
                      <p className="col-4 card-text">price category</p>
                      <p className="col-6 card-text">: {price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                type="submit"
                color="primary"
                className="px-4"
                onClick={DeleteDataUser}
              >
                Hapus Data
              </Button>
              <Button variant="danger" onClick={closeModalDelete}>
                Batal
              </Button>
            </Modal.Footer>
          </Modal>

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
                            src={`http://localhost:8080/images/${item.photo}`}
                            alt={item.title}
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                          />
                        </CTableDataCell>
                        <CTableDataCell>
                          <BiPencil
                            className="text-primary me-2"
                            style={{ cursor: 'pointer' }}
                            // onClick={() => handleEdit(item.id)}
                            onClick={() => showModal(item)}
                          />
                          <BiTrash
                            className="text-danger"
                            style={{ cursor: 'pointer' }}
                            // onClick={() => handleDelete(item.id)}
                            onClick={() => showModalDelete(item)}
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