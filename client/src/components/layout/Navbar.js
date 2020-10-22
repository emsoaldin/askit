import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';



const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li><Link to='/posts'>Questions page</Link></li>
      <li><Link to='/profiles'>Developers</Link></li>
      <li><Link to='/dashboard'><i class="fas fa-user"></i>{' '} <span className="hide-sm">Dashboard</span></Link></li>
      <li><a onClick = { logout } href="#!"><i class="fas fa-sign-out-alt"></i>{' '} <span className="hide-sm">Logout</span></a></li>
    </ul>
  );
  
  const guestLink = (
    <ul>
        <li><Link to='/profiles'>Developers</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/login'>Login</Link></li>
      </ul>
  );
  
  return (
    <nav className="navbar bg-dark">
      <h1>
        <a href="/"><i className="fas fa-question"></i> ASKit</a>
      </h1>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLink}</Fragment>) }
    </nav>
    )
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);