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

function LeadershipAdd() {
  const [loader, setLoader] = useState(false);
  const [addProducForm, setAddProductForm] = useState({
    heading: "",
    linkedin: "",
    text: "",
  });
  const [addProductFormErros, setAddProductFormErrors] = useState({
    heading: "",
    linkedin: "",
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
    if (event.target.name === "image") {
   
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
    setAddProductFormErrors({
      ...addProductFormErros,
      [event.target.name]: null,
    });
  };

  /** Form Validation **/
  const handleValidation = () => {
    const regText = /[A-Za-z]/;
    const newErrors = {};
    const { heading, text,  linkedin } = addProducForm;

    const{image} = file

    if (!heading) {
      newErrors.heading = "Please enter heading";
    } else if (heading && !regText.test(heading)) {
      newErrors.heading = "Heading should be text";
    } else if (heading && heading.length > 50) {
      newErrors.heading = "Heading should be below 50 characters";
    }

    if (!linkedin) {
      newErrors.linkedin = "Please enter linkedin";
    }

    if (!text) {
      newErrors.text = "Please enter text";
    } else if (text && !regText.test(text)) {
      newErrors.text = "Text should be text";
    } else if (text && text.length > 50) {
      newErrors.text = "Text should be below 50 characters";
    }

    if (!image) {
      newErrors.image = "Please select a file";
    }

    return newErrors;
  };

  /** Submit Form Data **/
  const handleSubmit = () => {
    const handleValidationObject = handleValidation();
    if (Object.keys(handleValidationObject).length > 0) {
      setAddProductFormErrors(handleValidationObject);
    } else {
      setLoader(true);
      let formData = new FormData();
      formData.append("name", addProducForm.heading);
      formData.append("image", file.image);
      formData.append("linkedin", addProducForm.linkedin);
      formData.append("description", addProducForm.text);
      formData.append("category", "leadership");

      axios({
        url: `${baseURL}create`,
        method: "POST",
        data: formData,
      })
        .then((res) => {
          if (res.status === 200) {
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
          if (err.response.status === 401) {
            toast.error("Token has expired");
            setLoader(false);
            setAddProductForm({
              ...addProducForm,
              name: "",
              designation: "",
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
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        transition={Zoom}
        delay={500}
        limit={1}
      />
      <div>
        <div className="sidebar">
          <SideBar />
        </div>

        <div className="content">
          <div className="container">
            <FirstNavbar />

            <div className="row my-2">
              <div className="col-md-4"></div>
              <div className="col-md-3">
                <h3>
                  <b>Add Team Member</b>
                </h3>
              </div>
              <div className="col-md-4 text-end">
                <button
                  type="button"
                  className="btn btn-outline-success mx-1"
                  disabled
                >
                  <Link to="/leadership-add">Add Team Member </Link>
                </button>
                <button type="button" className="btn btn-outline-success mx-1">
                  <Link to="/leadership-list"> Our Team List</Link>
                </button>
              </div>
            </div>

            <div className="row m-auto my-3">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Leadership Heading</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Leadership name"
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
                    <Form.Label>Leadership linkedin url</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Leadership linkedin"
                      name="linkedin"
                      value={addProducForm.linkedin}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <span className="text-danger">
                      {addProductFormErros.linkedin}
                    </span>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Leadership Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Leadership Description"
                    name="text"
                    value={addProducForm.text}
                    onChange={handleChange}
                    autoComplete="off"
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
                      <b>390 * 360</b>
                    </Form.Text>
                    <span className="text-danger">
                      {addProductFormErros.image}
                    </span>
                  </Form.Group>
                </Row>

                <div className="text-center m-auto my-2">
                  {loader === false && (
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  )}
                  {loader === true && (
                    <Spinner animation="border" variant="Primary" />
                  )}
                </div>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadershipAdd;
