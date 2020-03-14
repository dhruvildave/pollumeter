import React from 'react';
import styled from 'styled-components'
import { Box, Button } from '@material-ui/core';


const Nav_Div = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    right: '50px',
    top: '5vh',
    borderRadius: '10px',
})
const Nav_Btn = styled(Button)`
    borderRadius: 0,
    padding: 0,
    margin: 0,
`
export default class Navigation extends React.Component {
    render() {
        return (<Nav_Div>
            {
                this.props.options.map((e, i) => {
                    if (e.selected == true)
                        return (<Nav_Btn key={i} variant="contained" color="primary" selected={e.selected} onClick={() => this.props.click(i)}>{e.name}</Nav_Btn>)
                    else
                        return (<Nav_Btn key={i} variant="outlined" color="primary" selected={e.selected} onClick={() => this.props.click(i)}>{e.name}</Nav_Btn>)

                })
            }
        </Nav_Div>)
    }
}
