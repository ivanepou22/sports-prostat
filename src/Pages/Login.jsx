import React from 'react'
import { useHistory } from 'react-router';
import { auth } from '../firebase';
import './Login.css'

const Login = () => {
    const history = useHistory()
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const login = (event) => {
        event.preventDefault(); //stops the fresh of the page
        //firebase login logic
        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                history.push('/');
            })
            .catch((error) => {
                alert(error.message)
            })
    }
    return (
        <>
            <div className="account-login section">
                <div className="container ">
                    <div className="row justify-center" >
                        <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12" >
                            <form className="card login-form">
                                <div className="card-body">
                                    <div className="title">
                                        <h3>Login</h3>
                                    </div>
                                    <div className="alt-option">
                                        <span></span>
                                    </div>
                                    <div className="social-login">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-4 col-12"><a className="btn facebook-btn" href="/"><i className="lni lni-facebook-filled"></i></a></div>
                                            <div className="col-lg-4 col-md-4 col-12"><a className="btn twitter-btn" href="/"><i className="lni lni-twitter-original"></i> </a></div>
                                            <div className="col-lg-4 col-md-4 col-12"><a className="btn google-btn" href="/"><i className="lni lni-google"></i></a></div>
                                        </div>
                                    </div>
                                    <div className="alt-option">
                                        <span>Or</span>
                                    </div>
                                    <div className="form-group input-group">
                                        <input placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} className="form-control" type="email" id="reg-email" required />
                                    </div>
                                    <div className="form-group input-group">
                                        <input placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} className="form-control" type="password" id="reg-pass" required />
                                    </div>
                                    <div className="d-flex flex-wrap justify-content-between bottom-content">
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input width-auto" id="exampleCheck1" />
                                            <label className="form-check-label">Remember me</label>
                                        </div>
                                        <a className="lost-pass" href="/">Forgot password?</a>
                                    </div>
                                    <div className="button">
                                        <button className="btn" type="submit" onClick={login}>Login</button>
                                    </div>
                                    <p className="outer-link">Don't have an account? <a href="/register">Register here </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Login
