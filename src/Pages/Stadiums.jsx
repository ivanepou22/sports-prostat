import React from 'react'
import { useStateValue } from '../Context/StateProvider';
import './Stadiums.css';
import Login from './Login';
import Breadcrumb from '../Components/Breadcrumb';
import MaterialTable from 'material-table';
import { db } from '../firebase';
import { RiChatDeleteLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import firebase from 'firebase';
//import { confirm } from 'react-bootstrap-confirmation';

//confirm dialog

const Stadiums = () => {
    const [{ user }] = useStateValue();
    const [stadiums, setStadiums] = React.useState([]);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [name, setName] = React.useState('');
    const [location, setLocation] = React.useState('');

    //get stadiums from firebase
    React.useEffect(() => {
        setLoading(true);
        //get stadiums from firebase
        db.collection('stadiums').onSnapshot(snapshot => {
            setStadiums(snapshot.docs.map((doc, index) => ({
                id: doc.id,
                index: index + 1,
                name: doc.data().name,
                location: doc.data().location,
                username: doc.data().username,
                timestamp: doc.data().timestamp?.toDate().toLocaleDateString()
            })));
            setLoading(false);
        }, error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    //add stadium to firebase
    const addStadium = (e) => {
        e.preventDefault();
        if (name === '') {
            setError('Please fill in the Name of the stadium');
        } else if (location === '') {
            setError('Please fill in the Location of the stadium');
        } else {
            db.collection('stadiums').add({
                name: name,
                location: location,
                username: user.email,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            setName('');
            setLocation('');
        }
    }

    //delete stadium from firebase
    const deleteStadium = (id) => {
        if (window.confirm('Are you sure you want to delete this stadium?')) {
            db.collection('stadiums').doc(id).delete();
        }
    }

    //update stadium in firebase
    const updateStadium = (id, name, location) => {
        db.collection('stadiums').doc(id).update({
            name: name,
            location: location
        });
    }

    //columns for material table
    const columns = [
        { title: '#', field: 'index', type: 'numeric' },
        { title: 'Name', field: 'name' },
        { title: 'Location', field: 'location' },
        { title: 'Username', field: 'username' },
        { title: 'Created_At', field: 'timestamp' },
        {
            title: 'Actions', field: 'actions', render: rowData => (
                <div>
                    <button onClick={() => deleteStadium(rowData.id)} className="btn btn-danger"><RiChatDeleteLine /></button>
                    <button onClick={() => updateStadium(rowData.id, rowData.name, rowData.location)} className="btn btn-primary"><FiEdit /></button>
                </div>
            )
        }
    ];

    //create options array
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
    };

    return (
        <>
            {!user ? <Login /> :
                (
                    <>
                        <Breadcrumb page={'Stadiums'} pagename={'Stadiums'} />
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
                                                        <label htmlFor="reg-fn">Stadium Name</label>
                                                        <input value={name} onChange={event => setName(event.target.value)} className="form-control" type="text" id="reg-fn" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="reg-fn">Stadium Location</label>
                                                        <input value={location} onChange={event => setLocation(event.target.value)} className="form-control" type="text" id="reg-fn" required="" />
                                                    </div>
                                                </div>
                                                <div className="button">
                                                    <button className="btn" type="submit" onClick={addStadium} >Create Stadium</button>
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
                                                        <span>Load...</span>
                                                    </div>
                                                ) : (
                                                    <MaterialTable title="Stadiums"
                                                        columns={columns}
                                                        data={stadiums}
                                                        options={options}
                                                    />
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Stadiums
