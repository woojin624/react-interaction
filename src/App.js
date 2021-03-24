import './App.css';
import { Nav, Navbar } from 'react-bootstrap';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Section1 from './components/section1/Section1';
import Section2 from './components/section2/Section2';
import Section3 from './components/section3/Section3';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand as={Link} to='/'>
            React-Interaction
          </Navbar.Brand>
          <Nav className='mr-auto'>
            <Nav.Link as={Link} to='/section1'>
              Section1
            </Nav.Link>
            <Nav.Link as={Link} to='/section2'>
              Section2
            </Nav.Link>
            <Nav.Link as={Link} to='/section3'>
              Section3
            </Nav.Link>
          </Nav>
        </Navbar>
        <div>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/section1'>
              <Section1 />
            </Route>
            <Route path='/section2'>
              <Section2 />
            </Route>
            <Route path='/section3'>
              <Section3 />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
function Home() {
  return <h2>For React Interaction</h2>;
}
export default App;
