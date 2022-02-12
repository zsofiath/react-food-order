import useValiation from "../UI/utilities/useValidation";
import classes from "./Checkout.module.css";
const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {

  const {
    value: namevalue,
    isValid: nameIsValid,
    hasError: namehasError,
    valueBlurHandler: namevalueBlurHandler,
    valueChangeHandler: namevalueChangeHandler,
  } = useValiation(isNotEmpty);

  const {
    value: streetvalue,
    isValid: streetIsValid,
    hasError: streethasError,
    valueBlurHandler: streetvalueBlurHandler,
    valueChangeHandler: streetvalueChangeHandler,
  } = useValiation(isNotEmpty);

  const {
    value: cityvalue,
    isValid: cityIsValid,
    hasError: cityhasError,
    valueBlurHandler: cityvalueBlurHandler,
    valueChangeHandler: cityvalueChangeHandler,
  } = useValiation(isNotEmpty);

  const {
    value: postalvalue,
    isValid: postalIsValid,
    hasError: postalhasError,
    valueBlurHandler: postalvalueBlurHandler,
    valueChangeHandler: postalvalueChangeHandler,
  } = useValiation(isFiveChars);

  const confirmHandler = (event) => {
    event.preventDefault();

    namevalueBlurHandler();
    streetvalueBlurHandler();
    cityvalueBlurHandler();
    postalvalueBlurHandler();

    const formIsValid =
      nameIsValid &&
      streetIsValid &&
      cityIsValid &&
      postalIsValid;

    if (formIsValid) {
      props.onConfirm({
        name: namevalue,
        street: streetvalue,
        city: cityvalue,
        postal: postalvalue,
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input
          autoComplete="false"
          type="text"
          id="name"
          value={namevalue}
          onBlur={namevalueBlurHandler}
          onChange={namevalueChangeHandler}
        />
        {namehasError && <p>Invalid</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input
          autoComplete="false"
          type="text"
          value={streetvalue}
          onBlur={streetvalueBlurHandler}
          onChange={streetvalueChangeHandler}
          id="street"
        />
        {streethasError && <p>Invalid</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input
          autoComplete="false"
          type="text"
          value={postalvalue}
          onBlur={postalvalueBlurHandler}
          onChange={postalvalueChangeHandler}
          id="postal"
        />
        {postalhasError && <p>Invalid</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input
          autoComplete="false"
          type="text"
          value={cityvalue}
          onBlur={cityvalueBlurHandler}
          onChange={cityvalueChangeHandler}
          id="city"
        />
        {cityhasError && <p>Invalid</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
