import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import ChartPage from './ChartPage' // Component who send the request to the axios api and build the charts out of it
import charts from '../api/ChartList.json' // A JSON file with the api routes and other info, could be replace by a request to the server
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChartNav.css'; 

function renderItem(jsonItem){ // Render the tabs selector
  let itemDOM = [];
  for (let [key, data] of Object.entries(charts)){
    itemDOM.push(
      <Nav.Item key={key}>
        <Nav.Link eventKey={key}>{data.name}</Nav.Link>
      </Nav.Item>
    );
  }
  return itemDOM;
}

function renderTab(jsonItem){ // Render the tabs
  let tabDOM = []
  for (let [key, data] of Object.entries(charts)){
    tabDOM.push(
      <Tab.Pane eventKey={key} key={key}>
        <ChartPage chartLink={data.link} name={data.name} sensor={data.sensor}/ >
      </Tab.Pane>
    );
  }
  return tabDOM;
}


function ChartNav() {
  let first = '';
  for (let key in charts) { // loop to find the first tab
    first = key;
    break;
  }
  return (
    <Tab.Container id="left-tabs" defaultActiveKey={first}>
      <Row>
        <Col md={2} className="mb-3">
          <h5>Selecione um Gráficos:</h5>
          <Nav variant="pills" className="flex-column">
            {renderItem(charts)}
          </Nav>
        </Col>
        <Col md={10}>
          <Tab.Content>
            {renderTab(charts)}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default ChartNav;
