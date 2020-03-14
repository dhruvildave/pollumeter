import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        marginLeft: 20,
        width: 250,
    },
    input: {
        width: 50,
    },
});

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);


export default function InputSlider(props) {
    const classes = useStyles();
    const value = props.currentValue;
    const setValue = props.setValue;
    //const [value, setValue] = React.useState(30);

    const handleSliderChange = (event, newValue) => {
        setValue(props.index, newValue);
    };

    return (
        <div className={classes.root}>

            <Typography id="input-slider" gutterBottom align="left" margin={5}>
                {props.name} : <span>{props.currentValue}</span>
            </Typography>
            <Grid container spacing={2} alignItems="center" >

                <Grid item xs >
                    <PrettoSlider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        max={props.range}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
