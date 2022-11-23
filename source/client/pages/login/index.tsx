import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
    	login page
    	<a href="/api/auth/login">Login</a>
    </div>
  )
}

export default Home
