import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../Components/Breadcrumb'
import { useStateValue } from '../Context/StateProvider'
import './Dashboard.css'
import Login from '../Pages/Login'

const Dashboard = () => {
    const [{ user }] = useStateValue();
    console.log(user);
    return (
        <>
            {user ? (
                <>
                    <Breadcrumb page={'Dashboard'} pagename={''} />
                    <section className="trending-product section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-12">
                                    <div className="single-product users-card">
                                        <Link to="/" className="title-container">
                                            <div className="product-info users-card">
                                                <span className="category">Users</span>
                                                <h4 className="title">
                                                    <hr />
                                                </h4>
                                                <div className="price">
                                                    <span className="users">
                                                        0.00
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-12">
                                    <div className="single-product">
                                        <Link to="/" className="title-container">
                                            <div className="product-info">
                                                <span className="category">Training Sessions</span>
                                                <h4 className="title">
                                                    <hr />
                                                </h4>
                                                <div className="price">
                                                    <span>
                                                        0.00
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-6 col-12">
                                    <div className="single-product">
                                        <Link to="/" className="title-container">
                                            <div className="product-info">
                                                <span className="category">Matches</span>
                                                <h4 className="title">
                                                    <hr />
                                                </h4>
                                                <div className="price">
                                                    <span>
                                                        0.00
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-6 col-12">
                                    <div className="single-product inbox-card">
                                        <Link to="/" className="title-container">
                                            <div className="product-info inbox-card">
                                                <span className="category">Players</span>
                                                <h4 className="title">
                                                    <hr />
                                                </h4>
                                                <div className="price">
                                                    <span className="inbox">
                                                        0.00
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    <Login />
                </>
            )
            }
        </>
    )
}

export default Dashboard
