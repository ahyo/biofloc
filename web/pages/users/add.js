import { useState } from "react";
import {
  Alert,
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
  const [yesNo, setYesNo] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    isAdmin: "",
  });

  const handleYesNoChange = (event) => {
    setYesNo(event.target.value);
  };

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
      const response = await fetch(`${config.API_URL}/api/users`, {
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
        router.push("/users");
      } else {
        // Proses gagal
        setError("Terjadi kesalahan saat membuat data");
      }
    } catch (error) {
      setError("Terjadi kesalahan:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Add User</h3>
        <Button variant="primary" onClick={() => router.push("/users")}>
          <BsListColumns /> List Users
        </Button>
      </div>
      <hr />
      <Form onSubmit={handleSubmit} className="container mt-3 mb-3">
        {error && <Alert variant="warning">{error}</Alert>}{" "}
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
            <FormLabel>Is Admin</FormLabel>
            <div class="form-check form-check-inline">
              <Form.Check
                type="radio"
                name="isAdmin"
                value="Yes"
                label="Yes"
                checked={yesNo === "Yes"}
                onChange={handleYesNoChange}
              />
              <Form.Check
                type="radio"
                name="isAdmin"
                value="No"
                label="No"
                checked={yesNo === "No"}
                onChange={handleYesNoChange}
              />
            </div>
          </FormGroup>
        </Row>
        <Button type="submit">Add New User</Button>
      </Form>
    </div>
  );
};

export default CreateForm;
