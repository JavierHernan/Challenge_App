import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors({});
      return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    };

    // const demoSubmit = (e) => {
    //   e.preventDefault();
    //   return dispatch(sessionActions.login({ email: 'demo@user.io', password: 'password' }))
    //     .then(closeModal);
    // }
  
    return (
      <>
        <form className='login-form' onSubmit={handleSubmit}>
          <h1>Log In</h1>
          <label>
            Username or Email
            <input
              className='login-email-input'
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.credential && (
            <p>{errors.credential}</p>
          )}
          <div className='login-button-container'>
            <button type="submit">Log In</button>
          </div>
          {/* <div className='demo-user'>
            <a onClick={(e) => demoSubmit(e)}>Demo User</a>
          </div> */}
        </form>
      </>
    );
  }
  
  export default LoginFormModal;