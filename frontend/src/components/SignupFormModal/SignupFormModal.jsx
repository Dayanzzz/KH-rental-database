
    // frontend/src/components/SignupFormPage/SignupFormPage.jsx
    import { useState, useEffect } from 'react';
    import { useDispatch } from 'react-redux';
    import { useModal } from '../../context/Modal';
    import * as sessionActions from '../../store/session';
    import './SignupForm.css';
    
    function SignupFormModal() {
      const dispatch = useDispatch();
      const [email, setEmail] = useState("");
      const [username, setUsername] = useState("");
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [errors, setErrors] = useState({});
      const { closeModal } = useModal();
    
      // Effect to reset errors when modal is closed
      useEffect(() => {
        return () => {
          setErrors({});
        };
      }, [closeModal]);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
          setErrors({});
          return dispatch(
            sessionActions.signup({
              email,
              username,
              firstName,
              lastName,
              password
            })
          )
            .then(closeModal)
            .catch(async (res) => {
              const data = await res.json();
              if (data?.errors) {
                setErrors(data.errors);
              }
            });
        }
        return setErrors({
          confirmPassword: "Confirm Password field must be the same as the Password field"
        });
      };
    
      const isFormValid = () => {
        return email && username.length >= 4 && password.length >= 6 
               && firstName && lastName && confirmPassword;
      };
    
      return (
        <>
          <h1 className="signup">Sign Up</h1>
          <form onSubmit={handleSubmit}>
           


            <label>
           
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder='First Name'
              />
            </label>
            {errors.firstName && <p>{errors.firstName}</p>}
            





            <label>
          
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder='Last Name'
              />
            </label>
            {errors.lastName && <p>{errors.lastName}</p>}
            


            <label>
              
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Email'
              />
            </label>

            {errors.email && <p>{errors.email}</p>}
            




            <label>
            
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder='Username'
              />
            </label>
            {errors.username && <p>{errors.username}</p>}
            






            <label>
            
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Password'
              />
            </label>
            {errors.password && <p>{errors.password}</p>}
            
            <label>
             
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder=' Confirm Password'
              />
            </label>
            {errors.confirmPassword && (
              <p>{errors.confirmPassword}</p>
            )}
            
            <button className="signupbtn" type="submit" disabled={!isFormValid()}>Sign Up</button>
          </form>
        </>
      );
    }
    
    export default SignupFormModal;
    