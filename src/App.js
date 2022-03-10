import 'regenerator-runtime/runtime';
import React from 'react';
import { login, logout } from './utils';
// import './global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Container, Navbar, NavDropdown } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  Outlet,
} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import getConfig from './config';
import PollingStation from './components/PollingStation';
import NewPoll from './components/NewPoll';
import Home from './components/Home';
const { networkId } = getConfig(process.env.NODE_ENV || 'development');

export default function App() {
  const changeCandidatesFunction = async (prompt) => {
    console.log(prompt);
    let candidateNames = await window.contract.getCandidateList({
      prompt: prompt,
    });
    console.log('=>', candidateNames);
    localStorage.setItem('Prompt', prompt);
    candidateNames.map((candidateName) => {
      localStorage.setItem(uuidv4(), candidateName);
    });
    window.location.replace(window.location.href + 'PollingStation');
  };

  return (
    <Router>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>BlockEVote</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mx-auto'></Nav>
            <Nav>
              <Nav.Link href='NewPoll'> New Poll</Nav.Link>
              <Nav.Link onClick={window.accountId === '' ? login : logout}>
                {window.accountId === '' ? 'Login' : window.accountId}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Route path='/PollingStation'>
          <PollingStation />
        </Route>
        <Route path='/NewPoll'>
          <NewPoll />
        </Route> */}
      {/* <Route path='/'>
          <Test />
        </Route> */}
      <Routes>
        <Route path='/PollingStation' element={<PollingStation />} />
        <Route path='/NewPoll' element={<NewPoll />} />
        <Route
          path='/'
          element={<Home changeCandidates={changeCandidatesFunction} />}
        />
      </Routes>
    </Router>
  );
}
