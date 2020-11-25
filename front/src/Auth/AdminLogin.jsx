import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
//import FormikControl from './FormikControl'

function Login() {
  const initialValues = {
    email: '',
    password: '',
  }
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  })

  const onSubmit = (values) => {
    console.log('Form data', values)
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <Formik
              control='input'
              type='email'
              label='Email'
              name='email'
            />
            <Formik
              control='input'
              type='password'
              label='Password'
              name='password'
            />
            <button type='submit' disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Login
