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
    const [isLoading, setIsLoading] = useState(false);

    // select sport type from firebase
    useEffect(() => {
        setIsLoading(true);
        db.collection('sports-type').onSnapshot(snapshot => {
            setSportTypes(snapshot.docs.map((doc, index) => ({
                id: doc.id,
                index: index + 1,
                code: doc.data().code,
                description: doc.data().description,
                username: doc.data().username,
                timestamp: doc.data().timestamp?.toDate().toLocaleDateString()
            })));
            setIsLoading(false);
        })
    }, [])

    const columns = [
        { title: '#', field: 'index' },
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
                        <Breadcrumb page={'Sports Type'} pagename={'Sports Type'} />
                        {
                            isLoading ? (
                                <div className="alert alert-info">
                                    Loading...
                                </div>
                            ) : (
                                <TableData data={sportTypes} columns={columns} title={'Sport Type'} options={options} pageName={'Add Sport Type'} linkPath={'createsporttype'} />
                            )
                        }

                    </>
                ) : (
                    <Login />
                )
            }
        </>
    )
}

export default SportTypes
