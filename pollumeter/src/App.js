import React from 'react';
import './App.css';
import { styled } from '@material-ui/core/styles';
import Graph from './components/graph';
import Navigation from './components/nav'
import { Container } from '@material-ui/core';
import ParaBlock from './components/parablock';
import ResponsiveDrawer from './components/drawer'
const MyContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  // remove height later
  height: '100vh'
})
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [{ name: 'CO2', selected: true }, { name: 'SO2', selected: false }, { name: 'CO', selected: true }, { name: 'NO2', selected: false }],
      categories: [{ name: 'A', range: 100, currentValue: 20 }, { name: 'B', range: '200', currentValue: 10 }, { name: 'C', range: 1000, currentValue: 100 }]
    }
    this.toggleSelect.bind(this);
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
  render() {
    return (
      <>
        <ResponsiveDrawer categories={this.state.categories} setValue={this.changeValue.bind(this)} />
        <Navigation options={this.state.options} click={this.toggleSelect.bind(this)} />
        <MyContainer className="App">
          <div><Graph /></div>
        </MyContainer>
      </>
    )
  }
}

export default App;
