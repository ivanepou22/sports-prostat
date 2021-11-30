import React from 'react'
import { db } from '../firebase';
import './Matches.css'
import Login from './Login';
import TableData from '../Components/TableData';
import Breadcrumb from '../Components/Breadcrumb';
import { useStateValue } from '../Context/StateProvider';

const Matches = () => {
    const [{ user }] = useStateValue();
    const [matches, setMatches] = React.useState([]);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    //get matches from firebase
    React.useEffect(() => {
        setLoading(true);
        //get matches from firebase
        db.collection('matches').onSnapshot(snapshot => {
            setMatches(snapshot.docs.map(doc => ({
                id: doc.id,
                homeTeam: doc.data().homeTeam,
                awayTeam: doc.data().awayTeam,
                homeScore: doc.data().homeScore,
                awayScore: doc.data().awayScore,
                match_date: doc.data().match_date,
                from_time: doc.data().from_time,
                to_time: doc.data().to_time,
                stadium: doc.data().stadium,
                username: doc.data().username,
                timestamp: doc.data().timestamp?.toDate().toLocaleDateString()
            })));
            setLoading(false);
        }, error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    //Create a columns array
    const columns = [
        { title: 'Match ID', field: 'id' },
        { title: 'Match Date', field: 'match_date' },
        { title: 'Home Team', field: 'homeTeam' },
        { title: 'Away Team', field: 'awayTeam' },
        { title: 'Stadium', field: 'stadium' },
        { title: 'Home Score', field: 'homeScore' },
        { title: 'Away Score', field: 'awayScore' },
        { title: 'From Time', field: 'from_time' },
        { title: 'To Time', field: 'to_time' },
        { title: 'Username', field: 'username' },
        { title: 'Timestamp', field: 'timestamp' },
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
            width: '100%'
        },
    }

    return (
        <>
            {
                user ? (
                    <>
                        <Breadcrumb page={'Matches'} pagename={'Matches'} />
                        {
                            error !== '' ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : ('')
                        }
                        {
                            loading ? (
                                <div className="alert alert-info">
                                    Loading...
                                </div>
                            ) : (
                                <TableData data={matches} columns={columns} title={'Matches'} options={options} pageName={'Add Match'} linkPath={'createMatch'} />
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

export default Matches
