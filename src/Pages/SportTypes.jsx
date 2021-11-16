import React, { useEffect, useState } from 'react'
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
        { title: 'Created On', field: 'timestamp' }
    ];

    const options = {
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
