import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import { RiChatDeleteLine } from 'react-icons/ri';
import Breadcrumb from '../Components/Breadcrumb';
import TableData from '../Components/TableData';
import { useStateValue } from '../Context/StateProvider';
import { db } from '../firebase';
import Login from './Login';
import './Players';

const Players = () => {
    const [players, setPlayers] = useState([]);
    const [{ user }] = useStateValue();
    const [sports, setSports] = useState([]);
    const [positions, setPositions] = useState([]);
    const [teams, setTeams] = useState([]);

    //convert string to a date
    const convertDate = (date) => {
        let newDate = new Date(date);
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${month}/${day}/${year}`;
    }
    //get table columns
    const columns = [
        { title: 'No.', field: 'index' },
        { title: 'Full_Name', field: 'full_name' },
        { title: 'Email', field: 'email' },
        { title: 'Phone', field: 'phone' },
        { title: 'NIN', field: 'nin' },
        { title: 'Gender', field: 'gender' },
        { title: 'DOB', field: 'dob' },
        { title: 'Age', field: 'age' },
        { title: 'Height', field: 'height' },
        { title: 'Weight', field: 'weight' },
        { title: 'College', field: 'school' },
        { title: 'Reg_Date', field: 'entry_date' },
        { title: 'Age_Group', field: 'age_group' },
        { title: 'Position', field: 'position' },
        { title: 'Team', field: 'team' },
        { title: 'Sport', field: 'type_of_sport' },
        { title: 'Status', field: 'status' },
        { title: 'Jersey', field: 'jersey' },
        {
            title: 'Actions__', field: 'action', render: rowData => (
                <div>
                    <button className="btn btn-danger" onClick={() => deletePlayer(rowData.id)}><RiChatDeleteLine /></button>
                    <button className="btn btn-primary" onClick={() => editPlayer(rowData.id)}><FiEdit /></button>
                </div>
            )
        },
    ]

    //delete player
    const deletePlayer = (id) => {
        if (window.confirm('Are you sure you wish to delete this player?')) {
            db.collection('players').doc(id).delete();
        }
    }

    //edit player
    const editPlayer = (id) => {
        console.log(id);
    }
    // select players from firebase
    useEffect(() => {
        //calculate age from dob
        const calculateAge = (dob) => {
            var today = new Date();
            var birthDate = new Date(dob);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age = age - 1;
            }
            return age;
        }

        //get teams from firebase
        db.collection('teams').onSnapshot(snapshot => {
            setTeams(snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })))
        })

        //get positions from firebase
        db.collection('positions').onSnapshot(snapshot => {
            setPositions(snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })))
        })

        //get sports from firebase
        db.collection('sports-type').onSnapshot(snapshot => {
            setSports(snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })))
        })

        //get players from firebase
        db.collection('player').onSnapshot(snapshot => {
            setPlayers(snapshot.docs.map((doc, index) => ({
                id: doc.id,
                index: index + 1,
                full_name: doc.data().first_name + ' ' + doc.data().last_name,
                email: doc.data().email,
                phone: doc.data().phone,
                nin: doc.data().nin,
                gender: doc.data().gender,
                dob: doc.data().dob,
                age: calculateAge(convertDate(doc.data().dob)),
                height: doc.data().height,
                weight: doc.data().weight,
                school: doc.data().school,
                entry_date: doc.data().entry_date,
                age_group: doc.data().age_group,
                position: positions.filter(position => position.id === doc.data().position).map(position => position.code),
                team: teams.filter(team => team.id === doc.data().team).map(team => team.name),
                type_of_sport: sports.filter(sport => sport.id === doc.data().type_of_sport).map(sport => sport.code),
                status: doc.data().status,
                father: doc.data().father,
                mother: doc.data().mother,
                nextofkin: doc.data().nextofkin,
                username: doc.data().username,
                jersey: doc.data().jersey,
                timestamp: doc.data().timestamp?.toDate().toLocaleDateString(),
            })))
        })
    }, [positions, teams, sports])

    //Material table options
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
