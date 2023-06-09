import { Formik, FormikState } from 'formik';
import { useState, useContext } from 'react';
import { Container, Row, Form, Col, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../auth/AuthContext';


const registerValidationSchema = Yup.object().shape({
      username: Yup.string()
        .min(3, 'Username is too short')
        .max(20, 'Username is too long')
        .required('Username is required'),
      password: Yup.string()
        .min(6, 'Password is too short')
        .max(30, 'Password is too long')
        .required('Password is required'),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required('Password confirmation is required'),
      email: Yup.string()
        .email('Invalid email')
        .required('Email is required')    
});

function Register() {
  const navigate = useNavigate(); 
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const { register } = useContext(AuthContext);

  const handleRegister = async (values: { username: any; password: any; email: any}, {resetForm}: { resetForm: (nextState?: Partial<FormikState<{ username: string; password: string; passwordConfirmation: string; email: string}>> | undefined) => void; }) => {
    try{
        await register(values.username, values.password, values.email);
        resetForm();
        navigate('/');
    } catch (error) {
        console.log(error);
        setShowError(true);
        setErrorMessage('Username or password incorrect');
    }
}; 
  return (
    <Container className='form-style'>
      <Row>
        <h3>Register</h3>
      </Row>
      {showError && (
        <Row> 
          <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
            {errorMessage}
          </Alert>
        </Row>
      )}
      <Row>
      <Formik
        initialValues={{
          username: '',
          password: '',
          passwordConfirmation: '',
          email: ''
        }}
        validationSchema={registerValidationSchema}
        onSubmit={(values, { resetForm }) => {
          handleRegister(values, {resetForm});
        }}
        enableReinitialize
      >
        {({
          values, 
          errors,
          touched,
          handleChange, 
          handleBlur, 
          handleSubmit, 
          dirty
        }: {
            values: { username: string; password: string, passwordConfirmation: string, email: string};
            errors: { username?: string; password?: string,  passwordConfirmation?: string, email?: string};
            touched: { username?: boolean; password?: boolean, passwordConfirmation?: boolean, email?: boolean};
            handleChange: React.ChangeEventHandler<HTMLInputElement>;
            handleBlur: React.FocusEventHandler<HTMLInputElement>;
            handleSubmit: React.FormEventHandler<HTMLFormElement>;
            dirty: boolean;
          }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                name='username'
                size='sm'
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.username && !!errors.username}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  size='sm'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                size='sm'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                name='passwordConfirmation'
                size='sm'
                value={values.passwordConfirmation}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.passwordConfirmation}
              </Form.Control.Feedback>
            </Form.Group>
            <Row className="form-buttons-container">
              <Col>
                <Button variant="primary" type="submit" disabled={!dirty} className='row-width-button'>Register</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      </Row>
      <Row className='login-register-prompt'>
        <Col>
            <span>
                Already registered? <Link to={'/login'}>Login</Link>
            </span>
        </Col>
      </Row>
    </Container>
  )
}

export default Register;