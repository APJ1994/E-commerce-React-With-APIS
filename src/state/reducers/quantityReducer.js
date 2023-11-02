const reducer=(state=0,action)=>{
    if(action.type==='INCREMENT_QUANTITY'){
        return state + action.payload
    }
    else if(action.type==='DECREMENT_QUANTITY')
    {
        return state - action.payload
    }
    else{
        return state;
    }
}

export default reducer;