import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import {MdRemove, MdAdd} from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";


const RowContainer = ({ flag, data, scrollValue }) => {
  console.log(data)
  const rowContainer = useRef();
  // const [itemCounter, setItemCounter] = useState([]);
  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();
  // console.log(cartItems);
  
  const addtocart = () => {
    // const updatedItems = map(() => )
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
    
    // setItemCounter(items);

  };

  // const increaseItem = (index) => {
  //   const newItems = items;
  //   console.log(newItems);
  //   newItems[index].quantity += 1;
  //   dispatch({
  //     type: actionType.SET_CARTITEMS,
  //     cartItems: newItems
  //   })
  // }
  const decreaseItem = (index) => {

    const newItems = cartItems.map((item) => {
      console.log(item, index, item?.id);
      if(index == item?.id){
        return {...item, quantity: Math.max(item?.quantity - 1)}
      }else{
        return item;
      }
    })
    console.log(newItems, "here");
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: newItems,
    });
  }
  
  const increaseItem = (index) => {

    const newItems = cartItems.map((item) => {
      console.log(item, index, item?.id);
      if(index == item?.id){
        return {...item, quantity: item?.quantity + 1}
      }else{
        return item;
      }
    })
    console.log(newItems, "here");
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: newItems,
    });
  }

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  // useEffect(() => {
  //   // console.log
  //   addtocart();
  // }, []);

  // console.log(items);
  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
{        data.map((item, index) => (
    
          <div
            key={item?.id}
            className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                // onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingBasket onClick ={() => increaseItem(item?.id)} className="text-white" />
              </motion.div>
              {/* <MdAdd onClick={() => {
                // handleItems(item?.id);
                // setItems([...cartItems, item])
                increaseItem(item?.id);
                }}/> */}
                {item?.quantity}
              {/* <MdRemove  onClick ={ () => decreaseItem(item?.id)}/> */}
              {/* <div>Add to cart</div> */}
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Calories: {item?.calories}
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">₹</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default RowContainer;
