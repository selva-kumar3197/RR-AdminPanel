import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import baseURL from "../../Services/Url";
import FirstNavbar from "../dashboard/FirstNavbar";
import SideBar from "../dashboard/SideBar";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { Axios } from "axios";
import RichTextEditor from "react-rte";
import { useEffect } from "react";
import Select from "react-select";

const AddTeamRR = () => {
  /** State Management **/
  const [loader, setLoader] = useState(false);
  const [addProducForm, setAddProductForm] = useState({
    heading: "",
    text: "",
  });
  const [addProductFormErros, setAddProductFormErrors] = useState({
    heading: "",
    text: "",
    image: "",
  });
  const [file, setFile] = useState({
    image: "",
  });
  const [fileErrors, setFileErrors] = useState({
    image: "",
  });

  /** handle Change **/
  const handleChange = (event) => {
    if (event.target.name == "image") {
      setFile({
        ...file,
        [event.target.name]: event?.target?.files[0],
      });
      setFileErrors({
        ...file,
        image: "",
      });
    } else {
      setAddProductForm({
        ...addProducForm,
        [event.target.name]: event.target.value,
      });
    }
    setAddProductForm({
      ...addProducForm,
      [event.target.name]: event.target.value,
    });
    setAddProductFormErrors({
      ...addProductFormErros,
      [event.target.name]: null,
    });
  };

  console.log(file.image, "file==>");
  /** Form Validation **/
  const handleValidation = () => {
    // const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const regText = /[A-Za-z]/;
    const newErros = {};
    const { heading, text, image } = addProducForm;
    // if (!heading) {
    //   newErros.heading = "please enter blog heading";
    // } else if (heading && !regText.test(heading)) {
    //   newErros.heading = "blog heading should be text";
    // } else if (heading && heading.length > 50) {
    //   newErros.heading = "blog heading should be belw 50 charecters";
    // }

    // if (!text) {
    //   newErros.text = "please enter blog text";
    // } else if (text && !regText.test(text)) {
    //   newErros.text = "blog heading should be text";
    // } else if (text && text.length > 50) {
    //   newErros.text = "blog text should be belw 50 charecters";
    // }

    // if (!image) {
    //   newErros.image = "please select file";
    // }
    return newErros;
  };

  const [title, setTitle] = useState();

  /** Submit Form Dtata **/
  const handleSubmit = () => {
    const handleValidationObject = handleValidation();
    if (Object.keys(handleValidationObject).length > 0) {
      setAddProductFormErrors(handleValidationObject);
    } else {
      console.log(file.image, "file.image==>");
      setLoader(true);

      let formData = new FormData();
      formData.append("image", file.image);
      formData.append("title_id", BranchNameData.id);
      formData.append("title", BranchNameData.label);
      formData.append("category", "team@rr");

      console.log(formData, "form data");
      console.log(BranchNameData.id, "BranchNameData.id");
      axios({
        url: `${baseURL}/create`,
        method: "POST",
        data: formData,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res, "resres ==>");
            toast.success("Successfully Created blogs");
            setLoader(false);
            setAddProductForm({
              ...addProducForm,
              heading: "",
              text: "",
              image: "",
            });
            setFile({
              ...file,
              image: "",
            });
            setFileErrors({
              ...fileErrors,
              image: "",
            });
          }
        })
        .catch((err) => {
          if (err.response.status == 401) {
            toast.error("Token is Expaired");
            setLoader(false);
            setAddProductForm({
              ...addProducForm,
              name: "",
              disignation: "",
            });
            setFile({
              ...file,
              image: "",
            });
            setFileErrors({
              ...fileErrors,
              image: "",
            });
          }
        });
    }
  };

  const [categoryData, setCategoryData] = useState([]);

  console.log(categoryData.title, "categoryData ==>");
  const Category = async () => {
    axios({
      mathod: "GET",
      url: `${baseURL}/category/team@rr_category`,
    })
      .then((res) => {
        if (res.status == 200) {
          setCategoryData(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  useEffect(() => {
    Category();
  }, []);

  const handelCategorySelect = (e) => {
    console.log(e.value, "eeee");
  };

  const [areaOptionDataName, setAreaOptionDataName] = useState([]);
  const [BranchNameData, setBranchNameData] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const handleBranchName = (e) => {
    console.log(e.label, "title==>");
    setBranchNameData(e);
    setCategoryError("");
  };
  useEffect(() => {
    axios({
      mathod: "GET",
      url: `${baseURL}/category/team@rr_category`,
    })
      .then((res) => {
        if (res.status == 200) {
          // setRowdata(res.data)
          const areaData = [];
          const areaMapData = res.data.map((ele, ind) => {
            areaData.push({
              label: ele.title,
              value: ele.title,
              id: ele.id,
            });
          });
          setAreaOptionDataName(areaData);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  console.log(title, "title");
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        transition={Zoom}
        delay={500}
        limit={1}
      />{" "}
      <div>
        <div class="sidebar">
          <SideBar />
        </div>

        <div class="content">
          <div className="container">
            <FirstNavbar />

            <div className="row my-2">
              <div className="col-md-3">
                <h3>
                  <b>Add Team @ RR </b>
                </h3>
              </div>

              <div className="col-md-9 text-end">
                <button
                  type="button"
                  className="btn btn-outline-success mx-1"
                  disabled
                >
                  <Link to="/AddTeamRR">Add Team @ RR </Link>
                </button>
                <button type="button" className="btn btn-outline-success mx-1">
                  <Link to="/ListTeamRR"> Team @ RR List</Link>
                </button>

                <button type="button" className="btn btn-outline-success mx-1">
                  <Link to="/CreateCategoryTeam"> Create Category</Link>
                </button>
              </div>
            </div>

            <div className="row m-auto my-3">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Select Category</Form.Label>
                  <Select
                    options={areaOptionDataName}
                    onChange={(e) => handleBranchName(e)}
                  />
                  <span className="text-danger">
                    {addProductFormErros.text}
                  </span>
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label> Select Image</Form.Label>
                    <Form.Control
                      type="file"
                      placeholder="Product Heading"
                      className="w-50"
                      name="image"
                      value={addProducForm.image}
                      onChange={handleChange}
                      autoComplete="off"
                    />

                    <Form.Text className="text-muted ">
                      <b>400 * 350</b>
                    </Form.Text>
                    <span className="text-danger">
                      {addProductFormErros.image}
                    </span>
                  </Form.Group>
                </Row>

                {/* <RichTextEditor
                                ></RichTextEditor> */}
                {/* <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label> Select Image</Form.Label>
                    <Form.Control
                      type="file"
                      placeholder="Product Heading"
                      className="w-50"
                      name="image"
                      value={addProducForm.image}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <span className="text-danger">
                      {addProductFormErros.image}
                    </span>
                  </Form.Group>
                </Row> */}
                <div className="text-center m-auto my-2">
                  {loader == false && (
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  )}
                  {loader == true && (
                    <Spinner animation="border" variant="Primary" />
                  )}
                </div>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeamRR;
