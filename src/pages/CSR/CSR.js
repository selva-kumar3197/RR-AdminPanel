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
import xicon from "../../assets/22228.webp"

function CSR() {
  const [reloadPage, setReloadPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [rowData, setRowdata] = useState();
  const [updateMemberForm, setupdateMemberForm] = useState({
    id: "",
    description: "",
    title: "",
    image: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    image6: "",
    image7: "",

  });
  const [updateMemberFormErrors, setupdateMemberFormErrors] = useState({
    description: "",
    title: "",
    image1: "",
    image: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    image6: "",
    image7: "",
  });
  
  useEffect(() => {
    PropertyListApi();
  }, [reloadPage]);
  useEffect(() => {
    PropertyListApi();
  }, []);
  const PropertyListApi = async () => {
    await axios({
      method: "GET",
      url: `${baseURL}category/csr`,
    })
      .then((res) => {
        if (res.status == 200) {
          setRowdata(res.data.reverse());
          console.log(res.data, "hello");
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

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

  const [updateID, setUpdateId] = useState("");
  const [show, setShow] = useState(false);


  const handleChange = (ele) => {
    if (ele.target.name === "title" || ele.target.name === "description") {
      setupdateMemberForm({
        ...updateMemberForm,
        [ele.target.name]: ele.target.value,
      });
    } else {



      setupdateMemberForm({
        ...updateMemberForm,
        [ele.target.name]: ele.target.files[0],
      });

    }
  };


  const handleImageChange = (ele) => {
    setupdateMemberForm({ ...updateMemberForm, [ele.target.name]: 100 })
  }
  // useEffect(() => { console.log(updateMemberForm) }, [updateMemberForm]);

  const handleUpdate = (ele) => {
    setShow(true);
    setupdateMemberForm({
      ...updateMemberForm,
      id: ele.id,
      title: ele.title,
      description: ele.description,
      image: ele.image,
      image1: ele.image1,
      image2: ele.image2,
      image3: ele.image3,
      image4: ele.image4,
      image5: ele.image5,
      image6: ele.image6,
      image7: ele.image7,



    });
    console.log(updateMemberForm, "updatemember")

    setShow(true);
    setUpdateId(ele);
  };

  const validateForm = () => {
    const errors = {};
    if (updateMemberForm.title == "") {
      errors.title = "Please enter a title";
    }
    if (updateMemberForm.description == "") {
      errors.description = "Please enter a description";
    }
    return errors;
  }


  const handleSubmit = () => {
    setLoader(true);



    let formData = new FormData();
    formData.append("category", "csr"); 
    console.log(updateMemberForm, "updatememberForm")
    if (updateMemberForm.id) { formData.append("id", updateMemberForm.id); }

    if (updateMemberForm.title) { formData.append("title", updateMemberForm.title); }
    if (updateMemberForm.description) { formData.append("description", updateMemberForm.description); }
    if (updateMemberForm.image) { formData.append("image", updateMemberForm.image); }
    if (updateMemberForm.image1) { formData.append("image1", updateMemberForm.image1); }
    if (updateMemberForm.image2) { formData.append("image2", updateMemberForm.image2); }
    if (updateMemberForm.image3) { formData.append("image3", updateMemberForm.image3); }
    if (updateMemberForm.image4) { formData.append("image4", updateMemberForm.image4); }
    if (updateMemberForm.image5) { formData.append("image5", updateMemberForm.image5); }
    if (updateMemberForm.image6) { formData.append("image6", updateMemberForm.image6); }
    if (updateMemberForm.image7) { formData.append("image7", updateMemberForm.image7); }
    axios({
      url: baseURL + "csr_update",
      method: "PUT",
      data: formData,
    })
      .then((res) => {
        if (res.status == 200) {
          setReloadPage(reloadPage + 1);
          setShow(false);
          toast.success("Successfully Updated C S R");
          handleClear()
          setLoader(false);
          setupdateMemberForm({
            ...updateMemberForm,
            title: "",
            description: "",
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
            title: "",
            description: "",
            image: "",
          });
        }
      });




  };



  const handleClear = (ele) => {
    setupdateMemberForm({ ...updateMemberForm, description: "", title: "", image: null, image1: null, image2: null, image3: null, image4: null, image5: null, image6: null, image7: null })
    setupdateMemberFormErrors({ ...updateMemberFormErrors, description: "", title: "", file: "", file2: "", file3: '', file4: '', file5: '', file6: '' });

  }


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
      wrapText: true,

      headerName: "Id",
      valueGetter: "node.rowIndex + 1",
      filter: true,
      lockPosition: true,
    },

    {
      wrapText: true,

      headerName: "Title",
      filter: true,
      field: "title",
    },
    {
      wrapText: true,
      minWidth: 500,
      headerName: "Description",
      filter: true,
      field: "description",
      
    },


    {
      wrapText: true,

      headerName: "Image 1",
      filter: false,
      cellRendererFramework: (params) => (

        <center  >
          <img
            style={{ width: "50px", height: "50px" }}
            src={params.data.image}
          />
          {/* {console.log(params.data.gallery_image[0]?.image, "params data")} */}
        </center >

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
      headerName: "Image 6",
      filter: false,
      cellRendererFramework: (params) => (
        <center>
          <img
            style={{ width: "50px", height: "50px" }}
            src={params.data.image5}
          />
        </center>
      ),
    },
    {
      headerName: "Image 7",
      filter: false,
      cellRendererFramework: (params) => (
        <center>
          <img
            style={{ width: "50px", height: "50px" }}
            src={params.data.image6}
          />
        </center>
      ),
    },
    {
      headerName: "Image 8",
      filter: false,
      cellRendererFramework: (params) => (
        <center>
          <img
            style={{ width: "50px", height: "50px" }}
            src={params.data.image7}
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



  useEffect(() => {
    console.log(updateMemberForm)
  }, [updateMemberForm])
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
          <Modal.Title>Delete C.S.R</Modal.Title>
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
          <Modal.Title>Update C S R</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12">
            <Row className="mb-6">
              <Form.Group as={Col} className="pt-2">
                <Form.Label> Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={updateMemberForm.title}
                  onChange={handleChange}
                  autoComplete="off"
                />

              </Form.Group>
            </Row>
            <Row className="mb-6">
              <Form.Group as={Col} className="pt-2">
                <Form.Label> Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={updateMemberForm.description}
                  onChange={handleChange}
                  autoComplete="off"
                />

              </Form.Group>
            </Row>

            <Row></Row>
            <Row className="mb-6">

              <Form.Group as={Col} className="pt-2">
                <Form.Label> Select Image 1</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Product Heading"
                  className="w-50"
                  name="image"
                  // value={updateMemberForm.image}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </Form.Group>
              {updateMemberForm?.image instanceof File || updateMemberForm?.image instanceof Number ? null : <div className="d-flex">
                <img src={updateMemberForm?.image} height={70} width={70} alt="" className="m-2" />
              </div>}


              {
                updateMemberForm?.image instanceof File || updateMemberForm?.image instanceof Number ? <div className="d-flex">
                  <img src={URL.createObjectURL(updateMemberForm?.image)} height={70} width={70} alt="" className="m-2" />
                  {/* <img src={xicon} height={25} width={25} alt="upload Image" onClick={handleImageChange} name="image" className="xicon" /> */}
                </div> : ""
              }


            </Row>
            <Row className="mb-6">
              <Form.Group as={Col} className="pt-2">
                <Form.Label> Select Image 2</Form.Label>
                <Form.Control
                  name="image1"
                  type="file"
                  className="w-50"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </Form.Group>
              {updateMemberForm?.image1 instanceof File || updateMemberForm?.image1 instanceof Number ? null : <div className="d-flex">
                <img src={updateMemberForm?.image1} height={70} width={70} alt="" className="m-2" />
              </div>}


              {
                updateMemberForm?.image1 instanceof File || updateMemberForm?.image1 instanceof Number ? <div className="d-flex">
                  <img src={URL.createObjectURL(updateMemberForm?.image1)} height={70} width={70} alt="" className="m-2" />
                  {/* <img src={xicon} height={25} width={25} alt="upload Image" onClick={handleImageChange} name="image" className="xicon" /> */}
                </div> : ""
              }


            </Row>
            <Row className="mb-6">

              <Form.Group as={Col} className="pt-2">
                <Form.Label> Select Image 3</Form.Label>
                <Form.Control
                  name="image2"
                  type="file"
                  className="w-50"
                  onChange={handleChange}
                  autoComplete="off"
                />

              </Form.Group>
              {updateMemberForm?.image2 instanceof File || updateMemberForm?.image2 instanceof Number ? null : <div className="d-flex">
                <img src={updateMemberForm?.image2} height={70} width={70} alt="" className="m-2" />
              </div>}


              {
                updateMemberForm?.image2 instanceof File || updateMemberForm?.image2 instanceof Number ? <div className="d-flex">
                  <img src={URL.createObjectURL(updateMemberForm?.image2)} height={70} width={70} alt="" className="m-2" />
                  {/* <img src={xicon} height={25} width={25} alt="upload Image" onClick={handleImageChange} name="image" className="xicon" /> */}
                </div> : ""
              }

            </Row>
            <Row className="mb-6">
              <Form.Group as={Col} className="pt-2">
                <Form.Label> Select Image 4</Form.Label>
                <Form.Control
                  name="image3"
                  type="file"
                  className="w-50"
                  onChange={handleChange}
                  autoComplete="off"
                />
                {updateMemberForm?.image3 instanceof File || updateMemberForm?.image3 instanceof Number ? null : <div className="d-flex">
                  <img src={updateMemberForm?.image3} height={70} width={70} alt="" className="m-2" />
                </div>}


                {
                  updateMemberForm?.image3 instanceof File || updateMemberForm?.image3 instanceof Number ? <div className="d-flex">
                    <img src={URL.createObjectURL(updateMemberForm?.image3)} height={70} width={70} alt="" className="m-2" />
                    {/* <img src={xicon} height={25} width={25} alt="upload Image" onClick={handleImageChange} name="image" className="xicon" /> */}
                  </div> : ""
                }

              </Form.Group>
            </Row>
            <Row className="mb-6">
              <Form.Group as={Col} className="pt-2">
                <Form.Label> Select Image 5</Form.Label>
                <Form.Control
                  name="image4"
                  type="file"
                  className="w-50"
                  onChange={handleChange}
                  autoComplete="off"
                />

              </Form.Group>
              {updateMemberForm?.image4 instanceof File || updateMemberForm?.image4 instanceof Number ? null : <div className="d-flex">
                <img src={updateMemberForm?.image4} height={70} width={70} alt="" className="m-2" />
              </div>}


              {
                updateMemberForm?.image4 instanceof File || updateMemberForm?.image4 instanceof Number ? <div className="d-flex">
                  <img src={URL.createObjectURL(updateMemberForm?.image4)} height={70} width={70} alt="" className="m-2" />
                  {/* <img src={xicon} height={25} width={25} alt="upload Image" onClick={handleImageChange} name="image" className="xicon" /> */}
                </div> : ""
              }

            </Row>
            <Row className="mb-6">
              <Form.Group as={Col} className="pt-2">
                <Form.Label> Select Image 6</Form.Label>
                <Form.Control
                  name="image5"
                  type="file"
                  className="w-50"
                  onChange={handleChange}
                  autoComplete="off"
                />

              </Form.Group>
              {updateMemberForm?.image5 instanceof File || updateMemberForm?.image5 instanceof Number ? null : <div className="d-flex">
                <img src={updateMemberForm?.image5} height={70} width={70} alt="" className="m-2" />
              </div>}


              {
                updateMemberForm?.image5 instanceof File || updateMemberForm?.image5 instanceof Number ? <div className="d-flex">
                  <img src={URL.createObjectURL(updateMemberForm?.image5)} height={70} width={70} alt="" className="m-2" />
                  {/* <img src={xicon} height={25} width={25} alt="upload Image" onClick={handleImageChange} name="image" className="xicon" /> */}
                </div> : ""
              }

            </Row>
            <Row className="mb-6">
              <Form.Group as={Col} className="pt-2">
                <Form.Label> Select Image 7</Form.Label>
                <Form.Control
                  name="image6"
                  type="file"
                  className="w-50"
                  onChange={handleChange}
                  autoComplete="off"
                />

              </Form.Group>
              {updateMemberForm?.image6 instanceof File || updateMemberForm?.image6 instanceof Number ? null : <div className="d-flex">
                <img src={updateMemberForm?.image6} height={70} width={70} alt="" className="m-2" />
              </div>}


              {
                updateMemberForm?.image6 instanceof File || updateMemberForm?.image6 instanceof Number ? <div className="d-flex">
                  <img src={URL.createObjectURL(updateMemberForm?.image6)} height={70} width={70} alt="" className="m-2" />
                  {/* <img src={xicon} height={25} width={25} alt="upload Image" onClick={handleImageChange} name="image" className="xicon" /> */}
                </div> : ""
              }

            </Row>
            <Row className="mb-6">
              <Form.Group as={Col} className="pt-2">
                <Form.Label> Select Image 8</Form.Label>
                <Form.Control
                  name="image7"
                  type="file"
                  className="w-50"
                  onChange={handleChange}
                  autoComplete="off"
                />

              </Form.Group>
              {updateMemberForm?.image7 instanceof File || updateMemberForm?.image instanceof Number ? null : <div className="d-flex">
                <img src={updateMemberForm?.image7} height={70} width={70} alt="" className="m-2" />
              </div>}
              {
                updateMemberForm?.image7 instanceof File || updateMemberForm?.image instanceof Number ? <div className="d-flex">
                  <img src={URL.createObjectURL(updateMemberForm?.image7)} height={70} width={70} alt="" className="m-2" />
                  {/* <img src={xicon} height={25} width={25} alt="upload Image" onClick={handleImageChange} name="image" className="xicon" /> */}
                </div> : ""
              }

            </Row>


          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          {loader == false && (
            <Button variant="primary" onClick={handleSubmit}>
              Update
            </Button>
          )}
          {loader == true && <Spinner animation="border" variant="Primary" />} */}
          <div className="row justify-content-center">
            <div className="col">
              <Button variant="secondary" onClick={handleClear}>
                Clear
              </Button>
            </div>
            <div className="col">
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit {
                  loader == true
                    ?
                    <div class="spinner-border spinner-border-sm" role="status"></div>
                    :
                    ' '
                }
              </Button>
            </div>

          </div>
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
                  <b>All C S R List</b>
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
                  <Link to="/properties-list"> CSR List</Link>
                </button>
                {/* <button type="button" className="btn btn-outline-success mx-1">
                  <Link to="/Property_enquiry">CSR Enquiry</Link>
                </button> */}
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

export default CSR
