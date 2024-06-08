import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Table from "examples/Tables/Table";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from "@mui/material/IconButton";
import { Visibility } from "@mui/icons-material";

function Tables() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [circle_name, setcircle_name] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [circle_nameError, setcircle_nameError] = useState(null);
  const [error, setError] = useState('');
  const [circles, setCircles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [selectedCircleId, setSelectedCircleId] = useState(null);
  const [rows, setRows] = useState([]);

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.classList.remove("modal-open");
  };

  const handleShowModal = () => {
    console.log("Show modal clicked");
    setcircle_name("");
    setShowModal(true);
    document.body.classList.add("modal-open");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'circle_name':
        setcircle_name(value);
        setcircle_nameError('');
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let error = '';
    if (circle_name === "") {
      error = 'Circle name is required';
    } else if (circle_name.length < 3) {
      error = 'Circle name must be at least 3 characters long';
    }
    if (error) {
      setcircle_nameError(error);
      return;
    }
    const token = localStorage.getItem('jwtToken');
    const headers = { 'Authorization': `Bearer ${token}` };
    
    try {
      await axios.post('http://152.42.188.210:8080/index.php/api/auth/create_circle', {
        circle_name: circle_name,
      }, { headers });
      
      handleCloseModal();
      toast.success('Circle created successfully');
      const updatedCircles = await getCircles();
      setCircles(updatedCircles);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError('An error occurred while submitting the form');
    }
  };
  
  const getCircles = async () => {
    try {
      const response = await axios.get('http://152.42.188.210:8080/index.php/api/auth/get_circle');
      const circles = response.data.data;
      circles.forEach(circle => {
        // Memasukkan data pengguna ke dalam userMap
        if (!userMap[circle.creator_circle]) {
          userMap[circle.creator_circle] = circle.creator_name; // Simpan nama pengguna, bukan ID pengguna
        }
        console.log('userMap:', userMap); // Tampilkan userMap di console
      });
      return circles;
    } catch (error) {
      console.error('Error fetching circles:', error);
      return [];
    }
  };  
  const userMap = {};

  const getUserByUsername = (username) => {
    return userMap[username] || username ;
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const circles = await getCircles();
      console.log('Fetched Circles:', circles); // Tampilkan circles yang telah diambil di console
      setRows(circles.map(circle => ({
        circle_name: circle.circle_name,
        creator_circle: getUserByUsername(circle.creator_circle),
        created_at: new Date(circle.created_at).toLocaleDateString(),
        action: (
          <IconButton
            // onClick={() => history.push(`/detail_circle/${circle.id}`)}
            aria-label="view circle"
          >
            <Visibility />
          </IconButton>
        ),
      })));
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log('Rows:', rows);
  }, [rows]);
  
   
  return (
    <DashboardLayout>
      <ToastContainer />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h3"></SoftTypography>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleShowModal}>
                Create Circle
              </Button>
            </SoftBox>
            <SoftBox>
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <div className='body-flex'>
        <div className="overlay" />
        <div className="flex">
          <div className="col-15 p-5">
            <Modal show={showModal} onHide={handleCloseModal} style={{ maxWidth: '1500px', width: '100%' }}>
              <div className="overlay-icons" />
              <Modal.Header closeButton>
                <Modal.Title>Create Circle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className='mb-5' controlId='exampleForm.ControlInput1'>
                    <Form.Control
                      type="text"
                      placeholder='Enter Circle Name'
                      name='circle_name'
                      autoFocus
                      onChange={handleChange}
                      value={circle_name}
                    />
                    {circle_nameError && (
                      <div className="errorMsg" style={{ fontSize: 'smaller', color: 'red' }}>
                        {circle_nameError}
                      </div>
                    )}
                  </Form.Group>
                  <Button variant="contained" type='submit' onClick={handleFormSubmit}>
                    Save
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Tables;
