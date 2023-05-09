import { useState } from 'react'
import PaginationFilter from '../../components/Filter/PaginationFilter'
import AddModal from '../../components/Modal/AddModal'
import JournalsPagination from '../../components/Pagination/JournalPagination'

function Home() {
  const [isOpen, setIsOpen] = useState(false)

  const changeModalState = () => setIsOpen(!isOpen)

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-bold ">Journal App</h1>
        <button
          className="btn bg-indigo-900 rounded-xl p-3 tex-white text-xl text-white"
          onClick={changeModalState}
        >
          Add Journal
        </button>
        <AddModal isOpen={isOpen} changeModalState={changeModalState} />
      </div>
      <PaginationFilter />
      <JournalsPagination />
    </>
  )
}

export default Home
