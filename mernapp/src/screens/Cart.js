// Cart.js
import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import trash from "../trash.svg";

export default function Cart() {
    const data = useCart();
    const dispatch = useDispatchCart();

    if (!data || data.length === 0) {
        return (
            <div>
                <div className='container mt-5 text-center fs-3 text-white'>The Cart is Empty! </div>
            </div>
        );
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:5000/api/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data, // corrected typo here
                email: userEmail,
                order_date: new Date().toDateString()
            })
    
        });
    
        console.log("Order Response:", response);
        if (response.status === 200) {
            dispatch({ type: "DROP" });
        }
    }
    


    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                        <hr />
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr className='text-white' key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button type="button" className="btn p-0" onClick={() => dispatch({ type: "REMOVE", index: index })}>
                                        <img src={trash} alt="delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h1 className='text-white fs-2'>Total Price: {totalPrice}/-</h1>
                </div>
                <div>
                    <button className='btn bg-danger mt-5' onClick={handleCheckOut}>Check out</button>
                </div>
            </div>
        </div>
    );
}
