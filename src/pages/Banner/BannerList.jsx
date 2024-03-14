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
import MyStatefulEditor from "../Components/RichText";
import { AgGridReact } from "ag-grid-react";
import htmlToDraft from "html-to-draftjs";

function BannerList() {
  const [ProductList, setPoductList] = useState([]);
  const [reloadPage, setReloadPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [rowData, setRowdata] = useState();

  const [updateMemberForm, setupdateMemberForm] = useState({
    priority: "",
    image: "",
  });
  const [file, setFile] = useState({
    image: "",
  });
  const [fileErrors, setFileErrors] = useState({
    image: "",
  });

  const [updateMemberFormErrors, setupdateMemberFormErrors] = useState({
    priority: "",
    image: "",
  });

  useEffect(() => {
    productsListApi();
  }, [reloadPage]);

  /** Product List **/
  const productsListApi = () => {
    axios({
      mathod: "GET",
      url: `${baseURL}/category/banner_image`,
    })
      .then((res) => {
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

  const handleClose = () => {
    setShow(false);
  };

  /* update */
  const [updateID, setUpdateId] = useState("");
  const [show, setShow] = useState(false);

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
      // heading: ele.title,
      // text: ele.description,
      image: "",
    });
    setShow(true);
    setUpdateId(ele);
  };
  const handleSubmit = () => {
    setLoader(true);
    let formData = new FormData();
    formData.append("category", "banner_image");
    if (file.image) {
      formData.append("image", file.image);
    }
    axios({
      url: `${baseURL}/${updateID.id}`,
      method: "PUT",
      data: formData,
    })
      .then((res) => {
        if (res.status == 200) {
          setReloadPage(reloadPage + 1);
          setShow(false);
          toast.success("Successfully Updated articles");
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
      priority: "",
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

    floatingFilter: true,
    flex: 1,
    resizable: true,
    minWidth: 120,
  };

  const [colDefs, setColDefs] = useState([
    {
      headerName: "Banner Image",
      filter: false,
      cellRendererFramework: (params) => (
        <div>
          <img
            style={{ width: "70%", height: "50%" }}
            src={params.data.image}
          />
        </div>
      ),
    },
    {
      headerName: "Update",
      filter: false,
      cellRendererFramework: (params) => (
        // <center
        //     onClick={() => handleUpdate(params.data)}
        // >
        <div onClick={() => handleUpdate(params.data)}>
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
        </div>
        // </center>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12">
            <Row className="mb-6">
              <Form.Group as={Col}>
                <Form.Label> Select Image</Form.Label>
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
        <div class="sidebar">
          <SideBar />
        </div>

        <div class="content">
          <div className="container ">
            <FirstNavbar />

            <div className="row my-2">
              <div className="col-md-3">
                <h3>
                  <b>Banner Image</b>
                </h3>
              </div>
            </div>
            <div
              className="ag-theme-alpine"
              style={{ height: "75vh", width: "100%" }}
            >
              <AgGridReact
                // rowHeight={rowHeight}
                rowHeight={400}
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

export default BannerList;
