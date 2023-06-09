import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Formik, FormikState } from 'formik';
import { useContext, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../auth/AuthContext';

const loginValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')
});

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
  
    const handleLogin = async (values: { username: any; password: any; }, {resetForm}: { resetForm: (nextState?: Partial<FormikState<{ username: string; password: string; }>> | undefined) => void; }) => {
        try{
            await login(values.username, values.password);
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
          <h3>Login</h3>
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
            password: ''
          }}
          validationSchema={loginValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handleLogin(values, {resetForm});
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
            values: { username: string; password: string };
            errors: { username?: string; password?: string };
            touched: { username?: boolean; password?: boolean };
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
              <Row className="form-buttons-container">
                <Col>
                  <Button variant="primary" type="submit" disabled={!dirty} className='row-width-button'>Login</Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
        </Row>
        <Row className='login-register-prompt'>
          <Col>
            <span>Not registered yet? <Link to={'/register'}>Create an Account</Link></span>
          </Col>
        </Row>
      </Container>
    );
}

export default Login;