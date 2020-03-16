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
export default class Outer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: {
        fromdate: new Date("2018-05-18"),
        todate: new Date("2018-08-18")
      },
      categories: [
        { name: "Industrial Production Index", range: 100, currentValue: 15 },
        { name: "Traffic", range: "200", currentValue: 10 }
      ]
    };
    this.changeDate.bind(this);
    this.changeValue.bind(this);
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
      <App
        changeValue={this.changeValue.bind(this)}
        changeDate={this.changeDate.bind(this)}
        dates={this.state.dates}
        categories={this.state.categories}
      />
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    // try query
    // try query end
    this.state = {
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

                  return (
                    <ResponsiveDrawer
                      data_cat={this.state.data_cat}
                      data={data.datapol}
                      dates={this.props.dates}
                      changeDates={this.props.changeDate}
                      categories={this.props.categories}
                      setValue={this.props.changeValue}
                      options={this.state.options}
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
