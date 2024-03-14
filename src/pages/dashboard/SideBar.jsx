import React, { useEffect, useState } from "react";

import {
  Accordion,
  Button,
  Card,
  Container,
  Form,
  FormControl,
  ListGroup,
  Nav,
  Navbar,
  NavDropdown,
  NavLink,
  Offcanvas,
} from "react-bootstrap";
import { Navigate, Navigation, useNavigate } from "react-router-dom";
import {
  AiFillAppstore,
  AiFillDatabase,
  AiOutlineRise,
  AiFillSignal,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
// import Contactlist from "../contact/Contactlist";
import logo from "../../assets/images/logo.png";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import baseURL from "../../Services/Url";
import { AgGridReact } from "ag-grid-react";
import AddAwards from "../Awards/AddAwards";

function SideBar({ Navigation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const handleClick = (e) => {
    // console.log(e);
    Navigation.navigate(`/list_out`, {
      data: e,
    });
  };
  let navigate = useNavigate();
  const [reloadPage, setReloadPage] = useState(1);
  const [rowData, setRowdata] = useState([]);
  useEffect(() => {
    axios({
      mathod: "GET",
      url: `${baseURL}/category`,
    })
      .then((res) => {
        if (res.status == 200) {
          // console.log(res.data);
          setRowdata(res.data.reverse());
          console.log(res.data,);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, [reloadPage]);

  return (
    <div>
      <div className="bg-light p-3">
        {/* <a href="/"> */}
        <img src={logo} className="m-auto logo" />
        {/* </a> */}
      </div>
      <div>
        {/* <p className=" cursor fs-5 ptagLink">
          <Link to="/dashboard">Dashboard </Link>
        </p> */}
        <p className=" cursor fs-5 ptagLink">
          <Link to="/ListRequirement" className="">
            List Requirement
          </Link>
        </p>
        <p className=" cursor fs-5 ptagLink">
          <Link to="/career-list" className="">
            Career{" "}
          </Link>
        </p>
        <p className=" cursor fs-5 ptagLink">
          <Link to="/blog-list" className="">
            Pr News{" "}
          </Link>
        </p>
        <p className=" cursor fs-5 ptagLink">
          <Link to="/markettrend-list" className="">
            Market Trends{" "}
          </Link>
        </p>
        <p className=" cursor fs-5 ptagLink">
          <Link to="/properties-list" className="">
            Properties{" "}
          </Link>
        </p>
        <p className=" cursor fs-5 ptagLink">
          <Link to="/CSR" className="">
            C.S.R{" "}
          </Link>
        </p>
       
        <p className=" cursor fs-5 ptagLink">
          <Link to="/award-list" className="">
            Awards{" "}
          </Link>
        </p>
        {/* <p className=" cursor fs-5">
          <Link to="/services-list" className="">
            Services{" "}
          </Link>
        </p> */}

        <p className=" cursor fs-5 ptagLink">
          <Link to="/leadership-list" className="">
            Our Team
          </Link>
        </p>

        <p className=" cursor fs-5 ptagLink">
          <Link to="/CorporateTeamList" className="">
            Corporate Team
          </Link>
        </p>

        <p className=" cursor fs-5 ptagLink">
          <Link to="/RetailTeamList" className="">
            Retail Team
          </Link>
        </p>

        <p className=" cursor fs-5 ptagLink">
          <Link to="/WerehouseTeamList" className="">
            Warehouse Team
          </Link>
        </p>

        <p className=" cursor fs-5 ptagLink">
          <Link to="/InvestmentTeamList" className="">
            Investment Team
          </Link>
        </p>

        <p className=" cursor fs-5 ptagLink">
          <Link to="/AddInteriorTeam" className="">
            Interior Team
          </Link>
        </p>

     

        <p className=" cursor fs-5 ptagLink">
          <Link to="/casestudy-list" className="">
            Case Study{" "}
          </Link>
        </p>

        {/* <p className=" cursor fs-5 ptagLink">
          <Link to="/ListLiferr" className="">
            Life @ RR
          </Link>
        </p> */}

        <p className=" cursor fs-5 ptagLink">
          <Link to="/ListTeamRR" className="">
            Team @ RR
          </Link>
        </p>

        {/* <p className=" cursor fs-5">
          <Link to="/propertyexpert-list" className="">
            Property Experts{" "}
          </Link>
        </p> */}

        <p className=" cursor fs-5 ptagLink">
          <Link to="/Contactus" className="">
            Contact Us
          </Link>
        </p>
        <p className=" cursor fs-5 ptagLink">
          <Link to="/feedback" className="">
            Feedback
          </Link>
        </p>
      </div>
    </div>
  );
}
// }

export default SideBar;
