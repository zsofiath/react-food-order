import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setisCheckout] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const [isSubmiting, setisSubmiting] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setisCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    setisSubmiting(true);
    fetch(
      "https://react-practice-333ee-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    ).then(() => {
      setisSubmiting(false);
      setisSubmitted(true);
      cartCtx.clearCart();
    });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const SubmittingMessage = <p>Your order is submitting.</p>;
  const SubmitedgMessage = <p>Your order is sumbitted.</p>;
  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout cancelOrder={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );
  return (
    <Modal onClose={props.onClose}>
      {(!isSubmiting && !isSubmitted) && cartModalContent}
      {(isSubmiting && !isSubmitted) && SubmittingMessage}
      {(!isSubmiting && isSubmitted) && SubmitedgMessage}
    </Modal>
  );
};

export default Cart;
