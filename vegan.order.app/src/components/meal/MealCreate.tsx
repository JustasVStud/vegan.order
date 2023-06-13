import {  Form, Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { Formik, FormikState } from 'formik';
import { useState } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createMeal } from './meals.service';

const mealValidationSchema = Yup.object().shape({
  title: Yup.string().required('Meal title is required'),
  description: Yup.string(),
  quantity: Yup.number()
});

function MealCreate() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const { menuId } = useParams();

  const handlemealCreation = async (
    values: { title: any; description: any; quantity: any; },
    { resetForm }: { resetForm: (nextState?: Partial<FormikState<{ title: string; description: string; quantity: number; }>> | undefined) => void; }
  ) => {
    try {
        if(menuId !== undefined){
            await createMeal(menuId, values.title, values.description, values.quantity); 
        }
      resetForm();
      navigate(`/menus/${menuId}`);
    } catch (error) {
      console.log(error);
      setShowError(true);
      setErrorMessage('Error creating meal');
    }
  };

  return (
    <Card>
        {showError && (
            <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
              {errorMessage}
            </Alert>
        )}
        <Formik
          initialValues={{
            title: '',
            description: '',
            quantity: 0
          }}
          validationSchema={mealValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handlemealCreation(values, { resetForm });
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
             values: { title: string; description: string; quantity: number; };
             errors: { title?: string; description?: string; quantity?: string; };
             touched: { title?: boolean; description?: boolean; quantity?: boolean; };
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
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  size="sm"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.description && !!errors.description}
                />
                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  size="sm"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.quantity && !!errors.quantity}
                />
                <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
              </Form.Group>
              <Row className="form-buttons-container">
                <Col>
                  <Button variant="primary" type="submit" disabled={!dirty}>
                    Create meal
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>

    </Card>
  );
}

export default MealCreate;
