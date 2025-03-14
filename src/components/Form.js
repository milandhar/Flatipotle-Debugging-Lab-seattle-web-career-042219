import React, { Component } from 'react'
import ProteinForm from './ProteinForm'
import FillingForm from './FillingForm'
import ToppingForm from './ToppingForm'
import SideForm from './SideForm'

const DEFAULT_STATE = {
  protein: [],
  fillings: [],
  toppings: [],
  sides: []
}

class Form extends Component {
  constructor(props){
    super(props)
    this.state = {
      ...DEFAULT_STATE
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    document.getElementById("order-form").reset()
    console.log(this.state)
    this.props.addOrder(this.state)
    this.setState({
      ...DEFAULT_STATE
    })

    console.log(this.state)

  }

  handleChange=(event) =>{
    const itemType = event.target.name
    const item = event.target.value

    !this.state[`${itemType}`].includes(item) ?
      this.setState({
        [itemType]: this.state[`${itemType}`].concat(item)
      })
    :
      this.setState({
        [itemType]: this.state[`${itemType}`].filter(
          ingr => ingr !== item
        )
      })
  }

  render() {
    return(
      <div className="ui raised container segment">
        <h1 className="ui block header">Order Form</h1>
        <form className="ui form" id="order-form" onSubmit={ this.handleSubmit }>
          <ProteinForm
            protein={ this.state.protein }
            handleOnChange={ this.handleChange }
          />

          <FillingForm
            fillings={ this.state.fillings }
            handleOnChange={ this.handleChange }
          />

          <ToppingForm
            toppings={ this.state.toppings }
            handleOnChange={ this.handleChange }
          />
        {/*
        def toppingForm(props)
          puts props.toppings
          puts props.handleOnChange
        end
        toppingForm(toppings: this.state.toppings, handleOnChange: this.handleChange)
      */}
          <SideForm
            sides={ this.state.sides }
            handleOnChange={ this.handleChange }
          />

          <br />

          <button className="ui blue big button" type="submit" onClick = {this.handleSubmit}
            >Submit</button>
        </form>
      </div>
    )
  }
}

export default Form
