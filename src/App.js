
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import logo from './logo.svg';
import './App.css';
import data from './data/acl-mini.json';
import ScholarViewPane from './ScholarView/ScholarViewPane';
const App = () => {
    return ( 
        <Container fluid style={{height:"100vh"}}>
            <ScholarViewPane data={data}/>
        </Container> 
    )
}
export default App;