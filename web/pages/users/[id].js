import { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";
import config from "../../config";
import { BsListColumns } from "react-icons/bs";

const UpdateForm = (prop) => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    registrationNumber: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // Dapatkan data awal dari server berdasarkan ID menggunakan useEffect()
    fetchData();
  }, [id]);

  const fetchData = async () => {
    if (id === undefined) return;
    const token = localStorage.getItem("token");
    try {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(header);
      const response = await axios.get(
        `${config.API_URL}/api/buyers/${id}`,
        header
      );
      console.log(response);
      if (response.status == 200) {
        const { data } = response;
        setFormData(data);
        // console.log(buyers);
      } else {
        console.error("Terjadi kesalahan saat mengambil data pembeli");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
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
      const response = await fetch(`${config.API_URL}/api/buyers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Proses berhasil
        console.log("Data berhasil diperbarui");
        router.push("/buyers");
      } else {
        // Proses gagal
        setError("Terjadi kesalahan saat memperbarui data");
      }
    } catch (error) {
      SetError("Terjadi kesalahan:", error);
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
        <h3>Update Buyer</h3>
        <Button variant="primary" onClick={() => router.push("/buyers")}>
          <BsListColumns /> List Buyers
        </Button>
      </div>
      <hr />
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
        <Button type="submit">Update Buyer</Button>
      </Form>
    </div>
  );
};

export default UpdateForm;
