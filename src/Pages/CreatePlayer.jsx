import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrumb';
import { db } from '../firebase';
import './CreatePlayer.css';

const CreatePlayer = () => {
    const [positions, setPositions] = useState([]);
    const [sports, setSports] = useState([]);
    const [teams, setTeams] = useState([]);
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


    return (
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
                                <form className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input placeholder="First Name" className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input placeholder="Middle Name" className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input placeholder="Last Name" className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <select className="form-control" id="reg-gender">
                                                <option value="">Select Gender</option>
                                                <option value="female">Female</option>
                                                <option value="male">Male</option>
                                                <option value="others">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input placeholder="Email Address" className="form-control" type="email" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input placeholder="Phone Number" className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="dob">Date of Birth</label>
                                            <input placeholder="Date of Birth" className="form-control" id="dob" type="date" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="reg-ln">Picture</label>
                                            <progress className="imageupload__progress" value={0} max="100" />
                                            <input className="form-control" type="file" id="reg-ln" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input placeholder="NIN" className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input placeholder="School/College" className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input placeholder="Height" className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input placeholder="Weight" className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <select className="form-control" id="reg-gender">
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
                                            <select className="form-control" id="reg-gender">
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
                                            <select className="form-control" id="reg-gender">
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
                                            <select className="form-control" id="reg-gender">
                                                <option value="">Select Team</option>
                                                {
                                                    teams.map(team => (
                                                        <option key={team.id} value={team.id}>{team.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 left-container">
                                        <div className="col-sm-12 heading-infor">
                                            <p>Father's Information</p>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input placeholder="First Name" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <input placeholder="Last Name" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input placeholder="Email" className="form-control" type="email" />
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <input placeholder="Phone Number" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input placeholder="NIN" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <textarea placeholder="Place of residence" className="form-control" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 right-container">
                                        <div className="col-sm-12 heading-infor">
                                            <p>Mother's Information</p>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input placeholder="First Name" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <input placeholder="Last Name" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input placeholder="Email" className="form-control" type="email" />
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <input placeholder="Phone Number" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input placeholder="NIN" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <textarea placeholder="Place of residence" className="form-control" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 left-container">
                                        <div className="col-sm-12 heading-infor">
                                            <p> Next Of Kin</p>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input placeholder="First Name" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <input placeholder="Middle Name" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input placeholder="Last Name" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <input placeholder="Email" className="form-control" type="email" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input placeholder="Phone Number" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <input placeholder="NIN" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <select className="form-control" id="reg-gender">
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
                                                <textarea placeholder="Place of residence" className="form-control" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 right-container">
                                        <div className="col-sm-12 heading-infor">
                                            <p>Player's Address</p>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input placeholder="City" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <input placeholder="Country" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input placeholder="Region" className="form-control" type="email" />
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <input placeholder="Address 1" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input placeholder="Postal Code" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <input placeholder="Zip Code" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input placeholder="Street" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <textarea placeholder="address 2" className="form-control" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="button">
                                        <button className="btn" type="submit" >Register</button>
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

export default CreatePlayer
