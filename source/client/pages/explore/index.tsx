import type { NextPage } from 'next'
import Navbar from '../../components/Navbar'
import FindServices from '../../components/FindServices'

const ExplorePage: NextPage = () => {
  return (
    <div className="flex flex-col">
      <Navbar/>
      <FindServices/>
    </div>
  )
}

export default ExplorePage
