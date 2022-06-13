import { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import ContactList from './ContactList';
import Api from './api/contact-api';
import NaviBar from './NaviBar';
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('Semua');
    const [sorting, setSorting] = useState('TidakAda');
    const [searchText, setSearchText] = useState('');
    const user = ReactSession.get("username");
    const browserHistory = useNavigate();

    const FetchData = () => {
        Api.get('/contacts')
            .then(
                res => {
                    setContacts(res.data);
                })
            .catch(
                err => {
                    console.log(err.message);
                }
            )
    }

    useEffect(() => {
        if (!user) {
            return browserHistory('/login');
        }

        FetchData();
    }, [user, browserHistory]);


    return (
        <div>
            <NaviBar />
            <Container>
                <h3 className='my-3'>Daftar Kontak</h3>
                <Row className='my-3'>
                    <Col>
                        <h5>Tampilkan Jenis Kelamin</h5>
                        <Form.Select aria-label="Filter"
                            onChange={(e) => setFilter(e.target.value)
                            }
                            value={filter}
                        >
                            <option value="Semua">Semua</option>
                            <option value="Pria">Pria</option>
                            <option value="Wanita">Wanita</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <h5>Urutkan Nama</h5>
                        <Form.Select aria-label="Sorting"
                            onChange={(e) => setSorting(e.target.value)
                            }
                            value={sorting}
                        >
                            <option value="TidakAda">Acak</option>
                            <option value="AtoZ">A - Z</option>
                            <option value="ZtoA">Z - A</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <h5>Cari Kontak</h5>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setSearchText(e.target.value)}
                            value={searchText}
                        />
                    </Col>
                </Row>
                <ContactList contacts={contacts} filter={filter} sorting={sorting} reloadData={FetchData} searchText={searchText} />
            </Container>
        </div>
    );
}

export default Home;