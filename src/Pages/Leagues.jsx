import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import Breadcrumb from '../Components/Breadcrumb';
import { useStateValue } from '../Context/StateProvider';
import { RiChatDeleteLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { db } from '../firebase';
import './Leagues.css';

const Leagues = () => {
    const [{ user }] = useStateValue()
    const [leagues, setLeagues] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [actionSuccess, setActionSuccess] = useState('')
    const [actionError, setActionError] = useState('')

    // get leagues from firebase database
    useEffect(() => {
        db.collection('leagues').onSnapshot(snapshot => {
            setLeagues(snapshot.docs.map((doc) => ({
                id: doc.id,
                timestamp: doc.data().timestamp?.toDate().toLocaleDateString(),
                username: doc.data().username,
                name: doc.data().name,
                description: doc.data().description,
                startDate: doc.data().startDate,
                endDate: doc.data().endDate,
            })))
        })
    }, [])

    // delete league from firebase database
    const deleteLeague = (id) => {
        if (window.confirm('Are you sure you want to delete this League ?')) {
            db.collection('leagues').doc(id).delete().then(() => {
                setActionSuccess('League deleted successfully');
                setTimeout(() => {
                    setActionSuccess('');
                }, 3000);
            }).catch((error) => {
                setActionError('Something went wrong', error.message);
            })
        }
    }

    // add league to firebase database
    const addLeague = (e) => {
        e.preventDefault()
        if (name === '') {
            setError('Please enter name')
        } else if (description === '') {
            setError('Please enter description')
        } else if (startDate === '') {
            setError('Please enter start date')
        } else if (endDate === '') {
            setError('Please enter end date')
        } else {
            db.collection('leagues').add({
                username: user.email,
                name: name,
                description: description,
                startDate: startDate,
                endDate: endDate,
                timestamp: new Date(),
            })
            setName('')
            setDescription('')
            setStartDate('')
            setEndDate('')
            setSuccess('League added successfully')
            setTimeout(() => {
                setSuccess('')
            }, 3000)
        }
    }

    return (
        <>
            {
                user ? (
                    <>
                        <Breadcrumb page={'Leagues'} pagename={'Leagues'} />
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
                                                        <label htmlFor="name">Name</label>
                                                        <input value={name} onChange={event => setName(event.target.value)} className="form-control" type="text" id="name" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="location">Description</label>
                                                        <input value={description} onChange={event => setDescription(event.target.value)} className="form-control" type="text" id="location" required="" />
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
                                                    <button className="btn" type="submit" onClick={addLeague} >Create League</button>
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
                                            {/* Positions Tables */}
                                            <MaterialTable title="Leagues"
                                                columns={[
                                                    { title: 'League___Name', field: 'name' },
                                                    { title: 'League_Description', field: 'description' },
                                                    { title: 'StartDate', field: 'startDate' },
                                                    { title: 'EndDate', field: 'endDate' },
                                                    { title: 'Created_By', field: 'username' },
                                                    { title: 'Created_On', field: 'timestamp' },
                                                    {
                                                        title: 'Delete/Edit', field: 'action', render: rowData => (
                                                            <div>
                                                                <button className="btn btn-danger" onClick={() => {
                                                                    deleteLeague(rowData.id)
                                                                }}><RiChatDeleteLine /></button>
                                                                <button className="btn btn-primary" onClick={() => {
                                                                    if (window.confirm('Are you sure you want to edit this League ?')) {
                                                                        window.location.href = `/league/${rowData.id}`
                                                                    }
                                                                }}><FiEdit /></button>
                                                            </div>

                                                        )
                                                    }
                                                ]}

                                                data={leagues}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    pageSize: 5,
                                                    padding: "dense",
                                                    pageSizeOptions: [5, 10, 20, 30],
                                                    headerStyle: {
                                                        backgroundColor: '#01579b',
                                                        color: '#FFF'
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
                    Redirect('/login')
                )
            }
        </>
    )
}

export default Leagues
