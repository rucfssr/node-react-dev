import routes from 'routes'
import api from 'api'
import { useFormik } from 'formik'
import useAuthentication from 'hooks/useAuthentication'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

type LoginResponse = {
  user: {
    id: number
    email: string
  }
  token: {
    jwt: string
    expiresIn: number
  }
}

function Login() {
  const { setToken } = useAuthentication()
  const history = useHistory()
  const { errors, handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, { setErrors }) => {
      try {
        const response = await fetch(api.login, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        })
        const body: LoginResponse = await response.json()
        setToken(body.token.jwt)
        history.push(routes.home)
      } catch {
        setErrors({
          password:
            'There was a problem logging you in, please verify your email and password',
        })
      }
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
      password: Yup.string().required(' Password is required'),
    }),
  })

  return (
    <div className="container max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <h1 className="text-xl text-gray-700">Login to app</h1>
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
        <button className="bg-blue-400 text-white rounded h-10" type="submit">
          Log in
        </button>
      </form>
      <div className="text-center mt-4">
        <Link className="text-blue-900 underline" to={routes.register}>
          Don't have an account? Sign up!
        </Link>
      </div>
    </div>
  )
}

export default Login
