import React, { Suspense } from "react";
//  apollo
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import { Query } from "react-apollo";
//rest
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, createMuiTheme } from "@material-ui/core";
import ResponsiveDrawer from "./components/drawer";

// 2
const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql/"
});

// 3
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const FEED_QUERY = gql`
  {
    datapol(
      area: "Foster"
      startdatetime: "2017-11-18"
      enddatetime: "2017-12-18"
      numberrecords: 20
    ) {
      datetime
      polCo2
      polSo2
      polNo2
      polCo
      polPm10
      polPm25
      aqi
      area
    }
  }
`;
class Outer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: {
        fromdate: new Date("2018-07-18"),
        todate: new Date("2018-08-18")
      }
    };
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    // try query
    // try query end
    this.state = {
      options: [
        { name: "CO2", selected: true },
        { name: "SO2", selected: false },
        { name: "CO", selected: true },
        { name: "NO2", selected: false }
      ],
      categories: [
        { name: "Industrial Production Index", range: 100, currentValue: 15 },
        { name: "Traffic", range: "200", currentValue: 10 }
      ],
      data_cat: [
        "polCo2",
        "polSo2",
        "polNo2",
        "polCo",
        "polPm10",
        "polPm25",
        "aqi"
      ]
    };
  }

  toggleSelect(i) {
    this.setState(state => {
      state.options[i].selected = !state.options[i].selected;
      return state;
    });
  }
  changeValue(index, newValue) {
    this.setState(state => {
      state.categories[index].currentValue = newValue;
      return state;
    });
  }
  changeDate(type, date) {
    this.setState(state => {
      state.dates[type] = date;
      return state;
    });
  }
  render() {
    return (
      <>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <Suspense fallback={"Loading"}>
              <CssBaseline />
              <Query query={FEED_QUERY}>
                {({ loading, error, data }) => {
                  if (loading) return <div>Loading</div>;
                  if (error) return <div>We Fucked Up</div>;

                  console.log(data.datapol);
                  return (
                    <ResponsiveDrawer
                      data_cat={this.state.data_cat}
                      data={data.datapol}
                      dates={this.state.dates}
                      changeDates={this.changeDate.bind(this)}
                      categories={this.state.categories}
                      setValue={this.changeValue.bind(this)}
                      options={this.state.options}
                      toggleSelect={this.toggleSelect.bind(this)}
                    />
                  );
                }}
              </Query>
            </Suspense>
          </ThemeProvider>
        </ApolloProvider>
      </>
    );
  }
}

export default App;
