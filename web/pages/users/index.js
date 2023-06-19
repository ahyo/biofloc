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
import {
  BsFillPlusCircleFill,
  BsPencil,
  BsPlus,
  BsPlusCircle,
  BsTrash,
  bsPencil,
  bsTrash,
} from "react-icons/bs";
import Link from "next/link";

const DataList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    const token = localStorage.getItem("token");
    try {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${config.API_URL}/api/users?page=${page}`,
        header
      );
      if (response.status == 200) {
        const { data } = response;
        setUsers(data.users);
        setTotalPages(data.totalPages);
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

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
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
        .delete(`${config.API_URL}/api/users/${id}`, header)
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>List Users</h3>
        <Button variant="primary" onClick={() => router.push("/users/add")}>
          <BsFillPlusCircleFill /> Tambah
        </Button>
      </div>
      <hr />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Is Admin</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="text-center">
                {index + 1 * (currentPage * 10 - 9)}
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin}</td>
              <td className="text-center">
                <Link href={`/buyers/${user._id}`}>
                  <BsPencil />
                </Link>
                &nbsp;
                <Link href="" onClick={() => handleDelete(user._id)}>
                  <BsTrash />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First onClick={handleFirstPage} />
        <Pagination.Prev onClick={handlePrevPage} />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
            item={false}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={handleNextPage} />
        <Pagination.Last onClick={handleLastPage} />
      </Pagination>
    </div>
  );
};

export default DataList;
