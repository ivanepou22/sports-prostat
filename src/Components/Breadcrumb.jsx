import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumb = ({ page, pagename }) => {
    return (
        <>
            <div className="breadcrumbs admin-breads">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="breadcrumbs-content">
                                <h1 className="page-title">{pagename}</h1>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <ul className="breadcrumb-nav">
                                <li><Link to="/"><i className="lni lni-home"></i> {page}</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Breadcrumb
