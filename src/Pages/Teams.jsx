import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiChatDeleteLine } from 'react-icons/ri';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrumb';
import { useStateValue } from '../Context/StateProvider';
import { db } from '../firebase';
import './Teams.css';


const Teams = () => {
    const [{ user }] = useStateValue();
    const [error, setError] = React.useState('');
    const [teams, setTeams] = useState([]);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [coach, setCoach] = useState('');
    const [owner, setOwner] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // select teams from the firebase database
    useEffect(() => {
        setLoading(true);
        db.collection('teams').onSnapshot(snapshot => {
            setTeams(snapshot.docs.map((doc, index) => ({
                id: doc.id,
                index: index + 1,
                timestamp: doc.data().timestamp?.toDate().toLocaleDateString(),
                username: doc.data().username,
                name: doc.data().name,
                location: doc.data().location,
                owner: doc.data().owner,
                coach: doc.data().coach,
            })));
            setLoading(false);
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '') {
            setError('Please enter the team name');
        } else if (location === '') {
            setError('Please enter the team location');
        } else if (coach === '') {
            setError('Please enter the team coach');
        } else {
            setError('');
            db.collection('teams').add({
                name: name,
                location: location,
                coach: coach,
                owner: owner,
                timestamp: new Date(),
                username: user.email,
            }).then(() => {
                setSuccess('Team added successfully');
                setName('');
                setLocation('');
                setCoach('');
                setOwner('');
                setTimeout(() => {
                    setSuccess('');
                }, 2000);
            }).catch((error) => {
                setError('Something went wrong', error.message);
            })
        }
    }

    //delete team
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this team ?')) {
            db.collection('teams').doc(id).delete().then(() => {
                setSuccess('Team deleted successfully');
                setTimeout(() => {
                    setSuccess('');
                }, 2000);
            }).catch((error) => {
                setError('Something went wrong', error.message);
            })
        }
    }

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
            {
                user ? (
                    <>
                        <Breadcrumb page={'Teams'} pagename={'Teams'} />
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
                                            {
                                                success !== '' ? (
                                                    <div className="alert alert-success">
                                                        {success}
                                                    </div>
                                                ) : ('')
                                            }
                                            <form className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Team Name</label>
                                                        <input value={name} onChange={event => setName(event.target.value)} className="form-control" type="text" id="name" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="location">Loaction</label>
                                                        <input value={location} onChange={event => setLocation(event.target.value)} className="form-control" type="text" id="location" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="coach">Coach Name</label>
                                                        <input value={coach} onChange={event => setCoach(event.target.value)} className="form-control" type="text" id="coach" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="owner">Owner's Name</label>
                                                        <input value={owner} onChange={event => setOwner(event.target.value)} className="form-control" type="text" id="owner" required="" />
                                                    </div>
                                                </div>
                                                <div className="button">
                                                    <button className="btn" type="submit" onClick={handleSubmit} >Create Team</button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="shopping-cart section">
                                    <div className="container">
                                        <div className="cart-list-head">
                                            {/* Teams Tables */}
                                            {
                                                loading ? (
                                                    <div className="alert alert-info">
                                                        <span>Loading...</span>
                                                    </div>
                                                ) : (
                                                    <MaterialTable title="Teams"
                                                        columns={[
                                                            { title: '#', field: 'index' },
                                                            { title: 'Name', field: 'name' },
                                                            { title: 'Location', field: 'location' },
                                                            { title: 'Coach', field: 'coach' },
                                                            { title: 'Owner', field: 'owner' },
                                                            { title: 'Created By', field: 'username' },
                                                            { title: 'Created On', field: 'timestamp' },
                                                            {
                                                                title: 'Action', field: 'action', render: rowData => (
                                                                    <div>
                                                                        <button className="btn btn-danger" onClick={() => {
                                                                            handleDelete(rowData.id)
                                                                        }}><RiChatDeleteLine /></button>
                                                                        <Link to={`/edit-team/${rowData.id}`} className="btn btn-primary"><FiEdit /></Link>
                                                                    </div>

                                                                )
                                                            }
                                                        ]}

                                                        data={teams}
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
                ) : (
                    Redirect('/login')
                )
            }
        </>
    )
}

export default Teams
