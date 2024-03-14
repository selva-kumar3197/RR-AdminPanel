import React, { useEffect, useState } from "react";
import FirstNavbar from "./dashboard/FirstNavbar";
import SideBar from "./dashboard/SideBar";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import baseURL from "../Services/Url";
import { Modal, Button, Row, Form, Col, Spinner } from "react-bootstrap";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback } from "react";
import { useRef } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import DatePicker from "react-datepicker"; // Import the date picker component
import "react-datepicker/dist/react-datepicker.css";


function Contactus() {
  const [selectedDate, setSelectedDate] = useState(null); 
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
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

  const [updateMemberFormErrors, setupdateMemberFormErrors] = useState({
    heading: "",
    text: "",
    image: "",
  });

  useEffect(() => {
    productsListApi();
  }, [reloadPage]);

  /** Product List **/

  const [dataList, setDataList] = useState([]);
  const productsListApi = () => {
    axios({
      mathod: "GET",
      url: `${baseURL}/category/contactus`,
    })
      .then((res) => {
        if (res.status == 200) {
          setRowdata(res?.data?.reverse());
          setDataList(res?.data);
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
        console.log(err, "222");
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

  console.log(rowData, "rowData==>");
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
      heading: ele.title,
      text: ele.description,
      image: "",
    });
    setShow(true);
    setUpdateId(ele);
  };

  /** Form Validation **/
  const handleValidation = () => {
    // const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const textReg = /[A-Za-z]/;
    const newErros = {};
    const { heading, text } = updateMemberForm;
    const { image } = file;
    if (!heading) {
      newErros.heading = "please enter name";
    } else if (heading && !textReg.test(heading)) {
      newErros.heading = "numbers is not allowed";
    } else if (heading && heading.length > 50) {
      newErros.name = "name should be below 50 charecters";
    }

    if (!text) {
      newErros.text = "please enter disignation";
    } else if (text && !textReg.test(text)) {
      newErros.text = "numbers is not allowed";
    } else if (text && text.length > 50) {
      newErros.text = "disignation should be below 50 charecters";
    }
    if (!image) {
      newErros.image = "please select file";
    }
    return newErros;
  };

  const handleSubmit = () => {
    // const handleValidationObject = handleValidation()
    // if (Object.keys(handleValidationObject).length > 0) {
    //     setupdateMemberFormErrors(handleValidationObject)
    // } else {

    setLoader(true);
    let formData = new FormData();
    formData.append("category", "awards");

    if (updateMemberForm.heading) {
      formData.append("title", updateMemberForm.heading);
    }

    if (file.image) {
      formData.append("image", file.image);
    }

    if (updateMemberForm.text) {
      formData.append("description", updateMemberForm.text);
    }

    // const token = '32c2483430c53f2eec280c7f1ba826f697e78ac7'
    // headers: {
    //   Authorization: `Bearer ${token}`
    // },
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

  /***** Pagenation Table******/
  const rowHeight = 90;
  const DefaultColumnSetting = {
    sortable: true,
    filter: true,
    autoHeight: true,
    floatingFilter: true,
    flex: 1,
    resizable: true,
    minWidth: 120,
    wrapText: true,
  };

  const [colDefs, setColDefs] = useState([
    {
      headerName: "Id",
      valueGetter: "node.rowIndex + 1",
      filter: true,
      lockPosition: true,
    },
    {
      headerName: "Name",
      filter: true,
      field: "name",
    },
    {
      headerName: "Mobile No",
      filter: true,
      field: "mobile_no",
    },
    {
      headerName: "Email",
      filter: true,
      field: "email",
    },
    {
      headerName: "Description",
      filter: true,
      field: "description",
      autoHeight: true,
      minWidth:400
    },
    // {
    //   headerName: "award Image",
    //   filter: false,
    //   cellRendererFramework: (params) => (
    //     <center>
    //       <img
    //         style={{ width: "50px", height: "50px" }}
    //         src={params.data.image}
    //       />
    //     </center>
    //   ),
    // },
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
    // {
    //   headerName: "Delete",
    //   filter: false,
    //   cellRendererFramework: (params) => (
    //     <center onClick={() => handleDelete(params.data)}>
    //       <button type="button" class="btn btn-outline-danger">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           width="16"
    //           height="16"
    //           fill="currentColor"
    //           class="bi bi-trash-fill"
    //           viewBox="0 0 16 16"
    //         >
    //           <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
    //         </svg>
    //       </button>
    //     </center>
    //   ),
    // },
  ]);

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

  const gridRef = useRef();

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel({
      exportedRows: document.getElementById("allRows").checked,
    });
  }, []);

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
          <Modal.Title>Update Product</Modal.Title>
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
                  <b>Contact Us </b>
                </h3>
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
              <div className="col-md-3">
                <button style={{ fontWeight: "bold" }}>
                {rowData ? 
                  <CSVLink
                                                          data={filteredData?.length !== 0 ? filteredData : dataList}


                    className="list-group-item"
                    filename={"Contact Us Form List"}
                  >
                    <span>Export to Excel </span>
                  </CSVLink> : "" }
        
                </button>
              </div>
              {/* <div className="col-md-3">
                <ExcelFile>
                  <ExcelSheet data={dataList} name="Employees">
                    {" "}
                  </ExcelSheet>{" "}
                </ExcelFile>
              </div> */}
              {console.log(dataList, "dataList ===>")}
              {/* <div className="col-md-4 text-end">
                <button type="button" className="btn btn-outline-success mx-1">
                  <Link to="/award-add">Add Award </Link>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success mx-1"
                  disabled
                >
                  <Link to="/award-list"> Product Award</Link>
                </button>
              </div> */}
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
              style={{ height: "70vh", width: "100%" }}
            >
              <AgGridReact
                rowHeight={rowHeight}
                // columnDefs={columns}
                columnDefs={colDefs}
                defaultColDef={DefaultColumnSetting}
                pagination={true}
                paginationPageSize={25}
                domLayout="autoHeight"
                // onGridReady={onGridReady}
                rowData={filteredData?.length !== 0 ? filteredData : rowData} 

              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactus;
