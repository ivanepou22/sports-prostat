import React, { useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiChatDeleteLine } from 'react-icons/ri';
import { Redirect } from 'react-router';
import { useStateValue } from '../Context/StateProvider';
import { db } from '../firebase';
import './Seasons.css'
import Breadcrumb from '../Components/Breadcrumb'
import TableData from '../Components/TableData';

const LeagueSeasons = () => {
    const [{ user }] = useStateValue();
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [seasons, setSeasons] = React.useState([]);
    const [name, setName] = React.useState('');
    const [actionSuccess, setActionSuccess] = React.useState('');
    const [actionError, setActionError] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    // Get all seasons from the firebase
    useEffect(() => {
        setLoading(true);
        db.collection('seasons').onSnapshot(snapshot => {
            setSeasons(snapshot.docs.map((doc, index) => ({
                id: doc.id,
                index: index + 1,
                username: doc.data().username,
                name: doc.data().name,
                startDate: doc.data().startDate,
                endDate: doc.data().endDate,
                timestamp: doc.data().timestamp?.toDate().toLocaleDateString()
            })));
            setLoading(false);
        })
    }, [])


    // Add a new season
    const addSeason = (e) => {
        e.preventDefault();
        if (name === '') {
            setError('Please fill in the Name')
        } else if (startDate === '') {
            setError('Please fill in the Start Date')
        } else if (endDate === '') {
            setError('Please fill in the End Date')
        } else {
            db.collection('seasons').add({
                name: name,
                startDate: startDate,
                endDate: endDate,
                timestamp: new Date(),
                username: user.email
            }).then(() => {
                setSuccess('Season added successfully')
                setName('')
                setStartDate('')
                setEndDate('')
                setTimeout(() => {
                    setSuccess('')
                }, 3000)
            }).catch((err) => {
                setError('Something went wrong ' + err.message);
                setTimeout(() => {
                    setError('')
                }, 3000)
            })
        }
    }

    //delete a season
    const deleteSeason = (id) => {
        if (window.confirm('Are you sure you want to delete this season?')) {
            db.collection('seasons').doc(id).delete().then(() => {
                setActionSuccess('Season deleted successfully')
                setTimeout(() => {
                    setActionSuccess('');
                }, 3000);
            }).catch((err) => {
                setActionError('Something went wrong ' + err.message);
                setTimeout(() => {
                    setActionError('');
                }, 3000);
            })
        }
    }

    //edit a season
    const editSeason = (id, name, startDate, endDate) => {
        setName(name)
        setStartDate(startDate)
        setEndDate(endDate)
        setTimeout(() => {
            setName('')
            setStartDate('')
            setEndDate('')
        }, 3000)
    }

    //update a season
    const updateSeason = (id) => {
        if (name === '') {
            setError('Please fill in the Name')
        } else if (startDate === '') {
            setError('Please fill in the Start Date')
        } else if (endDate === '') {
            setError('Please fill in the End Date')
        } else {
            db.collection('seasons').doc(id).update({
                name: name,
                startDate: startDate,
                endDate: endDate,
                timestamp: new Date(),
                username: user.email
            }).then(() => {
                setSuccess('Season updated successfully')
                setName('')
                setStartDate('')
                setEndDate('')
                setTimeout(() => {
                    setSuccess('')
                }, 3000)
            }).catch((err) => {
                setError('Something went wrong ' + err.message);
                setTimeout(() => {
                    setError('')
                }, 3000)
            })
        }
    }

    const columns = [
        { title: '#', field: 'index' },
        { title: 'Name', field: 'name' },
        { title: 'StartDate', field: 'startDate' },
        { title: 'EndDate', field: 'endDate' },
        { title: 'Created_By', field: 'username' },
        { title: 'Created_On', field: 'timestamp' },
        {
            title: 'Action', field: 'action', render: rowData => (
                <div>
                    <button className="btn btn-danger" onClick={() => {
                        deleteSeason(rowData.id)
                    }}><RiChatDeleteLine /></button>
                    <button className="btn btn-primary" onClick={() => {
                        if (window.confirm('Are you sure you want to edit this League ?')) {
                            window.location.href = `/season/${rowData.id}`
                        }
                    }}><FiEdit /></button>
                </div>

            )
        }
    ]

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
                        <Breadcrumb page={'Seasons'} pagename={'Seasons'} />
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
                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Name</label>
                                                        <input value={name} onChange={event => setName(event.target.value)} className="form-control" type="text" id="name" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="coach">Start Date</label>
                                                        <input value={startDate} onChange={event => setStartDate(event.target.value)} className="form-control" type="date" id="coach" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="owner">End Date</label>
                                                        <input value={endDate} onChange={event => setEndDate(event.target.value)} className="form-control" type="date" id="owner" required="" />
                                                    </div>
                                                </div>
                                                <div className="button">
                                                    <button className="btn" type="submit" onClick={addSeason} >Create Season</button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="shopping-cart section">
                                    <div className="container">
                                        <div className="cart-list-head">
                                            {
                                                actionSuccess !== '' ? (
                                                    <div className="alert alert-success">
                                                        {actionSuccess}
                                                    </div>
                                                ) : ('')
                                            }
                                            {
                                                actionError !== '' ? (
                                                    <div className="alert alert-danger">
                                                        {actionError}
                                                    </div>
                                                ) : ('')
                                            }
                                            {/* Seasons Tables */}
                                            {
                                                loading ? (
                                                    <div className="aleart alert-info">
                                                        <span>Loading...</span>
                                                    </div>
                                                ) : (
                                                    <TableData title={'Seasons'} columns={columns} data={seasons} options={options} />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <Redirect to="/login" />
                )}
        </>
    )
}

export default LeagueSeasons
