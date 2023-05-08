import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import Card from '../../components/Card/Card'
import AddModal from '../../components/Modal/AddModal'
import { CardProps } from '../../types/CardProps'
import JournalsPagination from '../../components/Pagination/JournalPagination'
import PaginationFilter from '../../components/Filter/PaginationFilter'

function Home() {
  const navigate = useNavigate()
  const urlLocation = useLocation()
  const [journals, setJournals] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(2)
  const searchParams = new URLSearchParams(urlLocation.search)

  // function to change model open or close state
  const changeModalState = () => setIsOpen(!isOpen)

  //function to change filter of pagination
  const changeItemsPerPage = (itemsCount: number) => {
    setItemsPerPage(itemsCount)
  }
  useEffect(() => {
    searchParams.set('items', itemsPerPage.toString())
    navigate(`/?${searchParams.toString()}`)
  }, [itemsPerPage])

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
      <PaginationFilter changeItemsPerPage={changeItemsPerPage} />
      <JournalsPagination key={itemsPerPage} itemsPerPage={itemsPerPage} />
    </>
  )
}

export default Home
