import React from 'react'
import './Table.css'
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom'

const TableData = ({ data, columns, title, options, pageName, linkPath }) => {
    return (
        <>
            <div className="shopping-cart section">
                <div className="container">
                    <div className="cart-list-head">
                        <div className="row">
                            <div className="col-lg-12 col-md-6 col-12 row-admd">
                                <div className="cart-list-head-right row-add">
                                    <Link to={`/${linkPath}`}><i className="lni lni-plus"></i> {pageName}</Link>
                                </div>
                            </div>
                        </div>
                        {/* material table */}
                        <MaterialTable title={title}
                            columns={columns}
                            data={data}
                            options={options}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableData
