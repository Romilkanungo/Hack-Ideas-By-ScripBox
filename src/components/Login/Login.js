import React, {useState, useEffect} from 'react';
import './Login.css';

function Login() {
  const [employees, setEmployees] = useState('');
  const [showError, setError] = useState(false);

  useEffect( () => {
    fetch('http://localhost:8000/employees')
      .then( response => {
        return response.json(); // this is asynchornons hence another then
      })
      .then( (employees) => {
        setEmployees(employees);
      });
  },[]);

  // This function will be used to either login to the application of throw and error to the user
  const loginToApp = () => {
    // Assuming loginIdValue is unique
    let loginIdValue = Number(document.getElementById('loginId').value);
    let loginPasswordValue = document.getElementById('loginPassword').value;

    let employeeIds = [];
    let employeePasswords = [];
    for( let i = 0; i<employees.length ; i++){
      employeeIds.push(employees[i].id);
      employeePasswords.push(employees[i].password)
    }

    if(employeeIds.includes(loginIdValue) && loginPasswordValue === employeePasswords[employeeIds.indexOf(loginIdValue)]){
      window.location.href += 'home';
      localStorage.setItem("loginId", loginIdValue);
    }
    else{
      setError(true);
    }
    
  }

    return (
      <div className='LoginPage__Wrapper'> 
        <h1 className='LoginPage__HeaderText'> Welcome to Hack Ideas by ScripBox </h1>
        <div className='LoginPage__Container'>
          <div className='LoginPage__Card'>
            <div className='LoginCard__Text'>Login</div>
            <label className='LoginCard__Label'>Login Id</label>
            <input id='loginId' type="text" placeholder='Enter Login ID'/>
            <label className='LoginCard__Label'>Password</label>
            <input id='loginPassword' type="password" placeholder='Enter Your Password'/>
            <div style={{display: showError ? 'block' : 'none'}} 
                className='LoginCard__Error'> 
                LoginID or Password not correct.
            </div>
            <button onClick={loginToApp}>Login</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Login;