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
import { CSVLink, CSVDownload } from "react-csv";
import DatePicker from "react-datepicker"; // Import the date picker component
import "react-datepicker/dist/react-datepicker.css";


function JobApplyList() {
  const [selectedDate, setSelectedDate] = useState(null); 
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
  const [ProductList, setPoductList] = useState([]);
  const [reloadPage, setReloadPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [rowData, setRowdata] = useState();
  const handleChangeDate = () => {
    const filteredResults = rowData.filter((item) => {
      if (startDate && endDate) {
        const itemDate = new Date(item.createdAt);
        const startTimestamp = startDate.setHours(0, 0, 0, 0);
        const endTimestamp = endDate.setHours(23, 59, 59, 999);
        return itemDate >= startTimestamp && itemDate <= endTimestamp;
      }
      return true;
    });
  
    setFilteredData(filteredResults);
  };
  
  
  
  

  const [updateMemberForm, setupdateMemberForm] = useState({
    name: "",
    email: "",
    image: "",
  });

  const [formInterData, setFormInterData] = useState();
  useEffect(() => {
    const one1 = [updateMemberForm.Applicants].map((ele, ind) => {
      setFormInterData(ele, "eleeleeleele ====>");
    });
  });

  const [file, setFile] = useState({
    image: "",
  });
  const [fileErrors, setFileErrors] = useState({
    image: "",
  });

  const [updateMemberFormErrors, setupdateMemberFormErrors] = useState({});

  useEffect(() => {
    productsListApi();
  }, [reloadPage]);

  /** Product List **/
  const productsListApi = () => {
    axios({
      mathod: "GET",
      url: `${baseURL}/job_list`,
    })
      .then((res) => {
        if (res.status === 200) {
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
      heading: ele.name,
      text: ele.email,
      description: ele.description,
      image: ele.image,
      createdAt: ele.createdAt,
      exp: ele.exp,
      qualification: ele.qualification,
      Applicants: ele.Applicants,
    });
    setShow(true);
    setUpdateId(ele);
  };

  const handleSubmit = () => {
    setLoader(true);
    let formData = new FormData();
    formData.append("category", "career");

    if (updateMemberForm.heading) {
      formData.append("title", updateMemberForm.heading);
    }

    if (updateMemberForm.text) {
      formData.append("description", updateMemberForm.text);
    }

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

  // console.log(rowData, "apply ===>");
  const handleClear = () => {
    setupdateMemberForm({
      ...updateMemberForm,
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
    autoHeight: true,

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
      headerName: "Name",
      filter: true,
      field: "name",
      wrapText: true,

    },
    {
      headerName: "Email",
      filter: true,
      field: "email",
      wrapText: true,

    },
    {
      headerName: "Mobile Number",
      filter: true,
      field: "contact_no",
      wrapText: true,

    },
    {
      headerName: "Experience",
      filter: true,
      field: "experience",
      wrapText: true,

    },
    {
      headerName: "Role",
      filter: true,
      valueGetter: "data.Applicants[0].title",
      wrapText: true,

    },
    {
      headerName: "Resume",
      filter: true,
      wrapText: true,

      cellRendererFramework: (params) => (
        <div>
       
          <a href={params.data.image} target="_balnk">
            <button
              type="button"
              class="btn btn-outline-danger"
            // onClick={(e) => pdfDownlod(params.data)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-file-pdf"
                viewBox="0 0 16 16"
              >
                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                <path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
              </svg>
            </button>
          </a>
        </div>
        // </center>
      ),
    },


  ]);

  const pdfDownlod = async (e) => {
    console.log(e);
    const url = e.Applicants[0].image;
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = 'resume.pdf';
    link.click();
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
      />
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Career</Modal.Title>
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
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>All Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-12">
                  <p>
                    {" "}
                    <b>Name :-</b>
                  </p>{" "}
                  <p> {updateMemberForm?.heading}</p>{" "}
                  <p>
                    {" "}
                    <b>email :-</b>
                  </p>{" "}
                  <p> {updateMemberForm?.text}</p>{" "}
                  <p>
                    {" "}
                    <b>description :-</b>{" "}
                  </p>{" "}
                  <p> {updateMemberForm?.description}</p>
                  <p>
                    {" "}
                    <b>Resume :-</b>
                  </p>{" "}
                  <p> {updateMemberForm?.image}</p>
                  <p>
                    {" "}
                    <b>Date :-</b>
                  </p>{" "}
                  <p> {updateMemberForm?.createdAt}</p>
                  <p>
                    {" "}
                    <b>role :-</b>
                    {updateMemberForm?.Applicants &&
                      updateMemberForm?.Applicants[0]?.title}
                  </p>
                  <p>
                    {" "}
                    <b>exp :-</b>
                    {updateMemberForm?.Applicants &&
                      updateMemberForm?.Applicants[0]?.exp}
                  </p>
                  <p>
                    {" "}
                    <b>qualification :-</b>
                    {updateMemberForm?.Applicants &&
                      updateMemberForm?.Applicants[0]?.qualification}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
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
              <div className="col-md-4">
                <h3>
                  <b>All Job Apply List</b>
                </h3>
              </div>
              <div className="col-md-2">
                <button style={{ fontWeight: "bold" }}>
                  {rowData ? <>
                    <CSVLink
                      data={filteredData.length !== 0 ? filteredData : rowData}
                      className="list-group-item"
                      filename={"Career List Form List"}
                    >
                      <span>Export to Excel </span>
                    </CSVLink>
                  </> : ""}

                </button>
              </div>
              <div className="row">
       
              <div className="col-md-5 my-2">
  <label>Select Date Range: </label>
  <div className="d-flex gap-2"> {/* Fix: Changed class name */}
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      selectsStart
      startDate={startDate}
      endDate={endDate}
      dateFormat="yyyy-MM-dd"
      placeholderText="Start Date"
    />
    <DatePicker
      selected={endDate}
      onChange={(date) => setEndDate(date)}
      selectsEnd
      startDate={startDate}
      endDate={endDate}
      minDate={startDate}
      dateFormat="yyyy-MM-dd"
      placeholderText="End Date"
    />
    <button className="btn btn-primary btn-sm mx-2" onClick={handleChangeDate}>
      Filter
    </button>
  </div>
</div>
</div>


              <div className="col-md-6 text-end">
                <button type="button" className="btn btn-outline-success mx-1">
                  <Link to="/career-add">Add Career </Link>
                </button>
                <button type="button" className="btn btn-outline-success mx-1">
                  <Link to="/career-list"> Career List</Link>
                </button>{" "}
                <button
                  type="button"
                  className="btn btn-outline-success mx-1"
                  disabled
                >
                  <Link to="/JobApplyList"> Job Apply List</Link>
                </button>
               
              </div>
            </div>

            <div
              className="ag-theme-alpine"
              style={{ height: "75vh", width: "100%" }}
            >
             <AgGridReact
  rowHeight={rowHeight}
  columnDefs={colDefs}
  defaultColDef={DefaultColumnSetting}
  pagination={true}
  paginationPageSize={20}
  rowData={filteredData.length !== 0 ? filteredData : rowData} // Use filteredData when a date range is selected
/>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobApplyList;
