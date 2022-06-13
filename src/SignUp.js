import { useState, useEffect } from "react";
import { Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "./api/contact-api";
import swal from 'sweetalert';

const SignUp = () => {
    const browserHistory = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [userDatas, setUserDatas] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);
    const [messageFailed, setMessageFailed] = useState('');

    const FetchData = () => {
        api.get('/user')
            .then(
                res => {
                    setUserDatas(res.data);
                })
            .catch(
                err => {
                    console.log(err.message);
                }
            )
    }

    useEffect(() => {
        FetchData();
    }, []);

    const handleSignUp = (e) => {
        e.preventDefault();
        const user = { username, password }

        const usercheck = userDatas.find(userData => (userData.username === username));
        if (usercheck) {
            setMessageFailed('Username telah digunakan');
            setShowFailed(true);
        } else {
            if (password === confirmPassword) {
                api.post('/user', user).then(() => {
                    setShowFailed(false);
                    setShowSuccess(true);
                })
            } else {
                setShowSuccess(false);
                setMessageFailed('Password yang diinput berbeda');
                setShowFailed(true);
            }
        }


    }

    if(showSuccess === true){ 
        swal({
            icon: "success",
            title: "Berhasil Daftar!",
        });
        setShowSuccess(false);
        browserHistory('/login');
    }

    if(showFailed === true){ 
        swal({
            icon: "error",
            title: "Gagal Daftar!",
            text: messageFailed
        });
        setShowFailed(false);
    }
    

    return (<div>
        <Container>
            <div className="contact-form shadow">
                <h3>Daftar Akun</h3>
                <form onSubmit={handleSignUp}>
                    <div className="form-group">
                        <label className="control-label">Nama Akun</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Kata Sandi</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Ulangi Kata Sandi</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setconfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group d-grid gap-2 my-3">
                        <button type="submit" className="btn btn-primary">Daftar</button>
                    </div>
                    <div className='text-center'>Sudah punya akun?</div>
                    <div className="form-group d-grid gap-2 my-3">
                        <button type="button" onClick={() => browserHistory('/login')} className="btn btn-info text-white">Masuk</button>
                    </div>
                </form>
            </div>
        </Container>
    </div>);
}

export default SignUp;