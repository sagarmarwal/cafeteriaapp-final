import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import CartContainer from "./components/CartContainer";

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      const newData = data.map((obj, index) => ({...obj, quantity: 0, id: index}))
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: newData
      });
      dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: newData
      })
    });
  };
  console.log(foodItems);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/cart" element={<CartContainer/>}/>
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
