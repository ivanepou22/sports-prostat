import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrumb';
import { db, storage } from '../firebase';
import firebase from "firebase";
import './CreatePlayer.css';
import { useStateValue } from '../Context/StateProvider';
import { Redirect, useHistory } from 'react-router';

const CreatePlayer = () => {
    const history = useHistory();
    const [{ user }] = useStateValue();
    const [positions, setPositions] = useState([]);
    const [sports, setSports] = useState([]);
    const [teams, setTeams] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [image, setImage] = useState(null);
    const [entryDate, setEntryDate] = useState('');
    const [drivingLicense, setDrivingLicense] = useState('');
    const [progress, setProgress] = useState(0);
    const [nin, setNin] = useState('');
    const [college, setCollege] = useState('');
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [jersey, setJersey] = useState(0);
    const [ageGroup, setAgeGroup] = useState('');
    const [position, setPosition] = useState('');
    const [sport, setSport] = useState('');
    const [team, setTeam] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [postCode, setPostCode] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [street, setStreet] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    // father's information
    const [fatherFirstName, setFatherFirstName] = useState('');
    const [fatherLastName, setFatherLastName] = useState('');
    const [fatherEmail, setFatherEmail] = useState('');
    const [fatherPhone, setFatherPhone] = useState('');
    const [fatherNin, setFatherNin] = useState('');
    const [fatherAddress, setFatherAddress] = useState('');

    //mother's information
    const [motherFirstName, setMotherFirstName] = useState('');
    const [motherLastName, setMotherLastName] = useState('');
    const [motherEmail, setMotherEmail] = useState('');
    const [motherPhone, setMotherPhone] = useState('');
    const [motherNin, setMotherNin] = useState('');
    const [motherAddress, setMotherAddress] = useState('');

    //nextOfKin information
    const [nextOfKinFirstName, setNextOfKinFirstName] = useState('');
    const [nextOfKinMiddleName, setNextOfKinMiddleName] = useState('');
    const [nextOfKinLastName, setNextOfKinLastName] = useState('');
    const [nextOfKinEmail, setNextOfKinEmail] = useState('');
    const [nextOfKinPhone, setNextOfKinPhone] = useState('');
    const [nextOfKinNin, setNextOfKinNin] = useState('');
    const [nextOfKinAddress, setNextOfKinAddress] = useState('');
    const [nextOfKinRelationship, setNextOfKinRelationship] = useState('');


    //select positions from firebase
    useEffect(() => {
        db.collection('positions').onSnapshot(snapshot => {
            setPositions(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            )));
        });
    }, []);

    //converting date to firebase format
    const convertDate = (date) => {
        let dateArray = date.split('-');
        let newDate = dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0];
        return newDate;
    }

    //select teams from firebase
    useEffect(() => {
        db.collection('teams').onSnapshot(snapshot => {
            setTeams(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            )));
        });
    }, []);
    //select type of sport from firebase
    useEffect(() => {
        db.collection('sports-type').onSnapshot(snapshot => {
            setSports(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            )));
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (firstName === '') {
            setError('Please enter a first name');
        } else if (gender === '') {
            setError('Please enter the gender')
        } else if (lastName === '') {
            setError('Please enter the Last name')
        } else if (birthDate === '') {
            setError('Please enter the Birth Date')
        } else if (entryDate === '') {
            setError('Please enter the Entry Date')
        } else if (image === null) {
            setError('Please enter the Image')
        } else if (fatherFirstName === '') {
            setError('Please enter the Father First Name')
        } else if (fatherLastName === '') {
            setError('Please enter the Father Last Name')
        } else if (fatherAddress === '') {
            setError('Please enter the Father Address')
        } else if (motherFirstName === '') {
            setError('Please enter the Mother First Name')
        } else if (motherLastName === '') {
            setError('Please enter the Mother Last Name')
        } else if (motherAddress === '') {
            setError('Please enter the Mother Address')
        } else if (nextOfKinFirstName === '') {
            setError('Please enter the Next Of Kin First Name')
        } else if (nextOfKinLastName === '') {
            setError('Please enter the Next Of Kin Last Name')
        } else if (nextOfKinAddress === '') {
            setError('Please enter the Next Of Kin Address')
        }
        else {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // progrss function ....
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress);
                },
                (error) => {
                    // error function ....
                    console.log(error);
                },
                () => {
                    // complete function ....
                    storage.ref('images').child(image.name).getDownloadURL().then(url => {
                        db.collection('player').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            age_group: ageGroup,
                            dob: convertDate(birthDate),
                            email: email,
                            entry_date: convertDate(entryDate),
                            first_name: firstName,
                            last_name: lastName,
                            middle_name: middleName,
                            gender: gender,
                            image: url,
                            height: parseInt(height),
                            jersey: parseInt(jersey),
                            nin: nin,
                            phone: phone,
                            position: position,
                            school: college,
                            team: team,
                            status: status,
                            type_of_sport: sport,
                            username: user.email,
                            weight: parseInt(weight),
                            address: {
                                city: city,
                                country: country,
                                region: region,
                                post_code: postCode,
                                zip_code: zipCode,
                                street: street,
                                address1: address1,
                                address2: address2
                            },
                            father: {
                                first_name: fatherFirstName,
                                last_name: fatherLastName,
                                email: fatherEmail,
                                phone: fatherPhone,
                                nin: fatherNin,
                                address: fatherAddress
                            },
                            mother: {
                                first_name: motherFirstName,
                                last_name: motherLastName,
                                email: motherEmail,
                                phone: motherPhone,
                                nin: motherNin,
                                address: motherAddress
                            },
                            nextofkin: {
                                first_name: nextOfKinFirstName,
                                middle_name: nextOfKinMiddleName,
                                last_name: nextOfKinLastName,
                                email: nextOfKinEmail,
                                phone: nextOfKinPhone,
                                nin: nextOfKinNin,
                                address: nextOfKinAddress,
                                relationship: nextOfKinRelationship
                            }
                        }).then(() => {
                            setError('');
                            setSuccess('Player added successfully');
                            setTimeout(() => {
                                setSuccess('');
                                history.push('/players');
                            }, 2000);
                        }).catch(err => {
                            setError(err.message);
                        });

                        setProgress(0);
                        setError('');
                    });
                }
            )
        }
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <>
            {
                !user ? (
                    <Redirect to='/login' />
                ) : (
                    <>
                        <Breadcrumb page={'CreatePlayer'} pagename={'Create Player'} />
                        <div className="account-login section">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 col-12">
                                        <div className="register-form player-create">
                                            <div className="title">
                                                <h3>Create Player</h3>
                                            </div>
                                            <div className="col-lg-12 col-md-6 col-12 row-admd-cat">
                                                <div className="cart-list-head-right row-add">
                                                    <Link to="/players" className="link-class"><i className="lni lni-list icon-list-prod"></i>Players List</Link>
                                                </div>
                                            </div>
                                            {
                                                error !== '' ? (
                                                    <div className="alert alert-danger">
                                                        {error}
                                                    </div>
                                                ) : (
                                                    ''
                                                )
                                            }
                                            {
                                                success !== '' ? (
                                                    <div className="alert alert-success">
                                                        {success}
                                                    </div>
                                                ) : (
                                                    ''
                                                )
                                            }
                                            <form className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="firstname">First Name</label>
                                                        <input placeholder="First Name" id="firstname" className="form-control" type="text" value={firstName} onChange={event => setFirstName(event.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="middlename">Middle Name</label>
                                                        <input placeholder="Middle Name" id="middlename" className="form-control" type="text" value={middleName} onChange={event => setMiddleName(event.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <input placeholder="Last Name" className="form-control" type="text" value={lastName} onChange={event => setLastName(event.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <select className="form-control" id="reg-gender" onChange={event => setGender(event.target.value)}>
                                                            <option value="">Select Gender</option>
                                                            <option value="female">Female</option>
                                                            <option value="male">Male</option>
                                                            <option value="others">Others</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <input placeholder="Email Address" className="form-control" type="email" value={email} onChange={event => setEmail(event.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <input placeholder="Phone Number" className="form-control" type="text" value={phone} onChange={event => setPhone(event.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="dob">Date of Birth</label>
                                                        <input placeholder="Date of Birth" className="form-control" id="dob" type="date" value={birthDate} onChange={event => setBirthDate(event.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="reg-ln">Picture</label>
                                                        <progress className="imageupload__progress" value={progress} max="100" />
                                                        <input className="form-control" type="file" id="reg-ln" onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="entry-date">Entry Date</label>
                                                        <input placeholder="Entry Date" className="form-control" id="entry-date" type="date" value={entryDate} onChange={event => setEntryDate(event.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="driving-license">Driving License No.</label>
                                                        <input placeholder="Driving License No." className="form-control" id="driving-license" type="text" value={drivingLicense} onChange={event => setDrivingLicense(event.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <input placeholder="NIN" className="form-control" type="text" value={nin} onChange={event => setNin(event.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <input placeholder="School/College" className="form-control" type="text" value={college} onChange={event => setCollege(event.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="height">Height</label>
                                                        <input placeholder="Height" className="form-control" id="height" type="text" value={height} onChange={event => setHeight(event.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="weight">Weight</label>
                                                        <input placeholder="Weight" className="form-control" type="text" id="weight" value={weight} onChange={event => setWeight(event.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <select className="form-control" id="reg-gender" onChange={event => setAgeGroup(event.target.value)} >
                                                            <option value="">Select Age Group</option>
                                                            <option value="1-10">1-10</option>
                                                            <option value="11-15">11-15</option>
                                                            <option value="16-17">16-17</option>
                                                            <option value="18-20">18-20</option>
                                                            <option value="21-25">21-25</option>
                                                            <option value="26-30">26-30</option>
                                                            <option value="31-40">31-40</option>
                                                            <option value="41-50">41-50</option>
                                                            <option value="51-60">51-60</option>
                                                            <option value="61-70">61-70</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <select className="form-control" id="reg-gender" onChange={event => setPosition(event.target.value)}>
                                                            <option value="">Select Position</option>
                                                            {
                                                                positions.map(position => (
                                                                    <option key={position.id} value={position.id}>{position.code}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <select className="form-control" id="reg-gender" onChange={event => setSport(event.target.value)}>
                                                            <option value="">Select Sport</option>
                                                            {
                                                                sports.map(sport => (
                                                                    <option key={sport.id} value={sport.id}>{sport.code}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <select className="form-control" id="reg-gender" onChange={event => setTeam(event.target.value)}>
                                                            <option value="">Select Team</option>
                                                            {
                                                                teams.map(team => (
                                                                    <option key={team.id} value={team.id}>{team.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="jersey">Jersey No.</label>
                                                        <input placeholder="Jersey No." id="jersey" className="form-control" type="text" value={jersey} onChange={event => setJersey(event.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label htmlFor="reg-status">Status</label>
                                                        <select className="form-control" id="reg-status" onChange={event => setStatus(event.target.value)} >
                                                            <option value="">Select Status</option>
                                                            <option value="active">Active</option>
                                                            <option value="inactive">InActive</option>
                                                            <option value="sold">Sold</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 left-container">
                                                    <div className="col-sm-12 heading-infor">
                                                        <p>Father's Information</p>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input placeholder="First Name" className="form-control" type="text" value={fatherFirstName} onChange={event => setFatherFirstName(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="form-group">
                                                            <input placeholder="Last Name" className="form-control" type="text" value={fatherLastName} onChange={event => setFatherLastName(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input placeholder="Email" className="form-control" type="email" value={fatherEmail} onChange={event => setFatherEmail(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="form-group">
                                                            <input placeholder="Phone Number" className="form-control" type="text" value={fatherPhone} onChange={event => setFatherPhone(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input placeholder="NIN" className="form-control" type="text" value={fatherNin} onChange={event => setFatherNin(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="form-group">
                                                            <textarea placeholder="Place of residence" className="form-control" type="text" value={fatherAddress} onChange={event => setFatherAddress(event.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 right-container">
                                                    <div className="col-sm-12 heading-infor">
                                                        <p>Mother's Information</p>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input placeholder="First Name" className="form-control" type="text" value={motherFirstName} onChange={event => setMotherFirstName(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="form-group">
                                                            <input placeholder="Last Name" className="form-control" type="text" value={motherLastName} onChange={event => setMotherLastName(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input placeholder="Email" className="form-control" type="email" value={motherEmail} onChange={event => setMotherEmail(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="form-group">
                                                            <input placeholder="Phone Number" className="form-control" type="text" value={motherPhone} onChange={event => setMotherPhone(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input placeholder="NIN" className="form-control" type="text" value={motherNin} onChange={event => setMotherNin(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="form-group">
                                                            <textarea placeholder="Place of residence" className="form-control" type="text" value={motherAddress} onChange={event => setMotherAddress(event.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 left-container">
                                                    <div className="col-sm-12 heading-infor">
                                                        <p> Next Of Kin</p>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input placeholder="First Name" className="form-control" type="text" value={nextOfKinFirstName} onChange={event => setNextOfKinFirstName(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="form-group">
                                                            <input placeholder="Middle Name" className="form-control" type="text" value={nextOfKinMiddleName} onChange={event => setNextOfKinMiddleName(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input placeholder="Last Name" className="form-control" type="text" value={nextOfKinLastName} onChange={event => setNextOfKinLastName(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="form-group">
                                                            <input placeholder="Email" className="form-control" type="email" value={nextOfKinEmail} onChange={event => setNextOfKinEmail(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input placeholder="Phone Number" className="form-control" type="text" value={nextOfKinPhone} onChange={event => setNextOfKinPhone(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="form-group">
                                                            <input placeholder="NIN" className="form-control" type="text" value={nextOfKinNin} onChange={event => setNextOfKinNin(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <select className="form-control" id="reg-gender" onChange={event => setNextOfKinRelationship(event.target.value)}>
                                                                <option value="">Select Relationship</option>
                                                                <option value="mother">Mother</option>
                                                                <option value="father">Father</option>
                                                                <option value="fiancee">Fiancee</option>
                                                                <option value="son">Son</option>
                                                                <option value="daughter">Daughter</option>
                                                                <option value="brother">Brother</option>
                                                                <option value="sister">Sister</option>
                                                                <option value="uncle">Uncle</option>
                                                                <option value="aunt">Aunt</option>
                                                                <option value="nephew">Nephew</option>
                                                                <option value="niece">Niece</option>
                                                                <option value="cousin">Cousin</option>
                                                                <option value="other">Other</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="form-group">
                                                            <textarea placeholder="Place of residence" className="form-control" type="text" value={nextOfKinAddress} onChange={event => setNextOfKinAddress(event.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 right-container">
                                                    <div className="col-sm-12 heading-infor">
                                                        <p>Player's Address</p>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input placeholder="City" className="form-control" type="text" value={city} onChange={event => setCity(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="form-group">
                                                            <input placeholder="Country" className="form-control" type="text" value={country} onChange={event => setCountry(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input placeholder="Region" className="form-control" type="text" value={region} onChange={event => setRegion(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="form-group">
                                                            <input placeholder="Address 1" className="form-control" type="text" value={address1} onChange={event => setAddress1(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input placeholder="Postal Code" className="form-control" type="text" value={postCode} onChange={event => setPostCode(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="form-group">
                                                            <input placeholder="Zip Code" className="form-control" type="text" value={zipCode} onChange={event => setZipCode(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <input placeholder="Street" className="form-control" type="text" value={street} onChange={event => setStreet(event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="form-group">
                                                            <textarea placeholder="address 2" className="form-control" type="text" value={address2} onChange={event => setAddress2(event.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="right-float">
                                                    <div className="button">
                                                        <button className="btn" type="submit" onClick={handleSubmit} >Register Player</button>
                                                        <button className="btn" type="reset" >Reset</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default CreatePlayer
