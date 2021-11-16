import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router';
import './Haeder.css'
import Logo from '../assets/images/sportLogo.png';
import { useStateValue } from '../Context/StateProvider';
import { auth } from '../firebase';

const Header = () => {
    const [{ user }] = useStateValue();
    const history = useHistory()
    const logout = () => {
        if (user) {
            auth.signOut();
            history.push('/login')
        }
    }
    return (
        <>
            {
                user ? (
                    <>

                        {/* <!-- Start Header Area --> */}
                        <header className="header navbar-area admin-header">

                            {/* <!-- Start Topbar --> */}
                            <div className="topbar">
                                <div className="container">
                                    <div className="row align-items-center">
                                        <div className="col-lg-4 col-md-4 col-12">
                                            <div className="top-left">
                                                {/* Left Menus */}
                                                <div className="logo">
                                                    <Link to="/" className="system-title">
                                                        <p>Sports Prostat Management System</p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-12">
                                            <div className="top-middle">
                                                <ul className="useful-links">
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-12">
                                            <div className="top-end right-menu">
                                                <div className="nav-social">
                                                    <ul className="user-login" id="nav">
                                                        <li className="nav-item">
                                                            <Link to="/"><i className="lni lni-search-alt"></i></Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to="/"><i className="lni lni-alarm"></i></Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to="/"><i className="lni lni-cog"></i></Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to="/"><i className="lni lni-help"></i></Link>
                                                        </li>
                                                        <li className="nav__listitem">
                                                            <Link to="/" className="profile-link">
                                                                <img src={user?.photoURL} className="profile-picture" alt="logo" />
                                                            </Link>
                                                            <ul className="nav__listitemdrop">
                                                                <div className="profile-name">
                                                                    <i className="lni lni-user"></i>
                                                                    <p>{user?.displayName}</p>
                                                                </div>
                                                                <div className="profile-email">
                                                                    <i className="lni lni-envelope"></i>
                                                                    <p>{user?.email}</p>
                                                                </div>
                                                                <div className="profile-profile">
                                                                    <i className="lni lni-archive"></i>
                                                                    <Link to="/" className="user-profile">
                                                                        <p>My Profile</p>
                                                                    </Link>
                                                                </div>
                                                                <div className="user-logout" onClick={logout}>
                                                                    <p>Logout</p>
                                                                </div>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- End Topbar --> */}

                            {/* <!-- Start Header Bottom --> */}
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-lg-12 col-md-6 col-12 middle-menu">
                                        <div className="nav-inner">
                                            {/* <!-- Start Mega Category Menu --> */}
                                            <div className="header-logo">
                                                {/* Company name */}
                                                <div className="logo">
                                                    <Link to="/"><img src={Logo} alt="Logo" /></Link>
                                                </div>
                                            </div>
                                            {/* <!-- End Mega Category Menu --> */}
                                            {/* <!-- Start Navbar --> */}
                                            <nav className="navbar navbar-expand-lg">
                                                <button className="navbar-toggler mobile-menu-btn" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                                    aria-expanded="false" aria-label="Toggle navigation">
                                                    <span className="toggler-icon"></span>
                                                    <span className="toggler-icon"></span>
                                                    <span className="toggler-icon"></span>
                                                </button>
                                                <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                                    <ul id="nav" className="navbar-nav ms-auto">
                                                        <li className="nav-item">
                                                            <Link to="/" className="active" aria-label="Toggle navigation">Home</Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link className="dd-menu collapsed" to="/" data-bs-toggle="collapse"
                                                                data-bs-target="#submenu-1-2" aria-controls="navbarSupportedContent"
                                                                aria-expanded="false" aria-label="Toggle navigation">Administration</Link>
                                                            <ul className="sub-menu collapse" id="submenu-1-2">
                                                                <li className="nav-item"><Link to="/">Positions</Link></li>
                                                                <li className="nav-item"><Link to="/">Injury Types</Link></li>
                                                                <li className="nav-item"><Link to="/sporttype">Sport Type</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link className="dd-menu collapsed" to="/" data-bs-toggle="collapse"
                                                                data-bs-target="#submenu-1-2" aria-controls="navbarSupportedContent"
                                                                aria-expanded="false" aria-label="Toggle navigation">Player Management</Link>
                                                            <ul className="sub-menu collapse" id="submenu-1-2">
                                                                <li className="nav-item"><Link to="/">Players</Link></li>
                                                                <li className="nav-item"><Link to="/">Matches</Link></li>
                                                                <li className="nav-item"><Link to="/">Goals</Link></li>
                                                                <li className="nav-item"><Link to="/">Minutes Played</Link></li>
                                                                <li className="nav-item"><Link to="/">Headers</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link className="dd-menu collapsed" to="/" data-bs-toggle="collapse"
                                                                data-bs-target="#submenu-1-3" aria-controls="navbarSupportedContent"
                                                                aria-expanded="false" aria-label="Toggle navigation">Match Management</Link>
                                                            <ul className="sub-menu collapse" id="submenu-1-3">
                                                                <li className="nav-item"><Link to="/">Players</Link></li>
                                                                <li className="nav-item"><Link to="/">Goals</Link></li>
                                                                <li className="nav-item"><Link to="/">Assists</Link></li>
                                                                <li className="nav-item"><Link to="/">Freekicks</Link></li>
                                                                <li className="nav-item"><Link to="/">Opposition Teams</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link className="dd-menu collapsed" to="/" data-bs-toggle="collapse"
                                                                data-bs-target="#submenu-1-3" aria-controls="navbarSupportedContent"
                                                                aria-expanded="false" aria-label="Toggle navigation">Training Management</Link>
                                                            <ul className="sub-menu collapse" id="submenu-1-3">
                                                                <li className="nav-item"><Link to="/">Players</Link></li>
                                                                <li className="nav-item"><Link to="/">Goals</Link></li>
                                                                <li className="nav-item"><Link to="/">Assists</Link></li>
                                                                <li className="nav-item"><Link to="/">Freekicks</Link></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* <!-- navbar collapse --> */}
                                            </nav>
                                            {/* <!-- End Navbar --> */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* <!-- End Header Bottom --> */}
                        </header>
                        {/* <!-- End Header Area --> */}
                    </>
                ) : (
                    <>
                    </>
                )
            }
        </>
    )
}

export default Header
