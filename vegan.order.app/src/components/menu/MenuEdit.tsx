import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Formik, FormikState } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getMenu, editMenu } from './menu.service';

const menuValidationSchema = Yup.object().shape({
  title: Yup.string().required('Menu title is required'),
});

function MenuEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [menu, setMenu] = useState<{ title: string } | null>(null);

  useEffect(() => {
    const fetchMenu = async (id:string) => {
      try {
        const fetchedMenu = await getMenu(id);
        setMenu(fetchedMenu);
      } catch (error) {
        console.log(error);
        setShowError(true);
        setErrorMessage('Error fetching menu');
      }
    };
    if(id !== undefined) {
        fetchMenu(id);
    }
  }, [id]);

  const handleMenuEdit = async (
    values: { title: string },
    { resetForm }: { resetForm: (nextState?: Partial<FormikState<{ title: string }>> | undefined) => void }
  ) => {
    try {
      await editMenu(id!, values.title);
      resetForm();
      navigate('/menus');
    } catch (error) {
      console.log(error);
      setShowError(true);
      setErrorMessage('Error editing menu');
    }
  };

  return (
    <Container className="form-style">
      <Row>
        <h3>Edit Menu</h3>
      </Row>
      {showError && (
        <Row>
          <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
            {errorMessage}
          </Alert>
        </Row>
      )}
      {menu && (
        <Row>
          <Formik
            initialValues={{
              title: menu.title,
            }}
            validationSchema={menuValidationSchema}
            onSubmit={(values, { resetForm }) => {
              handleMenuEdit(values, { resetForm });
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
              dirty,
            }: {
              values: { title: string };
              errors: { title?: string };
              touched: { title?: boolean };
              handleChange: React.ChangeEventHandler<HTMLInputElement>;
              handleBlur: React.FocusEventHandler<HTMLInputElement>;
              handleSubmit: React.FormEventHandler<HTMLFormElement>;
              dirty: boolean;
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    size="sm"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.title && !!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>
                <Row className="form-buttons-container">
                  <Col>
                    <Button variant="primary" type="submit" disabled={!dirty}>
                      Save Changes
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Row>
      )}
    </Container>
  );
}

export default MenuEdit;
