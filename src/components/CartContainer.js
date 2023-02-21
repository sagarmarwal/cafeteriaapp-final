import React from 'react'
import { useStateValue } from "../context/StateProvider";
import { MdShoppingBasket } from "react-icons/md";
import { MdRemove, MdAdd } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { actionType } from "../context/reducer";
// import { useStateValue } from "../context/StateProvider";
// import { actionType } from "../context/reducer";
const CartContainer = () => {
  const [price, setPrice] = useState(0);
  const [{ cartItems }, dispatch] = useStateValue();
  const [curItems, setCurItems] = useState([]);
  console.log(cartItems);
  const increaseItem = (index) => {

    const newItems = cartItems.map((item) => {
      console.log(item, index, item?.id);
      if (index == item?.id) {
        return { ...item, quantity: item?.quantity + 1 }
      } else {
        return item;
      }
    })
    const filteredItems = newItems.filter((element) => parseInt(element.quantity) > 0);
    setCurItems(filteredItems);
    console.log(newItems, "here");
    let total = 0;
    filteredItems.forEach(element => {
      total += parseInt(element.price * element.quantity);
    });
    setPrice(total);
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: newItems,
    });
  }

  const decreaseItem = (index) => {

    const newItems = cartItems.map((item) => {
      console.log(item, index, item?.id);
      if (index == item?.id) {
        return { ...item, quantity: Math.max(item?.quantity - 1, 0) }
      } else {
        return item;
      }
    })
    const filteredItems = newItems.filter((element) => parseInt(element.quantity) > 0);
    setCurItems(filteredItems);
    console.log(newItems, "here");
    let total = 0;
    filteredItems.forEach(element => {
      total += parseInt(element.price * element.quantity);
    });
    setPrice(total);
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: newItems,
    });
  }
  const removeItem = (index) => {

    const newItems = cartItems.map((item) => {
      console.log(item, index, item?.id);
      if (index == item?.id) {
        return { ...item, quantity: 0 }
      } else {
        return item;
      }
    })
    const filteredItems = newItems.filter((element) => parseInt(element.quantity) > 0);
    setCurItems(filteredItems);
    console.log(newItems, "here");
    let total = 0;
    filteredItems.forEach(element => {
      total += parseInt(element.price * element.quantity);
    });
    setPrice(total);
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: newItems,
    });
  }

  const clearItems = async () => {
    dispatch({
      type: actionType.CLEAR_ITEMS,
    })
  }



  useEffect(() => {
    let total = 0;
    cartItems.forEach(element => {
      total += parseInt(element.price * element.quantity);
    });
    setPrice(total);
    const filteredItems = cartItems.filter((element) => parseInt(element.quantity) > 0);

    setCurItems(filteredItems);
    // console.log(price);
  }, [])
  //     <div>

  //       {curItems && curItems.length > 0 ? (
  //         <div className='grid grid-cols-3'>
  // <div
  //               key={item?.id}
  //               className="col-auto w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
  //             >
  //               <div className="w-full flex items-center justify-between">
  //                 <motion.div
  //                   className="w-40 h-40 -mt-8 drop-shadow-2xl"
  //                   whileHover={{ scale: 1.2 }}
  //                 >
  //                   <img
  //                     src={item?.imageURL}
  //                     alt=""
  //                     className="w-full h-full object-contain"
  //                   />
  //                 </motion.div>
  //                 <motion.div
  //                   whileTap={{ scale: 0.75 }}
  //                   className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
  //                 // onClick={() => setItems([...cartItems, item])}
  //                 >
  //                   <MdShoppingBasket onClick={() => increaseItem(item?.id)} className="text-white" />
  //                 </motion.div>
  //                 <MdAdd onClick={() => increaseItem(item?.id)} />
  //                 {item?.quantity}
  //                 <MdRemove onClick={() => decreaseItem(item?.id)} />
  //                 {/* <div>Add to cart</div> */}
  //               </div>

  //            
  //             </div>
  return (<div>
    <div className="grid grid-cols-6 mb-7">
      <p className="text-textColor font-semibold text-base md:text-lg">
        Item
      </p>
      <p className="text-textColor font-semibold text-base md:text-lg">
        Name
      </p>


      <p className="text-textColor font-semibold text-base md:text-lg">
        Price
      </p>
      <p className="text-textColor font-semibold text-base md:text-lg">
        Quantity
      </p>
      <p className="text-textColor font-semibold text-base md:text-lg">
        Total Cost
      </p>
    </div>
    {curItems && curItems.length > 0 ? curItems.map((item) => (
      <div className='grid grid-cols-6'>
        <motion.div className="w-32 h-32 -mt-8 drop-shadow-2xl "
          whileHover={{ scale: 1.2 }}
        >
          <img
            src={item?.imageURL}
            alt=""
            className="w-full h-full object-contain"
          />
        </motion.div>
        {/* <div className="w-full flex flex-col items-end justify-end -mt-8">
               
                
                 <div className="flex items-center gap-8">
                 
                 </div>
               </div> */}


        <p className="text-textColor font-semibold text-base md:text-lg">
          {item?.title}
          <p className="text-sm">

            Calories: {item?.calories}
          </p>
        </p>
        {/* <p className="mt-1 text-sm text-gray-500"> */}

        {/* </p> */}
        <p className="text-lg text-headingColor font-semibold">
          <span className="text-sm text-red-500">₹</span> {item?.price}
        </p>
        <p className="text-lg text-headingColor font-semibold">
          <button className='dec' onClick={() => { decreaseItem(item.id) }}>-</button>

          {item?.quantity}
          <button className='inc' onClick={() => { increaseItem(item.id) }}>+</button>
        </p>
        <p className="text-lg text-headingColor font-semibold">
          {/* {item?.total} */}
          {item?.price * item?.quantity}
        </p>
        <p className='remove' onClick={() => { removeItem(item.id) }} >❌</p>
      </div>
    )) : (
      <div className="w-full flex flex-col items-center justify-center">
        <img src={NotFound} className="h-340" />
        <p className="text-xl text-headingColor font-semibold my-2">
          Items Not Available
        </p>
      </div>
    )}

    <div className="grid grid-cols-6 mb-7">
      <p className="text-textColor font-semibold text-base md:text-lg">
      </p>
      <p className="text-textColor font-semibold text-base md:text-lg">
      </p>


      <p className="text-textColor font-semibold text-base md:text-lg">
      </p>
      <p className="text-textColor font-semibold text-base md:text-lg">
      </p>
      <p className="text-textColor font-semibold text-base md:text-lg">
        <div >Total Cost : {price}</div>
        <Link to="/">
          <button color='brown' onClick={() => clearItems()}> Clear Cart </button>
        </Link>
      </p>
    </div>

  </div>
  )
}

export default CartContainer