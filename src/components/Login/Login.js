import React, { useEffect, useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input.js';

import { useContext } from 'react';
import AuthContext from '../../context/auth-context';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.value, isValid: action.value.includes('@')}
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.value, isValid: action.value.trim().length > 6};
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6};
  }
  return {value: '', isValid: false};
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: undefined});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: undefined});

  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;

  const context = useContext(AuthContext);

  useEffect(() => {
    // setTimeout() function a.k.a side-effect function delayes 0.5 seconds after execution
    const identifier = setTimeout(() => {
      console.log('side-effect function');
      setFormIsValid(
        emailIsValid&& passwordIsValid
      );
    }, 500);

    // below is called clean-up function
    return () => {
      console.log('clean-up function');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', value: event.target.value});

    setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', value: event.target.value});

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})

    setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});

    setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    context.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          id='email' 
          label='E-mail' 
          type='email' 
          isValid={emailIsValid} 
          value={emailState.value} 
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}>
        </Input>
        <Input 
          id='password' 
          label='Password' 
          type='password' 
          isValid={passwordIsValid} 
          value={passwordState.value} 
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}>
        </Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
