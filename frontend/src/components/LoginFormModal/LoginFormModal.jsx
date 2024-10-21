// frontend/src/components/LoginFormPage/LoginFormPage.jsx

import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import {useModal} from '../../context/Modal';
import './LoginForm.css';


function LoginFormModal() {
//DEMO USER CAN POSSIBLY TAKE OUT 
//   const handleDemoLogin = () => {
//     const demoCredentials = {
//         username: 'demoUser',
//         password: 'demoPassword'
//     };
//     login(demoCredentials.username, demoCredentials.password);
// };
// const login = (username, password) => {
//   console.log(`Logging in with: ${username}, ${password}`);
//   alert(`Logged in as ${username}`);
// };
///////////////////////////////////////////////////
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleDemoLogin = async () => {
    try {
      await dispatch(sessionActions.demoLogin()); 
      closeModal();
    } catch (error) {
      console.error("Demo login failed", error);
    }
  };


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
  const isButtonDisabled = credential.length < 4 || password.length < 6;
  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} >
        <label>
          <input
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
      
          <input
            type="password"
             placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit"disabled={isButtonDisabled}>Log In</button>
      </form>



      {/* DEMOUSER */}
      <div className="demo-link-container">
                <span className="demo-link" onClick={handleDemoLogin}>
                    Demo User
                </span>
            </div>
    </>
  );
}

export default LoginFormModal;

