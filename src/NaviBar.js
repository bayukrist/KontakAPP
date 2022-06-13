import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

const NaviBar = () => {
  const deleteSession = () => {
    ReactSession.remove("username");
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>KontakAPP</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className={"navLink"} activeclassname={"active"} to='/' exact='true'>Daftar Kontak</NavLink>
            <NavLink className={"navLink"} activeclassname={"active"} to='/create'>Buat Kontak</NavLink>
          </Nav>
          <Nav>
            <NavLink  onClick={deleteSession} to="/login">
              <button className='btn btn-secondary'>Keluar</button>
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NaviBar;