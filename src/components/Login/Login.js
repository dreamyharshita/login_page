import React, { useReducer, useState,useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../../input/input.js'

const emailReducer=(state,action)=>{

if(action.type==='USER_INPUT')
{
  return { value:action.val,
isValid:action.val.includes('@'),}
}
if(action.type==='INPUT_BLUR')
{
  return {
    value:state.value,
    isValid:state.value.includes('@')
  }
}
return { value:'',
isValid:false,}
}

const passwordReducer=(state,action)=>{
if(action.type==='USER_INPUT')
{
  return { value:action.val,
isValid:((action.val.trim().length) > 6),}
}
if(action.type==='INPUT_BLUR')
{
  return {
    value:state.value,
    isValid:((state.value.trim().length)>6),
  }
}
return { value:'',
isValid:false,}
}

const Login = (props) => {
 // const [enteredEmail, setEnteredEmail] = useState('');
 // const [emailIsValid, setEmailIsValid] = useState();

  //const [enteredPassword, setEnteredPassword] = useState('');
 // const [passwordIsValid, setPasswordIsValid] = useState();


  const [enteredCollege, setEnteredCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);


  const [emailState,dispatchEmail]=useReducer(emailReducer,{value:'',isValid:false});
   const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isValid:false});

 /* useEffect(()=>{
    
const internalTimer= 
setTimeout(()=>{
   console.log("timer")

  setFormIsValid(
 
      enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length!==0);
    },200);
    return ()=>{
      console.log("cleanup");
      clearTimeout(internalTimer);
    }
  },[enteredEmail,enteredPassword,enteredCollege]);*/

  const emailChangeHandler = (event) => {

   dispatchEmail({type:'USER_INPUT',val:event.target.value});

    setFormIsValid(
 
      emailState.isValid && passwordState.isValid && enteredCollege.trim().length!==0);
    
  };

  const passwordChangeHandler = (event) => {
   dispatchPassword({type:'USER_INPUT',val:event.target.value});

    setFormIsValid(
 
      emailState.isValid && passwordState.isValid && enteredCollege.trim().length!==0);

   
  };
  const collegeChangeHandler=(event)=>{
    setEnteredCollege(event.target.value);

    setFormIsValid(
 
      emailState.isValid && passwordState.isValid && event.target.value.trim().length!==0);
  }

const validateEmailHandler = () => {
   dispatchEmail({type:'INPUT_BLUR'})
 
  };

  const validatePasswordHandler = () => {
  dispatchPassword({type:'INPUT_BLUR'})
  };

  const validateCollegeHandler=()=>{
    setCollegeIsValid(enteredCollege.trim().length!==0);
  }
  const authCtx=useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value, enteredCollege);
  };




  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
      <Input id="email" 
      label="E-mail" 
      type="email" 
      isValid={emailChangeHandler} 
      value={emailState.value}
      onChange={emailChangeHandler}
      onBlur={validateEmailHandler}
      />
<Input id="college" 
      label="College" 
      type="college" 
      isValid={collegeIsValid} 
      value={enteredCollege}
      onChange={collegeChangeHandler}
      onBlur={validateCollegeHandler}
      />
 <Input id="password" 
      label="Password" 
      type="password" 
      isValid={passwordChangeHandler} 
      value={passwordState.value}
      onChange={passwordChangeHandler}
      onBlur={validatePasswordHandler}
      />
        
       
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
