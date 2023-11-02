import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {actionCreators} from '../state/index'

const QuantityComponent = () => {
  const number=useSelector(state=>state.number)
  const dispatch=useDispatch()
  const {decrementQuantity,incrementQunatity}=bindActionCreators(actionCreators,dispatch)
  return (
    <div>
        {/* <!-- component --> */}

      {/* <button onClick={()=>{dispatch(actionCreators.decrementQuantity(1))}}>-</button>
      <input type='number' value={number}></input>
      <button onClick={()=>{dispatch(actionCreators.incrementQunatity(1))}}>+</button> */}

      <button onClick={()=>{decrementQuantity(1)}}>-</button>
      <input type='number' value={number} style={{textAlign:'center'}}></input>
      <button onClick={()=>{incrementQunatity(1)}}>+</button>

    </div>
  )
}



export default QuantityComponent;