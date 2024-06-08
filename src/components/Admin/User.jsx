import { React, useEffect, useState } from "react";
import axios from "axios";
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
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function User() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [show, setShow] = useState(false);
  
  const UpdateDataRegister = async (event) => {
    event.preventDefault();
    if (password !== konfirmasi) {
      alert("Password dan konfirmasi password harus sama");
      return;
    }
    try {
      const putData = await axios.put(
        `http://localhost:8080/update/user/${id}`,
        {
          email: email,
          username: username,
          password: password,
          konfirmasi: konfirmasi,
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
    setEmail(data.email);
    setUsername(data.username);
    setPassword(data.password);
    setKonfirmasi(data.konfirmasi);
    setShow(true);
  };
  const closeModal = () => {
    setId("");
    setEmail("");
    setUsername("");
    setPassword("");
    setKonfirmasi("");
    setShow(false);
  };

  const [showDelete, setShowDelete] = useState(false);
  const showModalDelete = (data) => {
    setId(data.id);
    setEmail(data.email);
    setUsername(data.username);
    setPassword(data.password);
    setKonfirmasi(data.konfirmasi);
    setShowDelete(true);
  };

  const closeModalDelete = () => {
    setId("");
    setEmail("");
    setUsername("");
    setPassword("");
    setKonfirmasi("");
    setShowDelete(false);
  };

  const DeleteDataUser = async (event) => {
    event.preventDefault();
    try {
      const deleteData = await axios.delete(
        `http://localhost:8080/delete/user/${id}`
      );
      alert(deleteData.data.messages);
      window.location.reload();
    } catch (error) {
      alert("Data Gagal dihapus");
    }
  };

  const [data_login, setDataRegister] = useState([]);

  const GetDataRegister = async () => {
    const getData = await axios.get(`http://localhost:8080/datauser`);
    setDataRegister(getData.data.data);
    console.log(getData);
  };

  useEffect(() => {
    GetDataRegister();
  }, []);

  return (
    <div className="body-flex">
      <div className="flex">
        <div className="col-10 p-5 mx-auto">
          <h1 className="py-1">Data User</h1>

          <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Form Update Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={UpdateDataRegister}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                ></Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>email</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>username</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>password</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>konfirmasi</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={(e) => setKonfirmasi(e.target.value)}
                    value={konfirmasi}
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
                      <p className="col-4 card-text">Email User</p>
                      <p className="col-6 card-text">: {email}</p>
                    </div>
                    <div className="row">
                      <p className="col-4 card-text">Username</p>
                      <p className="col-6 card-text">: {username}</p>
                    </div>
                    <div className="row">
                      <p className="col-4 card-text">Password</p>
                      <p className="col-6 card-text">: {password}</p>
                    </div>
                    <div className="row">
                      <p className="col-4 card-text">Konfirmasi Password</p>
                      <p className="col-6 card-text">: {konfirmasi}</p>
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

          <CCard className="mb-4 mx-auto">
            <CCardHeader>
              <strong>Tabel Login User</strong>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis small">
                Tabel ini menampilkan data dari akun user
              </p>

              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Password</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      Konfirmasi Password
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data_login.map((item, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell> {item.email} </CTableHeaderCell>
                        <CTableHeaderCell> {item.username} </CTableHeaderCell>
                        <CTableDataCell> {item.password} </CTableDataCell>
                        <CTableDataCell> {item.konfirmasi} </CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            className="btn btn-primary text-white me-2"
                            onClick={() => showModal(item)}
                          >
                            Edit
                          </CButton>
                          <CButton
                            className="btn btn-danger text-white"
                            onClick={() => showModalDelete(item)}
                          >
                            Hapus
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    );
                  })}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </div>
  );
}

export default User;
