import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { JournalType } from '../../types/CardProps'
import Card from '../Card/Card'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface Props {
  itemsPerPage: number
}

const JournalsPagination: React.FC<Props> = ({ itemsPerPage }) => {
  const urlLocation = useLocation()
  const navigate = useNavigate()
  const url = 'http://localhost:3001/api/v1'
  const [journals, setJournals] = useState<CardProps[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [isSearch, setIsSearch] = useState<number>(0)
  const [totalJournal, setTotalJournal] = useState<number>(0)
  const [totalFetchedJournal, setTotalFetchedJournal] = useState<number>(0)
  const searchParams = new URLSearchParams(urlLocation.search)
  const [pageCount, setPageCount] = useState(0)
  const [itemCount, setItemCount] = useState(itemsPerPage)
  const [searchDate, setSearchDate] = useState<string>('')

  useEffect(() => {
    setCurrentPage(searchParams.get('page') || 1)
    setItemCount(searchParams.get('items') || itemsPerPage)
  }, [searchParams])
  useEffect(() => {
    fetchJournals()
  }, [itemCount, currentPage])

  const fetchJournals = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/v1/journal?page=${currentPage}&take=${itemCount}`
    )
    const journalData = response.data.data
    setJournals(journalData)
    const total = journalData.length
    setTotalFetchedJournal(total)
    setTotalPages(Math.ceil(total / itemsPerPage))
    setTotalJournal(response.data.metadata.total)
  }

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
    navigate(`?page=${currentPage - 1}&items=${itemsPerPage}`)
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
    navigate(`?page=${parseInt(currentPage) + 1}&items=${itemsPerPage}`)
  }

  const handleSearch = async () => {
    setSearchDate(event.target.value)
    setIsSearch(true)
  }

  const fetchByDate = async (date: string) => {
    const response = await axios.get(`${url}/journal?date=${date}`)
    setJournals(response.data.data)
    setIsSearch(true)
  }

  useEffect(() => {
    fetchByDate(searchDate)
  }, [searchDate])

  const canGoBack = currentPage > 1
  const canGoForward = journals.length >= itemsPerPage

  // search filter for date

  // function to handle search query
  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }
  return (
    <div className="journals mt-3 flex flex-col gap-y-3">
      <div className="mb-5 w-1/5">
        <input
          type="date"
          className="border-2 border-gray-200 p-2 w-full"
          placeholder="Search by date (YYYY-MM-DD)"
          value={searchDate}
          onChange={handleSearch}
        />
      </div>

      {isSearch ? (
        <>
          {journals.map((journal, index) => (
            <Link to={`/journal/${journal.id}`}>
              <div key={index}>
                <Card
                  title={journal.title}
                  date={journal.date}
                  body={journal.body}
                />
              </div>
            </Link>
          ))}
        </>
      ) : (
        <>
          {journals.map((journal, index) => (
            <Link to={`/journal/${journal.id}`}>
              <div key={index}>
                <Card
                  title={journal.title}
                  date={journal.date}
                  body={journal.body}
                />
              </div>
            </Link>
          ))}
        </>
      )}

      {!isSearch && (
        <label>
          Showing {totalFetchedJournal} journals out of {totalJournal} journals
        </label>
      )}
      <div className="felx gap-x-3">
        <button
          className="m-2 bg-indigo-900 p-3 rounded-lg text-white"
          onClick={handlePreviousPage}
          disabled={!canGoBack}
        >
          Previous Page
        </button>

        <button
          className="bg-indigo-900 p-3 rounded-lg text-white"
          onClick={handleNextPage}
          disabled={!canGoForward}
        >
          Next Page
        </button>
      </div>
    </div>
  )
}

export default JournalsPagination
