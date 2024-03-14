import React, { useEffect, useState } from "react";
import FirstNavbar from "../dashboard/FirstNavbar";
import SideBar from "../dashboard/SideBar";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import baseURL from "../../Services/Url";
import { Modal, Button, Row, Form, Col, Spinner } from "react-bootstrap";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import MyStatefulEditor from "../Components/RichText";
import { AgGridReact } from "ag-grid-react";
import htmlToDraft from "html-to-draftjs";

function CSRList() {
  const [ProductList, setPoductList] = useState([]);
  const [reloadPage, setReloadPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [rowData, setRowdata] = useState();

  const [updateMemberForm, setupdateMemberForm] = useState({
    heading: "",
    html: "",
    size: "",
    location: "",
    price: "",
    property_type: "",
    status: "",
    image: "",
    label: "",
    floors: "",
    property_id: "",
    distance_from_metro: "",
  });
  const [file, setFile] = useState({
    image: "",
  });
  const [fileErrors, setFileErrors] = useState({
    image: "",
  });

  const [updateMemberFormErrors, setupdateMemberFormErrors] = useState({
    heading: "",
    html: "",
    size: "",
    location: "",
    price: "",
    property_type: "",
    image: "",
    status: "",
    label: "",
    floors: "",
    property_id: "",
    distance_from_metro: "",
  });

  useEffect(() => {
    PropertyListApi();
  }, [reloadPage]);

  /** Product List **/
  const PropertyListApi = () => {
    axios({
      mathod: "GET",
      url: `${baseURL}category/properties`,
    })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setRowdata(res.data.reverse());
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  /* list */
  const [deleleId, setDelelete] = useState("");
  const handleDelete = (ele) => {
    setShowDelete(true);
    setDelelete(ele);
  };

  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteClose = () => {
    setShowDelete(false);
  };

  const handleDeleteClear = () => {
    setShowDelete(false);
  };

  const handleDeleteSubmit = () => {
    setLoader(true);
    axios
      .delete(`${baseURL}/${deleleId.id}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success("Successfully Deleted");
          setLoader(false);
          setReloadPage(reloadPage + 1);
          setShowDelete(false);
        }
      })
      .catch((err) => {
        if (err.response.status == 401) {
          toast.error("Token is Expaired");
          setLoader(false);
          setReloadPage(reloadPage + 1);
          setShowDelete(false);
        }
      });
  };

  const handleClose = () => {
    setShow(false);
  };

  /* update */
  const [updateID, setUpdateId] = useState("");
  const [show, setShow] = useState(false);

  /** handle Change **/

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

  const handleChange = (event) => {
    console.log(event.target.files);
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
      setupdateMemberForm({
        ...updateMemberForm,
        [event.target.name]: event.target.value,
      });
    }
    setupdateMemberFormErrors({
      ...updateMemberFormErrors,
      [event.target.name]: null,
    });
  };

  const handleUpdate = (ele) => {
    setShow(true);
    setupdateMemberForm({
      ...updateMemberForm,
      heading: ele.title,
      text: ele.description,
      image: "",
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      size: ele.size,
      location: ele.location,
      price: ele.price,
      property_type: ele.property_type,
      property_id: ele.property_id,
      status: ele.status,
      label: ele.label,
      floors: ele.floors,
      distance_from_metro: ele.distance_from_metro,
    });
    setShow(true);
    setUpdateId(ele);
  };

  const handleSubmit = () => {
    setLoader(true);
    let formData = new FormData();
    formData.append("category", "properties");

    if (updateMemberForm.heading) {
      formData.append("title", updateMemberForm.heading);
    }

    if (updateMemberForm.text) {
      formData.append("description", updateMemberForm.text);
    }

    if (updateMemberForm.size) {
      formData.append("size", updateMemberForm.size);
    }
    if (updateMemberForm.property_id) {
      formData.append("property_id", updateMemberForm.property_id);
    }

    if (updateMemberForm.location) {
      formData.append("location", updateMemberForm.location);
    }
    if (updateMemberForm.price) {
      formData.append("price", updateMemberForm.price);
    }
    if (updateMemberForm.property_type) {
      formData.append("property_type", updateMemberForm.property_type);
    }
    if (updateMemberForm.status) {
      formData.append("status", updateMemberForm.status);
    }
    if (updateMemberForm.label) {
      formData.append("label", updateMemberForm.label);
    }
    if (updateMemberForm.floors) {
      formData.append("floors", updateMemberForm.floors);
    }
    if (updateMemberForm.distance_from_metro) {
      formData.append(
        "distance_from_metro",
        updateMemberForm.distance_from_metro
      );
    }

    if (file.image) {
      formData.append("image", file.image);
    }

    if (file1) {
      formData.append("image1", file1);
    }
    if (file2) {
      formData.append("image2", file2);
    }

    if (file3) {
      formData.append("image3", file3);
    }
    if (file4) {
      formData.append("image4", file4);
    }

    // const token = '32c2483430c53f2eec280c7f1ba826f697e78ac7'
    // headers: {
    //   Authorization: `Bearer ${token}`
    // },
    axios({
      url: `${baseURL}/property/${updateID.id}`,
      method: "PUT",
      data: formData,
    })
      .then((res) => {
        if (res.status == 200) {
          setReloadPage(reloadPage + 1);
          setShow(false);
          toast.success("Successfully Updated Meamber");
          setLoader(false);
          setupdateMemberForm({
            ...updateMemberForm,
            name: "",
            surname: "",
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
      })
      .catch((err) => {
        if (err.response.status == 401) {
          setReloadPage(reloadPage + 1);
          setShow(false);
          toast.error("Token is Expaired");
          setLoader(false);
          setupdateMemberForm({
            ...updateMemberForm,
            name: "",
            surname: "",
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

  const handleClear = () => {
    setupdateMemberForm({
      ...updateMemberForm,
      heading: "",
      html: "",
      size: "",
      location: "",
      price: "",
      image: "",
      property_type: "",
      status: "",
      label: "",
      floors: "",
      distance_from_metro: "",
      property_id: "",
    });
    setFile({
      ...file,
      image: "",
    });
    setFileErrors({
      ...fileErrors,
      image: "",
    });
  };
  const handleData = (value) => {
    // setRichTextdata(value)
    setupdateMemberForm({
      ...updateMemberForm,
      ["text"]: value,
    });
    setupdateMemberFormErrors({
      ...updateMemberFormErrors,
      ["text"]: null,
    });
  };

  /***** Pagenation Table******/
  const rowHeight = 50;
  const DefaultColumnSetting = {
    sortable: true,
    filter: true,
    autoHeight: true,

    floatingFilter: true,
    flex: 1,
    resizable: true,
    minWidth: 120,
  };

  const [colDefs, setColDefs] = useState([
    {
      headerName: "Id",
      valueGetter: "node.rowIndex + 1",
      filter: true,
      lockPosition: true,
      wrapText: true,

    },
    {
      headerName: "Property Heading",
      filter: true,
      field: "title",
      wrapText: true,

    },
    {
      headerName: "size",
      filter: true,
      field: "size",
      wrapText: true,

    },
    {
      headerName: "propertyId",
      filter: true,
      field: "property_id",
      wrapText: true,

    },
    {
      headerName: "Location",
      filter: true,
      field: "location",
      wrapText: true,

    },
    {
      headerName: "price",
      filter: true,
      field: "price",
      wrapText: true,

    },
    {
      headerName: "property_type",
      filter: true,
      field: "property_type",
      wrapText: true,

    },
    {
      headerName: "status",
      filter: true,
      field: "status",
      wrapText: true,

    },
    {
      headerName: "label",
      filter: true,
      field: "label",
      wrapText: true,

    },
    {
      headerName: "floors",
      filter: true,
      field: "floors",
      wrapText: true,

    },
    {
      headerName: "distance_from_metro",
      filter: true,
      field: "distance_from_metro",
      wrapText: true,

    },
    {
      headerName: "properties description",
      filter: true,
      wrapText: true,

      cellRendererFramework: (params) => (
        <center>
          <p>
            {JSON.stringify(
              htmlToDraft(params.data.description).contentBlocks[0].text
            )}
          </p>
        </center>
      ),
    },
    {
      headerName: "Image 1",
      filter: false,
      cellRendererFramework: (params) => (
        <center>
          <img
            style={{ width: "50px", height: "50px" }}
            src={params.data.image}
          />
        </center>
      ),
    },
    {
      headerName: "Image 2",
      filter: false,
      cellRendererFramework: (params) => (
        <center>
          <img
            style={{ width: "50px", height: "50px" }}
            src={params.data.image1}
          />
        </center>
      ),
    },
    {
      headerName: "Image 3",
      filter: false,
      cellRendererFramework: (params) => (
        <center>
          <img
            style={{ width: "50px", height: "50px" }}
            src={params.data.image2}
          />
        </center>
      ),
    },
    {
      headerName: "Image 4",
      filter: false,
      cellRendererFramework: (params) => (
        <center>
          <img
            style={{ width: "50px", height: "50px" }}
            src={params.data.image3}
          />
        </center>
      ),
    },
    {
      headerName: "Image 5",
      filter: false,
      cellRendererFramework: (params) => (
        <center>
          <img
            style={{ width: "50px", height: "50px" }}
            src={params.data.image4}
          />
        </center>
      ),
    },
    {
      headerName: "Update",
      filter: false,
      cellRendererFramework: (params) => (
        <center onClick={() => handleUpdate(params.data)}>
          <button type="button" class="btn btn-outline-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
          </button>
        </center>
      ),
    },
    {
      headerName: "Delete",
      filter: false,
      cellRendererFramework: (params) => (
        <center onClick={() => handleDelete(params.data)}>
          <button type="button" class="btn btn-outline-danger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </button>
        </center>
      ),
    },
  ]);
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        transition={Zoom}
        delay={500}
        limit={1}
      />
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Property</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Modal.Body>
            <div className="d-flex">
              <div style={{ marginLeft: "50px" }}>
                <Button variant="secondary" onClick={handleDeleteClear}>
                  Cancel
                </Button>
              </div>
              <div style={{ marginLeft: "150px" }}>
                {loader == false && (
                  <Button variant="danger" onClick={handleDeleteSubmit}>
                    Delete
                  </Button>
                )}
                {loader == true && (
                  <Spinner animation="border" variant="Primary" />
                )}
              </div>
            </div>
          </Modal.Body>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12">
            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="heading"
                  value={updateMemberForm.heading}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {updateMemberFormErrors.heading}
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> size</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="size"
                  name="size"
                  value={updateMemberForm.size}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {updateMemberFormErrors.size}
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="location"
                  name="location"
                  value={updateMemberForm.location}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {updateMemberFormErrors.location}
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="price"
                  name="price"
                  value={updateMemberForm.price}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {updateMemberFormErrors.price}
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> propertyId</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="propertyId"
                  name="property_id"
                  value={updateMemberForm.property_id}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {updateMemberFormErrors.property_id}
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> property_type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="property_type"
                  name="property_type"
                  value={updateMemberForm.property_type}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {updateMemberFormErrors.property_type}
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="status"
                  name="status"
                  value={updateMemberForm.status}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {updateMemberFormErrors.status}
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> label</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="label"
                  name="label"
                  value={updateMemberForm.label}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {updateMemberFormErrors.label}
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> floors</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="floors"
                  name="floors"
                  value={updateMemberForm.floors}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {updateMemberFormErrors.floors}
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> distance_from_metro</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="distance_from_metro"
                  name="distance_from_metro"
                  value={updateMemberForm.distance_from_metro}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {updateMemberFormErrors.distance_from_metro}
                </span>
              </Form.Group>
            </Row>
            <Row></Row>

            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> Select Image 1</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Product Heading"
                  className="w-50"
                  name="image"
                  value={updateMemberForm.image}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {updateMemberFormErrors.image}
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> Select Image 2</Form.Label>
                <Form.Control
                  type="file"
                  className="w-50"
                  onChange={handleFileChange1}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {updateMemberFormErrors.image}
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> Select Image 3</Form.Label>
                <Form.Control
                  type="file"
                  className="w-50"
                  onChange={handleFileChange2}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {updateMemberFormErrors.image}
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> Select Image 4</Form.Label>
                <Form.Control
                  type="file"
                  className="w-50"
                  onChange={handleFileChange3}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {updateMemberFormErrors.image}
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> Select Image 5</Form.Label>
                <Form.Control
                  type="file"
                  className="w-50"
                  onChange={handleFileChange4}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {updateMemberFormErrors.image}
                </span>
              </Form.Group>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          {loader == false && (
            <Button variant="primary" onClick={handleSubmit}>
              Update
            </Button>
          )}
          {loader == true && <Spinner animation="border" variant="Primary" />}
        </Modal.Footer>
      </Modal>
      <div>
        {/* <Spinner animation="border" variant="Primary" size="sm" /> */}
        <div class="sidebar">
          <SideBar />
        </div>

        <div class="content">
          <div className="container ">
            <FirstNavbar />
            <div className="row my-2">
              <div className="col-md-4">
                <h3>
                  <b>All CSR List</b>
                </h3>
              </div>

              <div className="col-md-8 text-end">
                <button type="button" className="btn btn-outline-success mx-1">
                  <Link to="/csr-add">Add CSR </Link>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success mx-1"
                  disabled
                >
                  <Link to="/csr-list"> CSR List</Link>
                </button>
                <button type="button" className="btn btn-outline-success mx-1">
                  <Link to="/Property_enquiry">CSR Enquiry</Link>
                </button>
              </div>
            </div>
            <div
              className="ag-theme-alpine"
              style={{ height: "75vh", width: "100%" }}
            >
              <AgGridReact
                rowHeight={rowHeight}
                // columnDefs={columns}
                columnDefs={colDefs}
                defaultColDef={DefaultColumnSetting}
                pagination={true}
                paginationPageSize={25}
                // onGridReady={onGridReady}
                rowData={rowData}
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CSRList;
