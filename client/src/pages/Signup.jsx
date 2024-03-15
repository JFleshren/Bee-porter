import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '', firstName: '', lastName: '', zipcode: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
          zipcode: parseInt(formState.zipcode)
        },
      });
      
      Auth.login(data.addUser.token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1 d-flex justify-content-center align-items-center">
      <div>
        <Link to="/login" className="link">← Go to Login</Link>
        <h2 className="heading">Signup</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              placeholder="First"
              name="firstName"
              type="text"
              id="firstName"
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              placeholder="Last"
              name="lastName"
              type="text"
              id="lastName"
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipcode">Zipcode:</label>
            <input
              placeholder="123456"
              name="zipcode"
              type="text"
              id="zip"
              className="input"
              onChange={handleChange}
            />
          </div>
          {error ? (
            <div>
              <p className="error-text">The provided credentials are incorrect</p>
            </div>
          ) : null}
          <div className="flex-row flex-end">
            <button type="submit" className="button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

