import React, { useEffect, useState } from "react";
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
import "../Properties/property.css";

function CSRAdd() {
  let p = {};
  const [reloadPage, setReloadPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [type, setType] = useState([]);
  const [location, setLocation] = useState([]);
  const [selects, setSelects] = useState({});

  const [addCSRForm, setAddCSRForm] = useState({
    description: "",
    title: "",
    file: null,
    file2: null,
    file3: null,
    file4: null,
    file5: null,
    file6: null,
    file7: null,
    file8: null,
  });

  const [addCSRFormErrors, setAddCSRFormErrors] = useState({
    description: "",
    title: "",
    file: "",
    file2: "",
    file3: "",
    file4: "",
    file5: "",
    file6: "",
    file7: "",
    file8: "",
  });

  const handleSubmit = async () => {
    const validateFormObject = validateForm();
    if (Object.keys(validateFormObject).length > 0) {
      setAddCSRFormErrors(validateFormObject);
    } else {
      setLoader(true);
      let formData = new FormData();
      formData.append("category", "csr");
      formData.append("title", addCSRForm.title);
      formData.append("description", addCSRForm.description);

      if (addCSRForm.file) formData.append("image", addCSRForm.file);
      if (addCSRForm.file2) formData.append("image1", addCSRForm.file2);
      if (addCSRForm.file3) formData.append("image2", addCSRForm.file3);
      if (addCSRForm.file4) formData.append("image3", addCSRForm.file4);
      if (addCSRForm.file5) formData.append("image4", addCSRForm.file5);
      if (addCSRForm.file6) formData.append("image5", addCSRForm.file6);
      if (addCSRForm.file7) formData.append("image6", addCSRForm.file7);
      if (addCSRForm.file8) formData.append("image7", addCSRForm.file8);
      try {
        const res = await axios.post(baseURL + "csr", formData);
        if (res.status === 200) {
          setLoader(false);
          toast.success("CSR added Successfully");
          handleClear();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "title" || name === "description") {
      setAddCSRForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setAddCSRFormErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    } else {
      setAddCSRForm((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
      setAddCSRFormErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  const handleClear = () => {
    setAddCSRForm({
      description: "",
      title: "",
      file: null,
      file2: null,
      file3: null,
      file4: null,
      file5: null,
      file6: null,
      file7: null,
      file8: null,
    });
    setAddCSRFormErrors({
      description: "",
      title: "",
      file: "",
      file2: "",
      file3: "",
      file4: "",
      file5: "",
      file6: "",
      file7: "",
      file8: "",
    });

    // Reset file inputs to null
    document.getElementById("file-input").value = null;
    document.getElementById("file2-input").value = null;
    document.getElementById("file3-input").value = null;
    document.getElementById("file4-input").value = null;
    document.getElementById("file5-input").value = null;
    document.getElementById("file6-input").value = null;
    document.getElementById("file7-input").value = null;
    document.getElementById("file8-input").value = null;
  };

  const validateForm = () => {
    let errors = {};
    if (addCSRForm.title.trim() === "") {
      errors.title = "Title is required";
    }
    if (addCSRForm.description.trim() === "") {
      errors.description = "Description is required";
    }
    return errors;
  };

  return (
    <>
      <FirstNavbar />
      <ToastContainer transition={Zoom} />
      <Row className="admin-content">
        <Col sm={3}>
          <SideBar />
        </Col>
        <Col sm={9}>
          <div className="admin-border">
            <div className="admin-card">
              <div className="row">
                <div className="col-lg-12">
                  <div className="property-c">
                    <h1 className="property-h1">Add CSR</h1>
                    <div className="admin-form">
                      <Form>
                        <Form.Group controlId="title">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            name="title"
                            placeholder="Enter Title"
                            value={addCSRForm.title}
                            onChange={handleChange}
                            isInvalid={!!addCSRFormErrors.title}
                          />
                          <Form.Control.Feedback type="invalid">
                            {addCSRFormErrors.title}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="description">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            name="description"
                            placeholder="Enter Description"
                            value={addCSRForm.description}
                            onChange={handleChange}
                            isInvalid={!!addCSRFormErrors.description}
                          />
                          <Form.Control.Feedback type="invalid">
                            {addCSRFormErrors.description}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="file">
                          <Form.Label>Image 1</Form.Label>
                          <Form.Control
                          id="file-input"
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={handleChange}
                            isInvalid={!!addCSRFormErrors.file}
                          />
                          <Form.Control.Feedback type="invalid">
                            {addCSRFormErrors.file}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="file2">
                          <Form.Label>Image 2</Form.Label>
                          <Form.Control
                          id="file2-input"

                            type="file"
                            name="file2"
                            accept="image/*"
                            onChange={handleChange}
                            isInvalid={!!addCSRFormErrors.file2}
                          />
                          <Form.Control.Feedback type="invalid">
                            {addCSRFormErrors.file2}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="file3">
                          <Form.Label>Image 3</Form.Label>
                          <Form.Control
                          id="file3-input"

                            type="file"
                            name="file3"
                            accept="image/*"
                            onChange={handleChange}
                            isInvalid={!!addCSRFormErrors.file3}
                          />
                          <Form.Control.Feedback type="invalid">
                            {addCSRFormErrors.file3}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="file4">
                          <Form.Label>Image 4</Form.Label>
                          <Form.Control
                          id="file4-input"

                            type="file"
                            name="file4"
                            accept="image/*"
                            onChange={handleChange}
                            isInvalid={!!addCSRFormErrors.file4}
                          />
                          <Form.Control.Feedback type="invalid">
                            {addCSRFormErrors.file4}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="file5">
                          <Form.Label>Image 5</Form.Label>
                          <Form.Control
                          id="file5-input"

                            type="file"
                            name="file5"
                            accept="image/*"
                            onChange={handleChange}
                            isInvalid={!!addCSRFormErrors.file5}
                          />
                          <Form.Control.Feedback type="invalid">
                            {addCSRFormErrors.file5}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="file6">
                          <Form.Label>Image 6</Form.Label>
                          <Form.Control
                          id="file6-input"

                            type="file"
                            name="file6"
                            accept="image/*"
                            onChange={handleChange}
                            isInvalid={!!addCSRFormErrors.file6}
                          />
                          <Form.Control.Feedback type="invalid">
                            {addCSRFormErrors.file6}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="file7">
                          <Form.Label>Image 7</Form.Label>
                          <Form.Control
                          id="file7-input"

                            type="file"
                            name="file7"
                            accept="image/*"
                            onChange={handleChange}
                            isInvalid={!!addCSRFormErrors.file7}
                          />
                          <Form.Control.Feedback type="invalid">
                            {addCSRFormErrors.file7}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="file8">
                          <Form.Label>Image 8</Form.Label>
                          <Form.Control
                          id="file8-input"

                            type="file"
                            name="file8"
                            accept="image/*"
                            onChange={handleChange}
                            isInvalid={!!addCSRFormErrors.file8}
                          />
                          <Form.Control.Feedback type="invalid">
                            {addCSRFormErrors.file8}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <div className="property-button">
                          <Button
                            variant="secondary"
                            onClick={handleClear}
                            className="cancel-button"
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            onClick={handleSubmit}
                            className="add-button"
                          >
                            {loader ? (
                              <>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Loading...</span>
                              </>
                            ) : (
                              "Add"
                            )}
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default CSRAdd;
