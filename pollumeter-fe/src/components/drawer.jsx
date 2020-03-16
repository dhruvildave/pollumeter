import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ParaBlock from "./parablock";
import Graph from "./graph";
import DatePicker from "./datepicker";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import Example from "./piechart";
const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  space: {
    height: "3em"
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    marginTop: "10vh",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexGrow: 1,
    flexWrap: "wrap",
    padding: theme.spacing(3)
  }
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  let a = props.categories[0].currentValue;
  let b = props.categories[1].currentValue;
  console.log(a, b);
  let PredQuery = gql`
    {
      predict(indpro: 1, traf: 40) {
        aqi
        aqi2
        aqi3
        aqi4
      }
    }
  `;
  const drawer = (
    <div>
      <div className={classes.space} />
      <DatePicker
        date={props.dates.fromdate}
        type={"fromdate"}
        changeDates={props.changeDates}
      />
      <DatePicker
        date={props.dates.todate}
        type={"todate"}
        changeDates={props.changeDates}
      />
      <div className={classes.space} />
      <Divider />
      <div className={classes.space} />
      <ParaBlock categories={props.categories} setValue={props.setValue} />
      <Divider />
      <Button />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" noWrap>
            App
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Graph
          key={1}
          className={classes.content}
          data={props.data}
          data_cat={["aqi"]}
        />
        <Graph
          key={2}
          className={classes.content}
          data={props.data}
          data_cat={["polCo2"]}
        />
        <Graph
          key={3}
          className={classes.content}
          data={props.data}
          data_cat={["polSo2", "polNo2", "polCo", "polPm10", "polPm25"]}
        />
        <Query query={PredQuery}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading</div>;
            if (error) return <div>We Fucked Up</div>;
            console.log(data);
            return (
              <LineChart
                width={1000}
                height={600}
                data={[
                  { name: "A", a: data.predict.aqi },
                  { name: "B", a: data.predict.aqi2 },
                  { name: "C", a: data.predict.aqi3 },
                  { name: "D", a: data.predict.aqi4 }
                ]}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <XAxis />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="a" />
              </LineChart>
            );
          }}
        </Query>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any
};

export default ResponsiveDrawer;
