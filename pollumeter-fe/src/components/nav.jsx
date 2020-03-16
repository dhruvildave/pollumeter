import React from 'react';
import styled from 'styled-components'
import { Box, Button } from '@material-ui/core';


const NavDiv = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    right: '50px',
    top: '10vh',
    borderRadius: '10px',
})
const NavBtn = styled(Button)({
    borderRadius: 0,
    margin: 0,
})

export default class Navigation extends React.Component {
    render() {
        return (<NavDiv>
            {
                this.props.options.map((e, i) => {
                    if (e.selected === true)
                        return (<NavBtn key={i} m={20} variant="contained" color="primary" selected={e.selected} onClick={() => this.props.click(i)}>{e.name}</NavBtn>)
                    else
                        return (<NavBtn key={i} m={20} variant="outlined" color="primary" selected={e.selected} onClick={() => this.props.click(i)}>{e.name}</NavBtn>)

                })
            }
        </NavDiv>)
    }
}
