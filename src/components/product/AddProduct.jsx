import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Alert,
} from "reactstrap";
import SectionProduct from "../../shered/addproduct";
import "./add-product.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState(null);
  const [notification, setNotification] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !city || !category || !price || !desc || !photo) {
      setNotification({ type: "error", message: "Tolong isi semua formnya" });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("city", city);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("desc", desc);
    formData.append("photo", photo);

    try {
      const response = await axios.post(
        "http://localhost:8080/create/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product added successfully:", response.data);

      // Show success notification
      setNotification({
        type: "success",
        message: "Product added successfully. Waiting for validation.",
      });

      // Clear form fields
      setTitle("");
      setCity("");
      setCategory("");
      setPrice("");
      setDesc("");
      setPhoto(null);
    } catch (error) {
      console.error("Failed to add product:", error);
      setNotification({
        type: "error",
        message: "Failed to add product. Please try again.",
      });
    }
  };

  return (
    <>
      <SectionProduct title={"Add Product"} />
      <Container>
        <Row>
          <Col><br></br>
            {notification.type && notification.message && (
              <Alert
                color={notification.type === "success" ? "success" : "danger"}
              >
                {notification.message}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  className="custom-input2"
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  className="custom-input2"
                  type="text"
                  name="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  className="custom-input2"
                  type="select"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Category</option>
                  <option value="Mobil">Mobil</option>
                  <option value="Motor">Motor</option>
                  <option value="Play Station">Play Station</option>
                  <option value="Kursi Lipat">Kursi Lipat</option>
                  <option value="Tenda">Tenda</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Input
                  className="custom-input2"
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  className="custom-input2"
                  type="text"
                  name="desc"
                  placeholder="Deskripsi"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  className="custom-input2"
                  type="file"
                  name="photo"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </FormGroup>
              <Button type="submit" className="btn newsletter__btn">
                Add Product
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddProduct;