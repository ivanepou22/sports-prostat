import React from 'react';
import Breadcrumb from '../Components/Breadcrumb';
import { db } from '../firebase';
import Login from './Login';
import './Positions.css';
import firebase from "firebase";
import { useStateValue } from '../Context/StateProvider';
import MaterialTable from 'material-table';

const Positions = () => {
    const [code, setCode] = React.useState('');
    const [{ user }] = useStateValue();
    const [details, setDetails] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (code === '') {
            setError('Please enter a Position code');
        } else if (details === '') {
            setError('Please enter a description');
        }
        else {
            db.collection('positions').add({
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


    //TODO: select posiion from firebase
    const [positions, setPositions] = React.useState([]);
    React.useEffect(() => {
        db.collection('positions').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPositions(snapshot.docs.map(doc => ({
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
                        <Breadcrumb page={'Positions'} pagename={'Positions'} />
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
                                                        <label htmlFor="reg-fn">Position Code</label>
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
                                                    <button className="btn" type="submit" onClick={handleSubmit} >Create Position</button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="shopping-cart section">
                                    <div className="container">
                                        <div className="cart-list-head">
                                            {/* Positions Tables */}
                                            <MaterialTable title="Positions"
                                                columns={[
                                                    { title: 'Position Code', field: 'code' },
                                                    { title: 'Description', field: 'description' },
                                                    { title: 'Created By', field: 'username' },
                                                    { title: 'Created On', field: 'timestamp' }
                                                ]}
                                                data={positions}
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

export default Positions
