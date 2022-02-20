import React from 'react';
import ReactDOM from 'react-dom';
import ChartNav from './components/ChartNav'; // Component responsible for handling the chart's tabs
import SiteNavbar from './components/SiteNavbar' // Navbar build with Bootstrap
import './index.css';

ReactDOM.render(
  <React.StrictMode>
  	<SiteNavbar />
  	<div id="home">
    	<ChartNav />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
