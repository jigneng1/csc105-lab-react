import React from 'react';
function Dish(props) {
    const { detail, dish } = props;
   function rederComment(dish) {
       if(dish!=null){
           const result = detail.filter((e)=>{
            return e.dishId === dish.id
           });
           return <div><h1>Comment</h1>
           {result.map((e)=>{
               return <div>
                   <div>{e.comment}</div>
                   <div>-- {e.author} , &nbsp;
                   {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(e.date)))}</div>
               </div>
           })}
           </div>
       }
       else{
           return <div></div>
       }
   }
    
    return (
        <div className="col-12 col-md-5 m-1">
            {rederComment(dish)}
        </div>
    );

}
export default Dish;
