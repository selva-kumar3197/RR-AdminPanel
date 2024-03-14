import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import FirstNavbar from "../dashboard/FirstNavbar";
import SideBar from "../dashboard/SideBar";
import axios from 'axios'
import baseURL from "../../Services/Url";
const Awards = () => {
    const [ProductList, setPoductList] = useState([])
    const [reloadPage, setReloadPage] = useState(1)

    useEffect(() => {
        productsListApi()
    }, [reloadPage])

    /** Product List **/
    const productsListApi = () => {
        axios({
            mathod: "GET",
            url: `${baseURL}/category/awards`,
        }).then((res) => {
            if (res.status == 200) {
                setPoductList(res.data)
            }
        }).catch((err) => {
            console.log(err, 'err');
        })
    }


    return (
        <div>
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
                                    <b> Awards </b>
                                </h3>
                            </div>
                            <div className="col-md-4 text-end">
                                <button type="button" className="btn btn-outline-success mx-1">
                                    <Link to="/award-add">Add Awards </Link>
                                </button>
                                <button type="button" className="btn btn-outline-success mx-1">
                                    <Link to="/award-list"> Award List</Link>
                                </button>

                            </div>
                        </div>
                        <table className="table table-bordered w-100 my-2 text-center">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Award Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ProductList.map((ele, ind) => {
                                        return (
                                            <tr>
                                                <th>{ind + 1}</th>
                                                <td>{ele.title} </td>
                                                <td>{ele.description}</td>
                                                <td><img style={{width:'50px' ,height:'50px'}} src={ele.image} /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Awards;
