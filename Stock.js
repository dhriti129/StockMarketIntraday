import React from "react";
import Plot from 'react-plotly.js';


class Stock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stockChartXValues : [],
            stockChartYValues : []


        }
    }

    componentDidMount(){
        this.fetchStock();

    }
    fetchStock(){
        const pointerToThis = this;
        console.log(pointerToThis);
        const API_KEY = 'TNJOL380ARMRTHE2';
        let API_Call  = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=compact&apikey=${API_KEY}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        fetch(API_Call)
            .then(
                function(response){
                    return response.json();


                }
            )
            .then(
                function(data){
                    console.log(data);

                    for(var key in data['Time Series (5min)']){
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (5min)'][key]['1. open']);
                    

                    }
                    // console.log(stockChartXValuesFunction)
                    pointerToThis.setState({
                        stockChartXValues : stockChartXValuesFunction,
                        stockChartYValues : stockChartYValuesFunction
                    });


                }
            )

    }

    render(){
        return(
            <div><h1>Stock Market</h1>
            <Plot
        data={[
          {
            x: this.state.stockChartXValues,
            y: this.state.stockChartYValues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          }
        ]}
        layout={ {width: 720, height: 440, title: 'IBM Intraday'} }
      />
            
            


            </div>

        )
    }
}
 export default Stock;
