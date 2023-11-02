export const incrementQunatity=(number)=>{
    return (dispatch)=>{
        dispatch({
            type:'INCREMENT_QUANTITY',
            payload:number
        })
          
    }
        
}

export const decrementQuantity=(number)=>{

    return (dispatch)=>{
        dispatch({
            type:'DECREMENT_QUANTITY',
            payload:number
        })
          
    }
}