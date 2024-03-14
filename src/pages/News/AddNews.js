import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import baseURL from "../../Services/Url";
import FirstNavbar from "../dashboard/FirstNavbar";
import SideBar from "../dashboard/SideBar";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import RichTextEditor from "react-rte";
import MyStatefulEditor from "../Components/RichText";

const AddNews = () => {
  /** State Management **/
  const [loader, setLoader] = useState(false);
  const [addProducForm, setAddProductForm] = useState({
    heading: "",
    html: "",
    url: "",
  });
  const [addProductFormErros, setAddProductFormErrors] = useState({
    heading: "",
    html: "",
    image: "",

    url: "",
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

  const handleData = (value) => {
    // setRichTextdata(value)
    setAddProductForm({
      ...addProducForm,
      ["html"]: value,
    });
    setAddProductFormErrors({
      ...addProductFormErros,
      ["html"]: null,
    });
  };

  /** Form Validation **/
  const handleValidation = () => {
    // const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const regText = /[A-Za-z]/;
    const newErros = {};
    const { heading, url, html, image } = addProducForm;
    if (!heading) {
      newErros.heading = "please enter news heading";
    } else if (heading && !regText.test(heading)) {
      newErros.heading = "news heading should be text";
    } else if (heading && heading.length > 50) {
      newErros.heading = "news heading should be belw 50 charecters";
    }

    // if (!text) {
    //     newErros.text = 'please enter news text'
    // } else if (text && !regText.test(text)) {
    //     newErros.text = 'news heading should be text'
    // } else if (text && text.length > 50) {
    //     newErros.text = 'news text should be belw 50 charecters'
    // }

    if (!html) {
      newErros.html = "please enter news text";
    }
    if (!url) {
      newErros.html = "please enter Url ";
    }

    if (!image) {
      newErros.image = "please select file";
    }
    return newErros;
  };

  /** Submit Form Dtata **/
  const handleSubmit = () => {
    const handleValidationObject = handleValidation();
    if (Object.keys(handleValidationObject).length > 0) {
      setAddProductFormErrors(handleValidationObject);
    } else {
      setLoader(true);
      let formData = new FormData();
      formData.append("title", addProducForm.heading);
      formData.append("image", file.image);
      formData.append("description", addProducForm.html);
      formData.append("url", addProducForm.url);
      formData.append("category", "news");

      // const token = '32c2483430c53f2eec280c7f1ba826f697e78ac7'
      // headers: {
      //   Authorization: `Bearer ${token}`
      // },

      axios({
        url: `${baseURL}/create`,
        method: "POST",
        data: formData,
      })
        .then((res) => {
          setLoader(true);
          if (res.status == 200) {
            setLoader(false);
            toast.success("Successfully Created news");
            setLoader(false);
            setAddProductForm({
              ...addProducForm,
              heading: "",
              text: "",
              image: "",
              url: "",
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
          setLoader(true);
          if (err.response.status == 401) {
            toast.error("Token is Expaired");
            setLoader(false);
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
              <div className="col-md-4"></div>
              <div className="col-md-3">
                <h3>
                  <b>Add News </b>
                </h3>
              </div>
              <div className="col-md-4 text-end">
                <button
                  type="button"
                  className="btn btn-outline-success mx-1"
                  disabled
                >
                  <Link to="/news-add">Add News </Link>
                </button>
                <button type="button" className="btn btn-outline-success mx-1">
                  <Link to="/news-list"> News List</Link>
                </button>
              </div>
            </div>

            <div className="row m-auto my-3">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>News Heading</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="News Heading"
                      name="heading"
                      value={addProducForm.heading}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <span className="text-danger">
                      {addProductFormErros.heading}
                    </span>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>News Url</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Url"
                      name="url"
                      value={addProducForm.url}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <span className="text-danger">
                      {addProductFormErros.url}
                    </span>
                  </Form.Group>
                </Row>
                <Row>
                  <label>News Text</label>
                  <MyStatefulEditor handleData={handleData} />
                  <span className="text-danger">
                    {addProductFormErros.html}
                  </span>
                </Row>
                <Row className="mb-3 mt-3">
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
                </Row>
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

export default AddNews;
