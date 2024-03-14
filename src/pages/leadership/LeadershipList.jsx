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
import { AgGridReact } from "ag-grid-react";

function LeadershipList() {
  const [reloadPage, setReloadPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [rowData, setRowData] = useState([]);

  const [updateMemberForm, setUpdateMemberForm] = useState({
    heading: "",
    text: "",
    image: "",
    linkedin: "", // Added the missing field
  });

  const [file, setFile] = useState({
    image: "",
  });

  const [fileErrors, setFileErrors] = useState({
    image: "",
  });

  const [updateMemberFormErrors, setUpdateMemberFormErrors] = useState({
    heading: "",
    text: "",
    image: "",
    linkedin: "", // Added the missing field
  });

  useEffect(() => {
    productsListApi();
  }, [reloadPage]);

  const productsListApi = () => {
    axios
      .get(`${baseURL}category/leadership`)
      .then((res) => {
        if (res.status === 200) {
          setRowData(res.data);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const [deleteId, setDeleteId] = useState("");
  const handleDelete = (ele) => {
    setShowDelete(true);
    setDeleteId(ele);
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
      .delete(`${baseURL}/${deleteId.id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully Deleted");
          setLoader(false);
          setReloadPage(reloadPage + 1);
          setShowDelete(false);
        }
      })
      .catch((err) => {
        console.log(err, "222");
        if (err.response.status === 401) {
          toast.error("Token is Expired");
          setLoader(false);
          setReloadPage(reloadPage + 1);
          setShowDelete(false);
        }
      });
  };

  const handleClose = () => {
    setShow(false);
  };

  const [updateID, setUpdateId] = useState("");
  const [show, setShow] = useState(false);

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
      setUpdateMemberForm({
        ...updateMemberForm,
        [event.target.name]: event.target.value,
      });
    }
    setUpdateMemberFormErrors({
      ...updateMemberFormErrors,
      [event.target.name]: null,
    });
  };

  const handleUpdate = (ele) => {
    setShow(true);
    setUpdateMemberForm({
      ...updateMemberForm,
      heading: ele.name,
      text: ele.description,
      image: "",
      linkedin: ele.linkedin, // Set the value for linkedin field
    });
    setUpdateId(ele);
  };

  const handleSubmit = () => {
    setLoader(true);
    let formData = new FormData();
    formData.append("category", "leadership");

    if (updateMemberForm.heading) {
      formData.append("name", updateMemberForm.heading);
    }

    if (file.image) {
      formData.append("images", file.image);
    }

    if (updateMemberForm.text) {
      formData.append("description", updateMemberForm.text);
    }

    if (updateMemberForm.linkedin) {
      formData.append("linkedin", updateMemberForm.linkedin);
    }

    axios({
      url: `${baseURL}${updateID.id}`,
      method: "PUT",
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          setReloadPage(reloadPage + 1);
          setShow(false);
          toast.success("Successfully Updated Member");
          setLoader(false);
          setUpdateMemberForm({
            heading: "",
            text: "",
            image: "",
            linkedin: "",
          });
          setFile({
            image: "",
          });
          setFileErrors({
            image: "",
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setReloadPage(reloadPage + 1);
          setShow(false);
          toast.error("Token is Expired");
          setLoader(false);
          setUpdateMemberForm({
            heading: "",
            text: "",
            image: "",
            linkedin: "",
          });
          setFile({
            image: "",
          });
          setFileErrors({
            image: "",
          });
        }
      });
  };

  const handleClear = () => {
    setUpdateMemberForm({
      ...updateMemberForm,
      heading: "",
      text: "",
      image: "",
      linkedin: "",
    });
    setFile({
      image: "",
    });
    setFileErrors({
      image: "",
    });
  };

  
  const rowHeight = 50;

const DefaultColumnSetting = {
  sortable: true,
  filter: true,
  floatingFilter: true,
  flex: 1,
  resizable: true,
  minWidth: 120,
};

const colDefs = [
  {
    headerName: "Id",
    valueGetter: "node.rowIndex + 1",
    filter: true,
    lockPosition: true,
  },
  {
    headerName: "name",
    filter: true,
    field: "name",
  },
  {
    headerName: "description",
    filter: true,
    field: "description",
  },
  {
    headerName: "Linkedin",
    filter: true,
    field: "linkedin",
  },
  {
    headerName: "Image",
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
  // {
  //   headerName: "Update",
  //   filter: false,
  //   cellRendererFramework: (params) => (
  //     <center onClick={() => handleUpdate(params.data)}>
  //       <button type="button" class="btn btn-outline-primary">
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="16"
  //           height="16"
  //           fill="currentColor"
  //           class="bi bi-pencil"
  //           viewBox="0 0 16 16"
  //         >
  //           <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
  //         </svg>
  //       </button>
  //     </center>
  //   ),
  // },
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
  // ... (rest of your colDefs array)
];

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
          <Modal.Title>Delete Meamber</Modal.Title>
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
          <Modal.Title>Update Team</Modal.Title>
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
                <Form.Label> Linkedin</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="linkedin url"
                  name="linkedin"
                  value={updateMemberForm.linkedin}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="text-danger">
                  {updateMemberFormErrors.linkedin}
                </span>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Product Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Product Text"
                name="text"
                value={updateMemberForm.text}
                onChange={handleChange}
                autoComplete="off"
              />
              <span className="text-danger">{updateMemberFormErrors.text}</span>
            </Form.Group>

            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> Select Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Product Heading"
                  className="w-50"
                  name="image"
                  onChange={handleChange}
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
              Upadete
            </Button>
          )}
          {loader == true && <Spinner animation="border" variant="Primary" />}
        </Modal.Footer>
      </Modal>
      <div>
        <div class="sidebar">
          <SideBar />
        </div>

        <div class="content">
          <div className="container ">
            <FirstNavbar />

            <div className="row my-2">
              <div className="col-md-3">
                <h3>
                  <b> Our Team List </b>
                </h3>
              </div>
              <div className="col-md-4 text-end">
                <button type="button" className="btn btn-outline-success mx-1">
                  <Link to="/leadership-add">Add Team Member </Link>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success mx-1"
                  disabled
                >
                  <Link to="/leadership-list"> Our Team List</Link>
                </button>
              </div>
            </div>
            {/* <table className="table table-bordered w-100 my-2 text-center">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>award Heading</th>
                                    <th>award Text</th>
                                    <th>award Image</th>
                                    <th>Delete</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody>

                                {

                                    ProductList.map((ele, ind) => {
                                        return (
                                            <tr>
                                                <th>{ind + 1}</th>
                                                <td>{ele.title}</td>
                                                <td>
                                                    {ele.description}
                                                </td>
                                                <td><img src={ele.image} width='50px' height='50px' /></td>
                                                <td className="text-center">
                                                    <button type="button" class="btn btn-outline-danger"
                                                        onClick={() => handleDelete(ele)}
                                                    >
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
                                                </td>
                                                <td
                                                    onClick={() => handleUpdate(ele)}
                                                >
                                                    <button type="button" class="btn btn-outline-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16" >
                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                    </svg></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table> */}
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
                paginationPageSize={10}
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

export default LeadershipList;
