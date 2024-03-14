import axios from "axios";
import { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Container,
  Form,
  FormControl,
  ListGroup,
  Nav,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import {
  AiFillAppstore,
  AiFillDatabase,
  AiOutlineRise,
  AiFillSignal,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import baseURL from "../../Services/Url";
// import Contactlist from "../contact/Contactlist";
import logo from "./../../assets/images/logo.png";
import FirstNavbar from "./FirstNavbar";
import SideBar from "./SideBar";
export default function Main() {
  const [countList, setCountList] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      axios({
        mathod: "GET",
        url: `${baseURL}/count`,
      })
        .then((res) => {
          if (res.status == 200) {
            setCountList(res?.data);
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
    fetchMyAPI();
  }, []);
  return (
    <>
      <div>
        <div class="sidebar">
          <SideBar />
        </div>

        <div class="content">
          <div className="container">
            <FirstNavbar />
            <div className="row my-1">
              {countList.map((ele) => (
                <div className="col-md-4 my-1">
                  <Card className="">
                    <Card.Body>
                      <Card.Title className="fs-2">
                        <div className="row">
                          <div className="col-md-9">
                            <p className="my-0 py-0">
                              {" "}
                              <b>
                                {" "}
                                {/* {ele._id == "casestudy" ? (
                                  <b>Case study</b>
                                ) : (
                                  ""
                                )} */}
                                {ele._id}
                              </b>{" "}
                            </p>
                          </div>
                          <div className="col-md-3">
                            <AiOutlineShoppingCart className="fs-1" />
                          </div>
                        </div>
                      </Card.Title>
                      <Card.Text>
                        <p className="fs-4 my-0 py-0">
                          {" "}
                          <b>{ele.count} </b> <b>{ele.count} </b>{" "}
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>

            <div className="row"></div>
          </div>
        </div>
      </div>
    </>
  );
}
