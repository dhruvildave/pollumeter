import React from 'react'
import InputSlider from './inputslider'
export default class ParaBlock extends React.Component {
    render() {
        return (<div>
            {
                this.props.categories.map((category, index) => {
                    return <InputSlider name={category.name} currentValue={category.currentValue} range={category.range} key={index} index={index} setValue={this.props.setValue} />
                })
            }
        </div>)
    }
}
