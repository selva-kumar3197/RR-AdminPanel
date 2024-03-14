import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import baseURL from '../../Services/Url';
import FirstNavbar from "../dashboard/FirstNavbar";
import SideBar from "../dashboard/SideBar";
import { ToastContainer, toast, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import RichTextEditor from 'react-rte';
import MyStatefulEditor from "../Components/RichText";


function InsightAdd() {
  const [loader, setLoader] = useState(false)
  const [addProducForm, setAddProductForm] = useState({
      heading: '',
      html: ''
  })
  const [addProductFormErros, setAddProductFormErrors] = useState({
      heading: '',
      html: '',
      image: ''
  })
  const [file, setFile] = useState({
      image: ''
  })
  const [fileErrors, setFileErrors] = useState({
      image: ''
  })

  /** handle Change **/
  const handleChange = (event) => {
      if (event.target.name == 'image') {
          setFile({
              ...file, [event.target.name]: event?.target?.files[0]
          })
          setFileErrors({
              ...file,
              image: ""
          })
      } else {
          setAddProductForm({
              ...addProducForm, [event.target.name]: event.target.value
          })
      }
      setAddProductForm({
          ...addProducForm, [event.target.name]: event.target.value
      })
      setAddProductFormErrors({
          ...addProductFormErros, [event.target.name]: null
      })
  }

  const handleData = (value) => {
      // setRichTextdata(value)
      setAddProductForm({
          ...addProducForm, ['html']: value
      })
      setAddProductFormErrors({
          ...addProductFormErros, ['html']: null
      })
  }

  /** Form Validation **/
  const handleValidation = () => {
      // const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      const regText = /[A-Za-z]/
      const newErros = {}
      const { heading, text, html, image } = addProducForm
      if (!heading) {
          newErros.heading = 'please enter blog heading'
      } else if (heading && !regText.test(heading)) {
          newErros.heading = 'blog heading should be text'
      } else if (heading && heading.length > 50) {
          newErros.heading = 'blog heading should be belw 50 charecters'
      }

      // if (!text) {
      //     newErros.text = 'please enter blog text'
      // } else if (text && !regText.test(text)) {
      //     newErros.text = 'blog heading should be text'
      // } else if (text && text.length > 50) {
      //     newErros.text = 'blog text should be belw 50 charecters'
      // }

      if (!html) {
          newErros.html = 'please enter blog text'
      }

      if (!image) {
          newErros.image = 'please select file'
      }
      return newErros
  }

  /** Submit Form Dtata **/
  const handleSubmit = () => {
      const handleValidationObject = handleValidation()
      if (Object.keys(handleValidationObject).length > 0) {
          setAddProductFormErrors(handleValidationObject)
      } else {
          setLoader(true)
          let formData = new FormData();
          formData.append("title", addProducForm.heading);
          formData.append("image", file.image);
          formData.append("description", addProducForm.html);
          formData.append("category", 'insight');

          // const token = '32c2483430c53f2eec280c7f1ba826f697e78ac7'
          // headers: {
          //   Authorization: `Bearer ${token}`
          // },

          axios({
              url: `${baseURL}/create`,
              method: "POST",
              data: formData,
          }).then((res) => {
              setLoader(true)
              if (res.status == 200) {
                  setLoader(false)
                  toast.success('Successfully Created blogs')
                  setLoader(false)
                  setAddProductForm({
                      ...addProducForm,
                      heading: '',
                      text: '',
                      image: '',
                  })
                  setFile({
                      ...file,
                      image: ''
                  })
                  setFileErrors({
                      ...fileErrors,
                      image: ''
                  })
              }
          })
              .catch((err) => {
                  setLoader(true)
                  if (err.response.status == 401) {
                      toast.error('Token is Expaired')
                      setLoader(false)
                      setLoader(false)
                      setAddProductForm({
                          ...addProducForm,
                          name: '',
                          disignation: '',
                      })
                      setFile({
                          ...file,
                          image: ''
                      })
                      setFileErrors({
                          ...fileErrors,
                          image: ''
                      })
                  }
              });
      }
  }

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
          {" "}
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
                                  <b>Add Insight </b>
                              </h3>
                          </div>
                          <div className="col-md-4 text-end">
                              <button
                                  type="button"
                                  className="btn btn-outline-success mx-1"
                                  disabled
                              >
                                  <Link to="/blog-add">Add Insight </Link>
                              </button>
                              <button type="button" className="btn btn-outline-success mx-1">
                                  <Link to="/insights-list"> Insight List</Link>
                              </button>
                          </div>
                      </div>

                      <div className="row m-auto my-3">
                          <div className="col-md-3"></div>
                          <div className="col-md-6">
                              <Row className="mb-3">
                                  <Form.Group as={Col}>
                                      <Form.Label>Insight Heading</Form.Label>
                                      <Form.Control
                                          type="text"
                                          placeholder="blog Heading"
                                          name='heading'
                                          value={addProducForm.heading}
                                          onChange={handleChange}
                                          autoComplete='off'
                                      />
                                      <span className="text-danger" >{addProductFormErros.heading}</span>
                                  </Form.Group>
                              </Row>
                              <Row>
                                  <label>Insight Text</label>
                                  <MyStatefulEditor handleData={handleData}/>
                                  <span className="text-danger" >{addProductFormErros.html}</span>
                              </Row>
                              <Row className="mb-3 mt-3">
                                  <Form.Group as={Col}>
                                      <Form.Label> Select Image</Form.Label>
                                      <Form.Control
                                          type="file"
                                          placeholder="Product Heading"
                                          className="w-50"
                                          name='image'
                                          value={addProducForm.image}
                                          onChange={handleChange}
                                          autoComplete='off'
                                      />
                                      <span className="text-danger" >{addProductFormErros.image}</span>
                                  </Form.Group>
                              </Row>
                              <div className="text-center m-auto my-2">
                                  {loader == false &&
                                      <Button
                                          variant="primary"
                                          type="submit"
                                          onClick={handleSubmit}
                                      >
                                          Submit

                                      </Button>
                                  }
                                  {
                                      loader == true &&
                                      <Spinner animation="border" variant="Primary" />
                                  }
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

export default InsightAdd