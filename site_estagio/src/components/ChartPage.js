import React, { Component } from 'react'
import Chart from 'chart.js/auto';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import sensorAPI from '../api/sensorAPI' // API responsable to get data from the backend
import 'bootstrap/dist/css/bootstrap.min.css';

class ChartPage extends Component{

    constructor(props){
       super(props);
       this.chartRef = React.createRef();
       this.apiData = {}; // Data retrived by the API
       this.x = []; // X axis for the chart
       this.y = []; // y axis for the chart
       this.lineChart = undefined; // Stores the chart
       this.aspectRatio = 2; // Sets the aspect ratio of the chart, default is 2
       this.resizeTime = 0; // Necessary to set a interval between the resize
       this.showPoints = false; // For toggling between show and hide the chart points
    }

    createChart = () => { // Create and render the chart
    	const ctx = this.chartRef.current.getContext("2d");
    	this.resize();

    	if (typeof this.lineChart !== "undefined") this.lineChart.destroy(); // Delete the old chart

    	this.lineChart  = new Chart(ctx, {
			type: "line",
			data: {
				labels: this.x.map((x) => { // This arrow function convert the timestamp to a readable string
					let date = new Date(x)
					return `Dia ${date.getDate()} as ${date.getHours()}:${(date.getMinutes() < 10) ? "0" : ""}${date.getMinutes()}`;
				}),
				datasets: [{ 
					data: this.y,
					label: "Vibração",
					borderColor: "#1680b8",
					backgroundColor: "#7bb6dd",
					fill: false,
					pointRadius: this.showPoints ? 3 : 0,
					tension: 0.1
				}]
				},
			options: {
				animation: false,
				aspectRatio: this.aspectRatio,
				scales: {
					x: {
				      title: {
				        display: true,
				        text: 'Tempo'
				      },
				      ticks: {
				      	padding: 0,
				      	font: {
				      		size: 12
				      	},
				      	callback: function(val, index) { // This callback function spaces the label of the x axis
				            return index % 2 === 0 ? this.getLabelForValue(val) : '';
				        }
				      }
				    },
				    y: {
				      title: {
				        display: true,
				        text: 'Vibração'
				      }
				    }
				},
			}
		});
    }

    resize = () => { // Some equations to maintain the chart on the right size
    	if(window.innerWidth <= 768){
    		this.aspectRatio = 0.8 * (window.innerWidth/window.innerHeight)*1.8;
    	}else{
    		this.aspectRatio = 1 * (window.innerWidth/window.innerHeight)*1.2;
    	}
    }

    tglHandler = (value) => { // Control the chart's zoom toggle
    	switch(value){
    		case '1x':
    			this.x = this.apiData.x.slice();
    			this.y = this.apiData.y.slice();
    			break;
    		case '4x':
    			this.x = this.apiData.x.slice();
    			this.y = this.apiData.y.slice();
    			this.x.splice(0, Math.ceil(this.x.length/4)*3);
    			this.y.splice(0, Math.ceil(this.y.length/4)*3);
    			break;
    		case '8x':
    			this.x = this.apiData.x.slice();
    			this.y = this.apiData.y.slice();
    			this.x.splice(0, Math.ceil(this.x.length/8)*7);
    			this.y.splice(0, Math.ceil(this.y.length/8)*7);
    			break;
    		default:
    			alert("Ocorreu um erro!");
    			break;
    	}
    	this.createChart();
    }

    btnHandler = (value) => { // Control the point toggle button
    	if(this.showPoints) this.showPoints = false;
    	else this.showPoints = true;
    	this.createChart();
    }

    componentDidMount(){
        sensorAPI.get(this.props.chartLink).then((response) => {
        	this.apiData = response.data;
        	this.x = response.data.x;
        	this.y = response.data.y;
          this.createChart();
        }).catch(() => {
        	alert(`Erro ao Carregar Dados da "${this.props.chartLink}"!`);
	   	});
	   	window.addEventListener("resize", () => { // Event to resize the chart after 250ms from the window resize
	   		clearTimeout(this.resizeTime);
    		this.resizeTime = setTimeout(this.createChart, 250);
	   	});
    }

    render(){
        return (
          <div className="div-canvas">
          	<Row>
          		<Col>
          	  		<h3>{this.props.name}</h3>
          	  	</Col>
          	  	<Col>
		       		<ToggleButtonGroup type="radio" className="btn-div" name={this.props.chartLink} defaultValue={'1x'} onChange={this.tglHandler}>
					    <Button variant="outline-primary" onClick={this.btnHandler}>Pontos</Button>
					    <ToggleButton variant="outline-primary" id={this.props.chartLink+"1"} value={'1x'}>
					      1X
					    </ToggleButton>
					    <ToggleButton variant="outline-primary" id={this.props.chartLink+"2"} value={'4x'}>
					      4X
					    </ToggleButton>
					    <ToggleButton variant="outline-primary" id={this.props.chartLink+"3"} value={'8x'}>
					      8X
				    	</ToggleButton>
			  		</ToggleButtonGroup>
			  	</Col>
			 </Row>
              <canvas
                id="myChart"
                ref={this.chartRef}
                role="img"
              />
          </div>	
    	);
    }
    
}

export default ChartPage;