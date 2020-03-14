import React from 'react';
import './App.css';
import { ThemeProvider } from "@material-ui/styles";
import {
  CssBaseline,
  createMuiTheme
} from "@material-ui/core";

import ResponsiveDrawer from './components/drawer'

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: { fromdate: new Date('2014-08-18'), todate: new Date('2018-08-18') },
      options: [{ name: 'CO2', selected: true }, { name: 'SO2', selected: false }, { name: 'CO', selected: true }, { name: 'NO2', selected: false },],
      categories: [{ name: 'A', range: 100, currentValue: 20 }, { name: 'B', range: '200', currentValue: 10 }, { name: 'C', range: 1000, currentValue: 100 }],
      data_cat: ['uv', 'pv', 'amt',],
      data: [
        {
          date: '2014-08-18', uv: 4000, pv: 2400, amt: 2400, a: 1100,
        },
        {
          date: '2014-08-19', uv: 3000, pv: 1398, amt: 2210, a: 1200,
        },
        {
          date: '2014-08-20', uv: 2000, pv: 9800, amt: 2290, a: 1300,
        },
        {
          date: '2014-08-21', uv: 2780, pv: 3908, amt: 2000, a: 1100,
        },
        {
          date: '2014-08-22', uv: 1890, pv: 4800, amt: 2181, a: 1000,
        },
        {
          date: '2014-08-30', uv: 2390, pv: 3800, amt: 2500, a: 900,
        },
      ],
    }
  }

  toggleSelect(i) {
    this.setState(state => {
      state.options[i].selected = !state.options[i].selected;
      return state;
    })
  }
  changeValue(index, newValue) {
    this.setState(state => {
      state.categories[index].currentValue = newValue;
      return state;
    }
    )
  }
  changeDate(type, date) {
    this.setState(state => {
      state.dates[type] = date;
      return state
    })
  }
  render() {
    return (
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ResponsiveDrawer data_cat={this.state.data_cat} data={this.state.data} dates={this.state.dates} changeDates={this.changeDate.bind(this)} categories={this.state.categories} setValue={this.changeValue.bind(this)} options={this.state.options} toggleSelect={this.toggleSelect.bind(this)} />

        </ThemeProvider>
      </>
    )
  }
}

export default App;
