import React from 'react';
import './App.css';
import { styled } from '@material-ui/core/styles';
import Graph from './components/graph';
import Navigation from './components/nav'
import { Container } from '@material-ui/core';

const MyContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // remove height later
  height: '100vh'
})
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [{ name: 'CO2', selected: true }, { name: 'SO2', selected: false }, { name: 'CO', selected: true }, { name: 'NO2', selected: false }]
    }
    this.click.bind(this);
  }

  click(i) {
    this.setState(state => {
      state.options[i].selected = !state.options[i].selected
      return state
    })
  }
  render() {
    return (
      <>
        <Navigation options={this.state.options} click={this.click.bind(this)} />
        <MyContainer className="App">
          <div><Graph /></div>
        </MyContainer>
      </>
    )
  }
}

export default App;
