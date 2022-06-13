import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import contactApi from './api/contact-api';
import NaviBar from './NaviBar';
import { ReactSession } from 'react-client-session';

const CreateContact = () => {
    const browserHistory = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('Pria');
    const [number, setNumber] = useState('');
    const user = ReactSession.get("username");

    useEffect(() => {
        if (!user) {
            return browserHistory('/login');
        }
    }, [user, browserHistory]);

    useEffect(
        () => {
            if (id) {
                contactApi.get('/contacts/' + id).then((response) => {
                    const { data } = response;
                    setName(data.name);
                    setNumber(data.number);
                    setGender(data.gender);

                });
            } else {
                setName('');
                setNumber('');
                setGender('Pria');
            }
        },
        [id]
    );


    const handleSubmit = (e) => {
        e.preventDefault();
        const contact = { name, number, gender }

        if (id) {
            UpdateContact(contact);
        } else {
            CreateNewContact(contact);
        }
    }

    const CreateNewContact = (contact) => {
        contactApi.post('/contacts', contact).then(() => {
            browserHistory('/');
        })
    }

    const UpdateContact = (contact) => {
        contactApi.put('/contacts/' + id, contact).then(() => {
            browserHistory('/');
        })
    }

    return (
        <div>
            <NaviBar />
            <Container>
                <div className="contact-form py-3">
                    <h3> {id ? "Ubah" : "Buat"} Kontak</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="control-label">Nama Kontak</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label className="control-label">Jenis Kelamin</label>
                            <Form.Select aria-label="Gender" className='form-control'
                                onChange={(e) => setGender(e.target.value)
                                }
                                value={gender}
                            >
                                <option value="Pria">Pria</option>
                                <option value="Wanita">Wanita</option>
                            </Form.Select>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Nomor Telepon</label>
                            <input
                                type="number"
                                className="form-control"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group d-grid gap-2 my-3">
                            <button type="submit" className="btn btn-primary">Simpan</button>
                        </div>
                        <div className="form-group d-grid gap-2 my-3">
                            <button type="button" className="btn btn-danger" onClick={() => { browserHistory('/') }}>Batal</button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
}

export default CreateContact;