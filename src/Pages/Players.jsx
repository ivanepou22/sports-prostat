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
        { title: 'Action', field: 'action' },
    ]

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
    }, [])

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

    //select positions from firebase
    const [positions, setPositions] = useState([]);
    useEffect(() => {
        db.collection('positions').onSnapshot(snapshot => {
            setPositions(snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })))
        })
    }, [players])

    //select teams from firebase
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        db.collection('teams').onSnapshot(snapshot => {
            setTeams(snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })))
        })
    }, [players])

    //select sports from firebase
    const [sports, setSports] = useState([]);
    useEffect(() => {
        db.collection('sports-type').onSnapshot(snapshot => {
            setSports(snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })))
        })
    }, [players])


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
