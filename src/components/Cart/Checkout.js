import { useRef } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' ref={nameInputRef} id='name' />
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' ref={streetInputRef} id='street' />
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' ref={postalInputRef} id='postal' />
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' ref={cityInputRef} id='city' />
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;