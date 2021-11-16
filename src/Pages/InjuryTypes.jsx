import React from 'react';
import './InjuryTypes.css';
import firebase from "firebase";
import { useStateValue } from '../Context/StateProvider';
import MaterialTable from 'material-table';
import Breadcrumb from '../Components/Breadcrumb';
import { db } from '../firebase';
import Login from './Login';

const InjuryTypes = () => {
    const [code, setCode] = React.useState('');
    const [{ user }] = useStateValue();
    const [details, setDetails] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (code === '') {
            setError('Please enter a Injury Type code');
        } else if (details === '') {
            setError('Please enter a description');
        }
        else {
            db.collection('injury-type').add({
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


    // select injury Types from firebase
    const [injuryType, setInjuryType] = React.useState([]);
    React.useEffect(() => {
        db.collection('injury-type').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setInjuryType(snapshot.docs.map(doc => ({
                id: doc.id,
                code: doc.data().code,
                description: doc.data().description,
                username: doc.data().username,
                timestamp: doc.data().timestamp?.toDate().toLocaleDateString()
            })))
        })
    }, [])

    return (
        <>
            {
                user ? (
                    <>
                        <Breadcrumb page={'InjuryTypes'} pagename={'Injury Types'} />
                        <div className="account-login section">
                            <div className="container">
                                <div className="row">

                                    <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
                                        <div className="register-form create-prod">
                                            {
                                                error !== '' ? (
                                                    <div className="alert alert-danger">
                                                        {error}
                                                    </div>
                                                ) : ('')
                                            }
                                            <form className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="reg-fn">Injury Code</label>
                                                        <input value={code} onChange={event => setCode(event.target.value)} className="form-control" type="text" id="reg-fn" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="reg-pass-detail">Description</label>
                                                        <textarea value={details} onChange={event => setDetails(event.target.value)} className="form-control" type="text" id="reg-pass-detail" rows="4" required>
                                                        </textarea>
                                                    </div>
                                                </div>
                                                <div className="button">
                                                    <button className="btn" type="submit" onClick={handleSubmit} >Create Injury Type</button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="shopping-cart section">
                                    <div className="container">
                                        <div className="cart-list-head">
                                            {/* Positions Tables */}
                                            <MaterialTable title="Injury Types"
                                                columns={[
                                                    { title: 'Position Code', field: 'code' },
                                                    { title: 'Description', field: 'description' },
                                                    { title: 'Created By', field: 'username' },
                                                    { title: 'Created On', field: 'timestamp' }
                                                ]}
                                                data={injuryType}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    pageSize: 5,
                                                    pageSizeOptions: [5, 10, 20, 30],
                                                    headerStyle: {
                                                        backgroundColor: '#01579b',
                                                        color: '#FFF'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                        padding: '-20px 0 !important'
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <Login />
                )
            }
        </>
    )
}

export default InjuryTypes
