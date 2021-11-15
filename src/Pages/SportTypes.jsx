import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrumb';
import SportTypeCard from '../Components/SportTypeCard';
import { db } from '../firebase';
import './SportTypes.css'

const SportTypes = () => {
    const [sportTypes, setSportTypes] = useState([]);
    //get data from firebase
    useEffect(() => {
        db.collection('sports-type')
            .onSnapshot(snapshot => {
                setSportTypes(snapshot.docs.map(doc => ({
                    id: doc.id,
                    sportType: doc.data()
                })))
            })
    }, [])

    return (
        <>
            <Breadcrumb page={'Sports Type'} pagename={'Sports Type'} />

            <div className="shopping-cart section">
                <div className="container">
                    <div className="cart-list-head">
                        <div className="row">
                            <div className="col-lg-12 col-md-6 col-12 row-admd">
                                <div className="cart-list-head-right row-add">
                                    <Link to="/"><i className="lni lni-plus"></i> Add Sports Type</Link>
                                </div>
                            </div>
                        </div>
                        <div className="cart-list-title">
                            <div className="row">
                                <div className="col-lg-1 col-md-3 col-12">
                                    <p> No.</p>
                                </div>
                                <div className="col-lg-2 col-md-3 col-12">
                                    <p>id</p>
                                </div>
                                <div className="col-lg-2 col-md-1 col-12">
                                    <p>Code</p>
                                </div>
                                <div className="col-lg-3 col-md-3 col-12">
                                    <p>Description</p>
                                </div>
                                <div className="col-lg-2 col-md-3 col-12">
                                    <p>Created By</p>
                                </div>
                                <div className="col-lg-2 col-md-2 col-12">
                                    <p>Created At</p>
                                </div>
                            </div>
                        </div>

                        {
                            sportTypes.map(({ id, sportType }, index) => (
                                <SportTypeCard key={id} index={index} sportType={sportType} id={id} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SportTypes
