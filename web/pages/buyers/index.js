import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import {
  Button,
  Table,
  Pagination,
  Container,
  Breadcrumb,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { BsPencil, BsPlus, BsPlusCircle, BsTrash, bsPencil, bsTrash } from "react-icons/bs";
import Link from "next/link";

const DataList = () => {
  const [buyers, setBuyers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchBuyers(currentPage);
  }, [currentPage]);

  const addBuyer = () => {
    router.push("/buyers/add");
  };

  const fetchBuyers = async (page) => {
    const token = localStorage.getItem("token");
    try {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //   console.log(header);
      const response = await axios.get(
        `${config.API_URL}/api/buyers?page=${page}`,
        header
      );
      // console.log(response);
      // return;
      if (response.status == 200) {
        const { data } = response;
        setBuyers(data.buyers);
        setTotalPages(data.totalPages);
        // console.log(buyers);
      } else {
        console.error("Terjadi kesalahan saat mengambil data pembeli");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (confirmDelete) {
      axios
        .delete(`${config.API_URL}/api/buyers/${id}`, header)
        .then((response) => {
          // Hapus item dari tabel atau lakukan aksi lain yang diperlukan
          console.log("Data berhasil dihapus");
        })
        .catch((error) => {
          console.error("Terjadi kesalahan saat menghapus data:", error);
        });
    }
  };

  return (
    <div>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="#" onClick={addBuyer}><BsPlusCircle /> Add Buyer</Breadcrumb.Item>
          <Breadcrumb.Item active>List Buyer</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Registration Number</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((buyer, index) => (
            <tr key={index}>
              <td>{index + 1 * (currentPage * 10 - 9)}</td>
              <td>{buyer.username}</td>
              <td>{buyer.email}</td>
              <td>{buyer.registrationNumber}</td>
              <td className="text-center">
                <Link href={`/buyers/${buyer._id}`}>
                  <BsPencil />
                </Link>
                &nbsp;
                <Link href="" onClick={() => handleDelete(buyer._id)}>
                  <BsTrash />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default DataList;
