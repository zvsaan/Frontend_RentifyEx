import React, { useState, useEffect } from "react";
import axios from "axios";
// import './profilee.css'      
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import photo from '../../assets/images/product1.jpg';

const Profil = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const getId = JSON.parse(localStorage.getItem("id"));

  const GetDataUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/" + getId);
      const userDataFromServer = response.data.data[0];

      setUserData({
        username: userDataFromServer.username,
        email: userDataFromServer.email,
        password: userDataFromServer.password,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    GetDataUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/update/user/${getId}`, userData);
      console.log("User data updated successfully", response.data);
      setMessage("Profile updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      setMessage("Failed to update profile. Please try again.");
    }
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <br />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '100px'}}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', padding: '50px', borderRadius: '8px', marginBottom: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <img src={photo} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', border: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h4 style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', padding: '10px'}}>Username: {userData.username}</h4>
                  <h4 style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', padding: '10px'}}>Email: {userData.email}</h4>
                  <h4 style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', padding: '10px'}}>Password: {userData.password}</h4>
                </div>
              </div>
              <button onClick={toggleEditModal} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Edit Account
              </button>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={isEditModalOpen} toggle={toggleEditModal}>
        <ModalHeader className="edit-modal-header" toggle={toggleEditModal}>
          Edit Account
        </ModalHeader>
        {message && <div className="alert alert-info mb-3" role="alert">{message}</div>}
        <ModalBody className="edit-modal-body">
          <Form className="edit-form" onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                className="edit-custom-input"
                type="text"
                name="username"
                placeholder="Username"
                value={userData.username}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                className="edit-custom-input"
                type="text"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                className="edit-custom-input"
                type="text"
                name="password"
                placeholder="Password"
                value={userData.password}
                onChange={handleInputChange}
              />
            </FormGroup>
            <Button type="submit" className="edit-modal-btn">
              Save Changes
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Profil;