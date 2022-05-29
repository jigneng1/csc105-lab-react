import * as ActionTypes from './ActionTypes'; // * mean import everything form 

export const addComment = (dishId,rating,author,comment) =>({
    type: ActionTypes.ADD_COMMENT, //action type
    payload :{
        dishId : dishId,
        rating : rating,
        author : author,
        comment : comment
    }
});
//send action to store
