import routes from 'routes'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container max-w-md mx-auto flex justify-between items-center p-8">
      <div className="text-xl">Hello!</div>
      <Link className="text-blue-900 underline" to={routes.logout}>
        Logout
      </Link>
    </div>
  )
}

export default Home
