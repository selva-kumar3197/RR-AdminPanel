import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import baseURL from '../../Services/Url';
import logo from "./../../assets/images/logo.png";
import { ToastContainer, toast, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Spinner } from "react-bootstrap";


const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })
  const [loginFormErrors, setLoginFormErrors] = useState({
    email: '',
    password: ''
  })
  const handleChange = (event) => {
    setLoginForm({
      ...loginForm, [event.target.name]: event.target.value
    })
    setLoginFormErrors({
      ...loginFormErrors, [event.target.name]: null
    })
  }
  const handleValidation = () => {
    // const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const regText = /[A-Za-z]/
    const { email, password } = loginForm
    const newErrors = {}
    if (!email) {
      newErrors.email = 'please enter user name'
    }
    else if (email && !regText.test(email)) {
      newErrors.email = 'user name should be text'
    }
    else if (email && email.length > 50) {
      newErrors.email = 'username should be below 50 digits'
    }

    if (!password) {
      newErrors.password = 'please enter password'
    } else if (password && password.length > 50) {
      newErrors.password = 'password should be below 50 digits'
    }
    return newErrors

  }

  // eugia$#@!345
  const handleSubmit = () => {
    const handleValidationObject = handleValidation()
    if (Object.keys(handleValidationObject).length > 0) {
      setLoginFormErrors(handleValidationObject)
    } else {
      setLoader(true)
      const Username = 'application'
      const Password = 'secret'
      const data = "password"
      let obj = `grant_type=${data}&username=${loginForm.email}&password=${loginForm.password}`
      console.log(obj, "objjj");
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa(`${Username}:${Password}`)
        },
        body: obj
      };
      fetch('https://rr-api.realisticrealtors.com/api/rr/oauth/token', requestOptions)
        .then(response => response.json())
        .then(data => {

          setLoader(true)
          if (data.status == 400) {
            toast.error('user credentials are invalid')
            setTimeout(() => {
              setLoader(false)
            }, [1000])
          } else {
            localStorage.setItem('admin', JSON.stringify(data));
            toast.success('Login Success Fully')
            setLoader(true)
            setLoginForm({
              ...loginForm,
              email: '',
              password: ''
            })
            setTimeout(() => {
              navigate('/dashboard');
            }, 1000);
          }
        }
        ).catch((err) => {
          setLoginForm({
            ...loginForm,
            email: '',
            password: ''
          })
        })
    }
  }
  return (
    <div>
      {" "}
      <div>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          transition={Zoom}
          delay={500}
          limit={1}
        />
        <div class="login">
          <div className="row">
            <div className="col-md-12 text-center">
              <img src={logo} alt="" />
            </div>
          </div>

          <h2 class="login-header">Log in </h2>
          <p>
            <input
              type="email"
              placeholder="User Name"
              name='email'
              autoComplete="off"
              value={loginForm.email}
              onChange={handleChange}
            />
            <span className="text-danger" >{loginFormErrors.email}</span>
          </p>
          <p>
            <input
              type="password"
              placeholder="Password"
              name='password'
              autoComplete="off"
              value={loginForm.password}
              onChange={handleChange}
            />
            <span className="text-danger" >{loginFormErrors.password}</span>
          </p>
          <p
            onClick={handleSubmit}
          >
            {/* <Link to="/dashboard"> */}
            {
              loader == true ? '' :
                <input
                  type="submit"
                  value="Log in"
                />
            }
            {/* </Link> */}
            {
              loader == true && <div style={{ marginLeft: '170px' }} >
                <Spinner animation="border" variant="Primary" />
              </div>
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login