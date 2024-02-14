import React from 'react'
import {useCart, useDispatchCart} from '../components/ContextReducer';
import trash from "../trash.svg"
export default function Cart()
{
    let data = useCart();
    let dispatch = useDispatchCart();
    if(data.length===0){
        return(
            <div className="container mt-5 text-center">
                <h2 className="text-danger">The Cart is Empty!</h2>
            </div>
        )
    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return(
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                        <hr />
                        
                    </thead>
                    <tbody>
                        {data.map((food, index)=>(
                            <tr className='text-white'>
                                <th scope='row' >{index + 1}</th>
                                <td> {food.name}</td>
                                <td> {food.qty}</td>
                                <td> {food.size}</td>
                                <td> {food.price}</td>
                                <td><button type="button" className="btn p-0"><img src = {trash} alt= "delete" onClick={()=> { dispatch({type:"REMOVE", index: index}) }}/></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div> <h1 className='text-white fs-2'>Total Price: {totalPrice}/- </h1> </div>
                <div>
                    <button className='btn bg-danger mt-5 '> Check out </button>
                </div>
            </div> 
        </div>
    )
}