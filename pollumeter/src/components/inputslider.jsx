import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
    root: {
        width: 250,
    },
    input: {
        width: 50,
    },
});

export default function InputSlider(props) {
    const classes = useStyles();
    const value = props.currentValue;
    const setValue = props.setValue;
    //const [value, setValue] = React.useState(30);

    const handleSliderChange = (event, newValue) => {
        setValue(props.index, newValue);
    };

    const handleInputChange = event => {
        setValue(props.index, event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(props.index, 0);
        } else if (value > 100) {
            setValue(props.index, props.range);
        }
    };

    return (
        <div className={classes.root}>

            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Typography id="input-slider" gutterBottom>
                        {props.name}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        max={props.range}
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={value}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: Math.floor(props.range / 20),
                            min: 0,
                            max: props.range,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
