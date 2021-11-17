import React, { useEffect, useState } from 'react'
import Breadcrumb from '../Components/Breadcrumb';
import TableData from '../Components/TableData';
import { useStateValue } from '../Context/StateProvider';
import { db } from '../firebase';
import Login from './Login';
import './Players';

const Players = () => {
    const [players, setPlayers] = useState([]);
    const [{ user }] = useStateValue();
    const columns = [
        { title: 'Full_Name', field: 'full_name' },
        { title: 'Email', field: 'email' },
        { title: 'Phone', field: 'phone' },
        { title: 'NIN', field: 'nin' },
        { title: 'Gender', field: 'gender' },
        { title: 'DOB', field: 'dob' },
        { title: 'Height', field: 'height' },
        { title: 'Weight', field: 'weight' },
        { title: 'College', field: 'school' },
        { title: 'Reg_Date', field: 'entry_date' },
        { title: 'Age_Group', field: 'age_group' },
        { title: 'Position', field: 'position' },
        { title: 'Team', field: 'team' },
        { title: 'Sport', field: 'type_of_sport' },
        { title: 'Status', field: 'status' },
    ]

    // select players from firebase
    useEffect(() => {
        db.collection('player').onSnapshot(snapshot => {
            setPlayers(snapshot.docs.map(doc => ({
                id: doc.id,
                full_name: doc.data().first_name + ' ' + doc.data().last_name,
                email: doc.data().email,
                phone: doc.data().phone,
                nin: doc.data().nin,
                gender: doc.data().gender,
                dob: doc.data().dob?.toDate().toLocaleDateString(),
                height: doc.data().height,
                weight: doc.data().weight,
                school: doc.data().school,
                entry_date: doc.data().entry_date?.toDate().toLocaleDateString(),
                age_group: doc.data().age_group,
                position: doc.data().position,
                team: doc.data().team,
                type_of_sport: doc.data().type_of_sport,
                status: doc.data().status,
                father: doc.data().father,
                mother: doc.data().mother,
                nextofkin: doc.data().nextofkin,
                username: doc.data().username,
                timestamp: doc.data().timestamp?.toDate().toLocaleDateString(),
            })))
        })
    }, [])

    const options = {
        actionsColumnIndex: -1,
        padding: "dense",
        pageSize: 5,
        pageSizeOptions: [5, 10, 20, 30],
        headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF'
        }
    }

    console.log(players)
    return (
        <>
            {
                user ? (
                    <>
                        <Breadcrumb page={'Players'} pagename={'Players'} />
                        <TableData data={players} columns={columns} title={'Players'} options={options} pageName={'Add Player'} linkPath={'createplayer'} />
                    </>
                ) : (
                    <Login />
                )
            }
        </>
    )
}

export default Players
