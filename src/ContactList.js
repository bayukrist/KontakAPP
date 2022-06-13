import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from './api/contact-api';
import Paging from './Paging';

const ContactList = ({ contacts, reloadData, filter, sorting, searchText}) => {
    const browserNavigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(5);

    let contactsLength = contacts.length;

    // membagi jumlah kontak yang ditampilkan
    const indexLastPost = currentPage * postPerPage;
    const indexFirstPost = indexLastPost - postPerPage;

    // fungsi berpindah halaman
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    //filter untuk gender
    if (filter !== "Semua") {
        contacts = contacts.filter((contact) => contact.gender === filter);
        contactsLength = contacts.length;
    }

    //mengembalikan ke halaman awal saat di filter
    useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    // untuk sorting nama
    if (sorting === "AtoZ") {
        contacts = contacts.sort(function (a, b) {
            return a.name.localeCompare(b.name)
        })
    } else if (sorting === "ZtoA") {
        contacts = contacts.sort(function (a, b) {
            return b.name.localeCompare(a.name)
        })
    } else {
        reloadData();
    }

    // untuk search system
    contacts = contacts.filter(contact => {
        return Object.keys(contact).some(key =>
            contact[key].toString().toLowerCase().includes(searchText.toString().toLowerCase())
        )
    }).slice(indexFirstPost, indexLastPost);

    if(searchText){
        contactsLength = contacts.length;
        console.log(contactsLength);
    }

    const handleDelete = (id) => {
        Api.delete('contacts/' + id).then(
            () => { reloadData() }
        )
    }
   

    return (
        <div>
            {
                contacts.map((contact) => (
                    <div className='contact' key={contact.id}>
                        <div className="contact-info">
                            <div className="contact-name">Nama Kontak : {contact.name}</div>
                            <div>Jenis Kelamin : {contact.gender}</div>
                            <div>Nomor Telepon : {contact.number}</div>
                        </div>
                        <div className="contact-actions">
                            <button className="btn btn-primary" onClick={() => { browserNavigate('/edit/' + contact.id) }}>Ubah</button>
                            <button className="btn btn-danger" onClick={() => { handleDelete(contact.id) }}>Hapus</button>
                        </div>
                    </div>
                ))
            }

            <Paging postPerPage={postPerPage} totalPost={contactsLength} paginate={paginate} />
        </div>
    );
}

export default ContactList;