import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useJournals } from '../../hooks/use-journals'
import Card from '../Card/Card'

const url = 'http://localhost:3001/api/v1'

const JournalsPagination = () => {
  const navigate = useNavigate()
  const [sParams] = useSearchParams()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isSearch, setIsSearch] = useState<number>(0)
  const [totalJournal] = useState<number>(0)
  const [totalFetchedJournal] = useState<number>(0)

  const itemsPerPage = Number.parseInt(sParams.get('items') ?? '5')
  const page = Number.parseInt(sParams.get('page') ?? '1')

  const { data: journals } = useJournals({
    itemCount: itemsPerPage,
    page,
  })

  const [searchDate, setSearchDate] = useState<string>('')

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
    navigate(`?page=${currentPage - 1}&items=${itemsPerPage}`)
  }

  const handleNextPage = () => {
    navigate(`?page=${page + 1}&items=${itemsPerPage}`)
  }

  const handleSearch = async () => {
    setSearchDate(event.target.value)
    setIsSearch(true)
  }

  const canGoBack = currentPage > 1
  const canGoForward = journals.length >= itemsPerPage

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
