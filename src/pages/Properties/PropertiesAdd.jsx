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
import "./property.css";

function PropertiesAdd() {
  let p = {};
  const [reloadPage, setReloadPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [type, setType] = useState([]);
  const [location, setLocation] = useState([]);
  const [selects, setSelects] = useState({});
  const [addProducForm, setAddProductForm] = useState({
    heading: "",
    html: "",
    size: "",
    location: "",
    price: "",
    property_type: "",
    status: "",
    label: "",
    property_id: "",
    floors: "",
    distance_from_metro: "",
  });
  const [addProductFormErros, setAddProductFormErrors] = useState({
    heading: "",
    html: "",
    image: "",
    size: "",
    location: "",
    price: "",
    property_type: "",
    property_id: "",
    status: "",
    label: "",
    floors: "",
    distance_from_metro: "",
  });
  const [file, setFile] = useState({
    image: "",
  });
  const [fileErrors, setFileErrors] = useState({
    image: "",
  });

  const handlChange = (name, event) => {
    if (name == "type") {
      addProducForm.property_type = event;
    } else if (name == "location") {
      addProducForm.location = event;
    }
  };
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

  // property_types for properties
  useEffect(() => {
    axios({
      mathod: "GET",
      url: `${baseURL}/category/property_type`,
    })
      .then((res) => {
        if (res.status == 200) {
          setType(res.data);
          // console.log(res.data);
        }
      })
      .catch((err) => {});
  }, [reloadPage]);

  // property_locations for properties
  useEffect(() => {
    axios({
      mathod: "GET",
      url: `${baseURL}/category/property_location`,
    })
      .then((res) => {
        if (res.status == 200) {
          setLocation(res.data);
          // console.log(res.data);
        }
      })
      .catch((err) => {});
  }, [reloadPage]);

  /** Submit Form Dtata **/

  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();
  const [file4, setFile4] = useState();

  const handleFileChange1 = (e) => {
    if (e.target.files) {
      setFile1(e.target.files[0]);
    }
  };
  const handleFileChange2 = (e) => {
    if (e.target.files) {
      setFile2(e.target.files[0]);
    }
  };
  const handleFileChange3 = (e) => {
    if (e.target.files) {
      setFile3(e.target.files[0]);
    }
  };
  const handleFileChange4 = (e) => {
    if (e.target.files) {
      setFile4(e.target.files[0]);
    }
  };

  console.log(file.image, "==>");
  const handleSubmit = () => {
    setLoader(true);

    let formData = new FormData();
    formData.append("title", addProducForm.heading);
    formData.append("image", file.image);
    formData.append("image1", file1);
    formData.append("image2", file2);
    formData.append("image3", file3);
    formData.append("image4", file4);
    formData.append("description", addProducForm.html);
    formData.append("category", "properties");
    formData.append("size", addProducForm.size);
    formData.append("location", addProducForm.location);
    formData.append("price", addProducForm.price);
    formData.append("property_type", addProducForm.property_type);
    formData.append("property_id", addProducForm.property_id);
    formData.append("status", addProducForm.status);
    formData.append("label", addProducForm.label);
    formData.append("floors", addProducForm.floors);
    formData.append("distance_from_metro", addProducForm.distance_from_metro);

    // const token = '32c2483430c53f2eec280c7f1ba826f697e78ac7'
    // headers: {
    //   Authorization: `Bearer ${token}`
    // },
    axios({
      url: `${baseURL}/create_property`,
      method: "POST",
      data: formData,
    })
      .then((res) => {
        setLoader(true);
        if (res.status == 200) {
          setLoader(false);
          toast.success("Successfully Created Properties");
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
        } else if (err.response.status == 400) {
          toast.error(err.response.data.err || err.response.data.message);
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
    // }
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
              <div className="col-md-2"></div>
              <div className="col-md-2"></div>
              <div className="row my-2">
                <div className="col-md-4"></div>
                <div className="col-md-3">
                  <h3>
                    <b>Add Properties </b>
                  </h3>
                </div>
                <div className="col-md-4 text-end">
                  <button
                    type="button"
                    className="btn btn-outline-success mx-1"
                    disabled
                  >
                    <Link to="/properties-add">Add Properties </Link>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success mx-1"
                  >
                    <Link to="/properties-list"> Properties List</Link>
                  </button>
                </div>
              </div>
            </div>

            <div className="row m-auto my-3">
              <div className="col-md-1"></div>
              <div className="col-md-6">
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Properties Heading</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Properties Heading"
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
                    <Form.Label>size</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Size"
                      name="size"
                      value={addProducForm.size}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <span className="text-danger">
                      {addProductFormErros.exp}
                    </span>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>price</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Price"
                      name="price"
                      value={addProducForm.price}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <span className="text-danger">
                      {addProductFormErros.price}
                    </span>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>property_type</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="property_type"
                      name="property_type"
                      value={addProducForm.property_type}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <span className="text-danger">
                      {addProductFormErros.property_type}
                    </span>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>status</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="status"
                      name="status"
                      value={addProducForm.status}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <span className="text-danger">
                      {addProductFormErros.status}
                    </span>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>label</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="label"
                      name="label"
                      value={addProducForm.label}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <span className="text-danger">
                      {addProductFormErros.label}
                    </span>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>floors</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="floors"
                      name="floors"
                      value={addProducForm.floors}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <span className="text-danger">
                      {addProductFormErros.floors}
                    </span>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>distance_from_metro</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="distance_from_metro"
                      name="distance_from_metro"
                      value={addProducForm.distance_from_metro}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <span className="text-danger">
                      {addProductFormErros.distance_from_metro}
                    </span>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>propertyId</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="propertyId"
                      name="property_id"
                      value={addProducForm.property_id}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <span className="text-danger">
                      {addProductFormErros.property_id}
                    </span>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Location - City Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="location"
                      name="location"
                      value={addProducForm.location}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <span className="text-danger">
                      {addProductFormErros.location}
                    </span>
                  </Form.Group>
                </Row>
                <Row>
                  <label>Properties Text</label>
                  <MyStatefulEditor handleData={handleData} />
                  <span className="text-danger">
                    {addProductFormErros.html}
                  </span>
                </Row>
                <Row className="mb-3 mt-3">
                  <Form.Group as={Col}>
                    <Form.Label> Select Image 1</Form.Label>
                    <Form.Control
                      type="file"
                      placeholder="Product Heading"
                      className="w-75"
                      name="image"
                      value={addProducForm.image}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <Form.Text className="text-muted ">
                      <b>1050 * 650</b>
                    </Form.Text>
                    <span className="text-danger">
                      {addProductFormErros.image}
                    </span>
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-3">
                  <Form.Group as={Col}>
                    <Form.Label> Select Image 2</Form.Label>
                    <Form.Control
                      type="file"
                      className="w-75"
                      onChange={handleFileChange1}
                    />
                    <Form.Text className="text-muted ">
                      <b>1050 * 650</b>
                    </Form.Text>
                    <span className="text-danger">
                      {addProductFormErros.image}
                    </span>
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-3">
                  <Form.Group as={Col}>
                    <Form.Label> Select Image 3</Form.Label>
                    <Form.Control
                      type="file"
                      className="w-75"
                      onChange={handleFileChange2}
                    />
                    <Form.Text className="text-muted ">
                      <b>1050 * 650</b>
                    </Form.Text>
                    <span className="text-danger">
                      {addProductFormErros.image}
                    </span>
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-3">
                  <Form.Group as={Col}>
                    <Form.Label> Select Image 4</Form.Label>
                    <Form.Control
                      type="file"
                      className="w-75"
                      onChange={handleFileChange3}
                    />
                    <Form.Text className="text-muted ">
                      <b>1050 * 650</b>
                    </Form.Text>
                    <span className="text-danger">
                      {addProductFormErros.image}
                    </span>
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-3">
                  <Form.Group as={Col}>
                    <Form.Label> Select Image 5</Form.Label>
                    <Form.Control
                      type="file"
                      className="w-75"
                      onChange={handleFileChange4}
                    />
                    <Form.Text className="text-muted ">
                      <b>1050 * 650</b>
                    </Form.Text>
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
}

export default PropertiesAdd;
