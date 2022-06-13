import { useState, useEffect } from 'react';
import { Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from './api/contact-api';
import { ReactSession } from 'react-client-session';
import swal from 'sweetalert';

const LoginForm = () => {
    const browserHistory = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);

    const FetchData = () => {
        api.get('/user')
            .then(
                res => {
                    setUsers(res.data);
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

    const handleLogin = (e) => {
        e.preventDefault();
        const usercheck = users.find(user => (user.username === username && user.password === password));
        if (usercheck) {
            setShowFailed(false);
            setShowSuccess(true);
            ReactSession.set("username", username);
        } else {
            setShowFailed(true);
        }
    }

    if (showSuccess === true) {
        swal({
            icon: "success",
            title: "Berhasil Masuk!",
        });
        setShowSuccess(false);
        browserHistory('/');
    }

    if (showFailed === true) {
        swal({
            icon: "error",
            title: "Gagal Masuk!",
            text:"Username atau password salah!"
        });
        setShowFailed(false);
    }

    return (
        <div>
            <Container>
                <div className="contact-form shadow">
                    <h3>Masuk</h3>
                    <form onSubmit={handleLogin}>
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
                        <div className="form-group d-grid gap-2 my-3">
                            <button type="submit" className="btn btn-primary">Masuk</button>
                        </div>
                        <div className='text-center'>Belum punya akun?</div>
                        <div className="form-group d-grid gap-2 my-3">
                            <button type="button" onClick={() => browserHistory('/signup')} className="btn btn-info text-white">Daftar</button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
}

export default LoginForm;