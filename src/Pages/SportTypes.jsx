import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import { RiChatDeleteLine } from 'react-icons/ri';
import Breadcrumb from '../Components/Breadcrumb';
import TableData from '../Components/TableData';
import { useStateValue } from '../Context/StateProvider';
import { db } from '../firebase';
import Login from './Login';
import './SportTypes.css'

const SportTypes = () => {
    const [sportTypes, setSportTypes] = useState([]);
    const [{ user }] = useStateValue();

    // select sport type from firebase
    useEffect(() => {
        db.collection('sports-type').onSnapshot(snapshot => {
            setSportTypes(snapshot.docs.map(doc => ({
                id: doc.id,
                code: doc.data().code,
                description: doc.data().description,
                username: doc.data().username,
                timestamp: doc.data().timestamp?.toDate().toLocaleDateString()
            })))
        })
    }, [])

    const columns = [
        { title: 'Position Code', field: 'code' },
        { title: 'Description', field: 'description' },
        { title: 'Created By', field: 'username' },
        { title: 'Created On', field: 'timestamp' },
        {
            title: 'Action', field: 'action', render: rowData => (
                <div className="action-buttons">
                    <button className="btn btn-danger btn-sm" onClick={() => {
                        if (window.confirm('Are you sure you wish to delete this Sport type?')) {
                            db.collection('sports-type').doc(rowData.id).delete();
                        }
                    }}><RiChatDeleteLine /></button>
                    <button className="btn btn-primary btn-sm" onClick={() => {
                        console.log(rowData.id)
                    }}><FiEdit /></button>
                </div>
            )
        }
    ]


    const options = {
        actionsColumnIndex: -1,
        pageSize: 5,
        padding: "dense",
        pageSizeOptions: [5, 10, 20, 30],
        headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF'
        }
    }
    return (
        <>
            {
                user ? (
                    <>
                        <Breadcrumb page={'Sports Type'} pagename={'Sports Type'} />
                        <TableData data={sportTypes} columns={columns} title={'Sport Type'} options={options} pageName={'Add Sport Type'} linkPath={'createsporttype'} />
                    </>
                ) : (
                    <Login />
                )
            }
        </>
    )
}

export default SportTypes
