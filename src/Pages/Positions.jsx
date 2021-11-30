import React from 'react';
import Breadcrumb from '../Components/Breadcrumb';
import { db } from '../firebase';
import Login from './Login';
import './Positions.css';
import firebase from "firebase";
import { useStateValue } from '../Context/StateProvider';
import MaterialTable from 'material-table';
import { RiChatDeleteLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';

const Positions = () => {
    const [code, setCode] = React.useState('');
    const [{ user }] = useStateValue();
    const [details, setDetails] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

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


    //DONE: select posiion from firebase
    const [positions, setPositions] = React.useState([]);
    React.useEffect(() => {
        setLoading(true);
        db.collection('positions').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPositions(snapshot.docs.map((doc, index) => ({
                id: doc.id,
                index: index + 1,
                code: doc.data().code,
                description: doc.data().description,
                username: doc.data().username,
                timestamp: doc.data().timestamp?.toDate().toLocaleDateString()
            })));
            setLoading(false);
        })
    }, [])

    const columns = [
        { title: '#', field: 'index' },
        { title: 'Position_Code', field: 'code' },
        { title: 'Description', field: 'description' },
        { title: 'Created_By', field: 'username' },
        { title: 'Created_On', field: 'timestamp' },
        {
            title: 'Action(Delete/Edit)', field: 'action', render: rowData => (
                <>
                    <button className="btn btn-danger" onClick={() => {
                        if (window.confirm('Are you sure you wish to delete this position?')) {
                            db.collection('positions').doc(rowData.id).delete();
                        }
                    }}><RiChatDeleteLine /></button>
                    {/* //update */}
                    <button className="btn btn-primary" onClick={() => {
                        setCode(rowData.code);
                        setDetails(rowData.description);
                        setError('');
                    }}><FiEdit /></button>
                </>
            )

        }
    ];

    //create columns array
    const options = {
        actionsColumnIndex: -1,
        exportButton: false,
        exportAllData: false,
        padding: 'dense',
        pageSize: 10,
        pageSizeOptions: [10, 20, 50, 100],
        search: true,
        searchFieldAlignment: 'right',
        searchFieldStyle: {
            fontSize: '14px',
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ced4da',
            width: '100%'
        },
        headerStyle: {
            fontSize: '14px',
            backgroundColor: '#f1f1f1',
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ced4da',
            width: '100%'
        },
        rowStyle: {
            fontSize: '14px',
            backgroundColor: '#f1f1f1',
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ced4da',
            width: '100%'
        },
        cellStyle: {
            fontSize: '14px',
            backgroundColor: '#f1f1f1',
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ced4da',
        },
    }

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
                                            {
                                                loading ? (
                                                    <div className="alert alert-info">
                                                        Loading...
                                                    </div>
                                                ) : (
                                                    <MaterialTable title="Positions"
                                                        columns={columns}
                                                        data={positions}
                                                        options={options}
                                                    />
                                                )
                                            }
                                            {/* Positions Tables */}

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
