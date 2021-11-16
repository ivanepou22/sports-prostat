import React from 'react'
import { Link } from 'react-router-dom';
import './CreateSportType.css'
import { db } from '../firebase';
import firebase from "firebase";
import { useStateValue } from '../Context/StateProvider';
import Login from './Login'
import Breadcrumb from '../Components/Breadcrumb';

const CreateSportType = () => {
    const [code, setCode] = React.useState('');
    const [{ user }] = useStateValue();
    const [details, setDetails] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (code === '') {
            setError('Please enter a Sports Type code');
        } else if (details === '') {
            setError('Please enter a description');
        }
        else {
            db.collection('sports-type').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                code: code,
                description: details,
                username: user.email
            });
            setCode('');
            setDetails('');
            setError('');
        }
    }

    return (
        <>
            {
                user ? (
                    <>
                        <Breadcrumb page={'CreateSportsType'} pagename={'Create Sports Type'} />
                        <div className="account-login section">
                            <div className="container">
                                <div className="row">

                                    <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">

                                        <div className="col-lg-12 col-md-6 col-12 row-admd-cat">
                                            <div className="cart-list-head-right row-add">
                                                <Link to="/sporttype" className="link-class"><i className="lni lni-list icon-list-prod"></i>Available SportType</Link>
                                            </div>
                                        </div>
                                        <div className="register-form create-prod">
                                            {
                                                error !== '' ? (
                                                    <div className="alert alert-danger">
                                                        {error}
                                                    </div>
                                                ) : ('')
                                            }
                                            <form className="row">
                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label htmlFor="reg-fn">Sport Type Code</label>
                                                        <input value={code} onChange={event => setCode(event.target.value)} className="form-control" type="text" id="reg-fn" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label htmlFor="reg-pass-detail">Description</label>
                                                        <textarea value={details} onChange={event => setDetails(event.target.value)} className="form-control" type="text" id="reg-pass-detail" rows="4" required>
                                                        </textarea>
                                                    </div>
                                                </div>
                                                <div className="button">
                                                    <button className="btn" type="submit" onClick={handleSubmit} >Create SportType</button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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

export default CreateSportType
