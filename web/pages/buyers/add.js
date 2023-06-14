import { useState } from "react";
import {
  Breadcrumb,
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Row,
} from "react-bootstrap";
import config from "../../config";
import { useRouter } from "next/router";
import { BsListColumns } from "react-icons/bs";

const CreateForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    registrationNumber: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${config.API_URL}/api/buyers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Proses berhasil
        // console.log("Data berhasil dibuat");
        router.push("/buyers");
      } else {
        // Proses gagal
        setError("Terjadi kesalahan saat membuat data");
      }
    } catch (error) {
      setError("Terjadi kesalahan:", error);
    }
  };

  const listBuyer = () => {
    router.push("/buyers");
  };

  return (
    <Container>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="#" onClick={listBuyer}>
            <BsListColumns /> List Buyer
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Add Buyer</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <hr/>
      <Form onSubmit={handleSubmit} className="container mt-3 mb-3">
        {error && <div className="alert alert-danger">{error}</div>}{" "}
        {/* Tampilkan badge error */}
        <Row className="mb-3">
          <FormGroup className="col col-sm-6">
            <FormLabel>Username</FormLabel>
            <FormControl
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Row>
        <Row className="mb-3">
          <FormGroup className="col col-sm-6">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            ></FormControl>
          </FormGroup>
        </Row>
        <Row className="mb-3">
          <FormGroup className="col col-sm-6">
            <FormLabel>Email</FormLabel>
            <FormControl
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            ></FormControl>
          </FormGroup>
        </Row>
        <Row className="mb-3">
          <FormGroup className="col col-sm-6">
            <FormLabel>Registration Number</FormLabel>
            <FormControl
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
            ></FormControl>
          </FormGroup>
        </Row>
        <Button type="submit">Add New Buyer</Button>
      </Form>
    </Container>
  );
};

export default CreateForm;
