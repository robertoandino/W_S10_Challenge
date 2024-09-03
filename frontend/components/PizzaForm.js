import React, { useReducer } from 'react'
import { useCreateOrderMutation } from '../state/ordersApi' 
const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'

const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,  //pepperoni
  '2': false,  //Green peppers
  '3': false,  //Pineapple
  '4': false,  //Mushrooms
  '5': false,  //Ham
}

const reducer = (state, action) => {
  switch(action.type){
    case CHANGE_INPUT: {
      const { name, value } = action.payload
      return { ...state, [name]: value}
    }
    case RESET_FORM:
      return initialFormState
    default:
      return state
  }
}

export default function PizzaForm() {
  const [createOrder, { error: creationError, isLoading: creatingOrder }] = useCreateOrderMutation()
  const [state, dispatch] = useReducer(reducer, initialFormState)

  const onChange = ({ target: {name, value, checked, type } }) => {
    //If else to handle different input types, like checkbox, text, radio... 
    if (type === 'checkbox') {
      dispatch({ type: CHANGE_INPUT, payload: { name, value: checked } });
    } else {
      dispatch({ type: CHANGE_INPUT, payload: { name, value } });
    }
  }

  const resetForm = () => {
    dispatch({ type: RESET_FORM })
  }

  const onNewOrder = evt => {
    evt.preventDefault()
    const { fullName, size, ...toppings} = state
    //Returns only the selected toppings. The ones whose value is set to true
    const selToppings = Object.keys(toppings).filter(key => toppings[key]);
    createOrder({ fullName, size, toppings: selToppings })
      .unwrap()
      .then(data => {
        console.log(data)
        resetForm()
      })
      .catch(err => {
        console.log(err)
      })
  }

  console.log(creatingOrder)
  return (
    <form onSubmit={onNewOrder}>
      <h2>Pizza Form</h2>
      {creatingOrder && <div className='pending'>Order in progress</div>}
      {creationError && <div className='failure'>Order failed: {creationError.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            value={state.fullName}
            onChange={onChange}
            placeholder="Type full name"
            type="text"
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" onChange={onChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" onChange={onChange}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" onChange={onChange}/>
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" onChange={onChange}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" onChange={onChange}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onChange={onChange}/>
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
