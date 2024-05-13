import routes from 'routes'
import api from 'api'
import { useFormik } from 'formik'
import useAuthentication from 'hooks/useAuthentication'
import { useHistory } from 'react-router'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

type ErrorResponse = {
  response: {
    data: {
      error: string
    }
  }
}

function Register() {
  const { token } = useAuthentication()
  const history = useHistory()
  if (token) {
    history.push(routes.home)
  }
  const { errors, handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values, { setErrors }) => {
      try {
        await fetch(api.register, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        })
        history.push(routes.login)
      } catch (err) {
        setErrors({
          confirmPassword:
            (err as ErrorResponse)?.response?.data?.error ||
            'There was a problem with your registration, please try again',
        })
      }
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string()
        .required('Please confirm your password')
        .when('password', {
          is: (val: string) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref('password')],
            'Passwords do not match',
          ),
        }),
    }),
  })

  if (token) {
    return <Redirect to={routes.home} />
  }

  return (
    <div className="container max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <h1 className="text-xl text-gray-700">Register for app</h1>
        <div>
          <input
            className="w-full h-10 px-4 rounded border-2 border-gray-300"
            name="email"
            onChange={handleChange}
            type="text"
            value={values.email}
            placeholder="Email..."
          />
          {errors.email && (
            <div className="text-red-700 text-xs mt-1">{errors.email}</div>
          )}
        </div>
        <div>
          <input
            className="w-full h-10 px-4 rounded border-2 border-gray-300"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            placeholder="Password..."
          />
          {errors.password && (
            <div className="text-red-700 text-xs mt-1">{errors.password}</div>
          )}
        </div>
        <div>
          <input
            className="w-full h-10 px-4 rounded border-2 border-gray-300"
            name="confirmPassword"
            onChange={handleChange}
            type="password"
            value={values.confirmPassword}
            placeholder="Confirm password..."
          />
          {errors.confirmPassword && (
            <div className="text-red-700 text-xs mt-1">
              {errors.confirmPassword}
            </div>
          )}
        </div>
        <button className="bg-blue-400 text-white rounded h-10" type="submit">
          Sign Up
        </button>
      </form>
      <div className="text-center mt-4">
        <Link className="text-blue-900 underline" to={routes.login}>
          Have an account? Login!
        </Link>
      </div>
    </div>
  )
}

export default Register
