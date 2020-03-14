import React from 'react';
import './App.css';
import { styled } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import {
  CssBaseline,
  createMuiTheme
} from "@material-ui/core";

import { Container } from '@material-ui/core';
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
      options: [{ name: 'CO2', selected: true }, { name: 'SO2', selected: false }, { name: 'CO', selected: true }, { name: 'NO2', selected: false }],
      categories: [{ name: 'A', range: 100, currentValue: 20 }, { name: 'B', range: '200', currentValue: 10 }, { name: 'C', range: 1000, currentValue: 100 }]
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
          <ResponsiveDrawer dates={this.state.dates} changeDates={this.changeDate.bind(this)} categories={this.state.categories} setValue={this.changeValue.bind(this)} options={this.state.options} toggleSelect={this.toggleSelect.bind(this)} />

        </ThemeProvider>
      </>
    )
  }
}

export default App;
