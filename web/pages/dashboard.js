import React, { useRef } from "react";
import { useEffect, useRouter } from "next/router";
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import BarChart from "./chart";

const Dashboard = () => {
  const router = useRouter();

  const data = {
    /* data chart */
  };
  return (
    <Container>
      <BarChart data={data} />
    </Container>
  );
};

export default Dashboard;
