import React, { useEffect, useState } from 'react'
import CardProps from '../../types/CardProps'
import Card from '../Card/Card'
import axios from 'axios'

interface Props {
    itemsPerPage: number
}

const JournalsPagination: React.FC<Props> = ({ itemsPerPage }) => {
    const [journals, setJournals] = useState<CardProps[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [isSearch, setIsSearch] = useState<number>(0)
    const [totalJournal, setTotalJournal] = useState<number>(0)
    const [totalFetchedJournal, setTotalFetchedJournal] = useState<number>(0)

    useEffect(() => {
        fetchJournals()
    }, [currentPage])

    const fetchJournals = async () => {
        const response = await axios.get(
            `http://localhost:3001/api/v1/journal?page=${currentPage}&take=${itemsPerPage}`
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
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1)
    }

    const canGoBack = currentPage > 1
    const canGoForward = journals.length === itemsPerPage

    // search filter for date
    const [searchDate, setSearchDate] = useState<string>('')

    // function to handle search query
    const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    // filter the journals array based on the search query
    const filteredJournals = journals.filter((journal) => {
        // get the timestamp of the journal date
        const journalDate = new Date(journal.date)
        const userDate = new Date(searchDate)

        return (
            journalDate.getDate() === userDate.getDate() &&
            journalDate.getMonth() === userDate.getMonth() &&
            journalDate.getFullYear() === userDate.getFullYear()
        )
    })

    return (
        <div className="journals mt-3 flex flex-col gap-y-3">
            <div className="mb-5 w-1/5">
                <input
                    type="date"
                    className="border-2 border-gray-200 p-2 w-full"
                    placeholder="Search by date (YYYY-MM-DD)"
                    value={searchDate}
                    onChange={(event) => {
                        setSearchDate(event.target.value)
                        setIsSearch(true)
                    }}
                />
            </div>

            {isSearch ? (
                <>
                    {filteredJournals.map((journal) => (
                        <Card
                            title={journal.title}
                            date={journal.date}
                            body={journal.body}
                        />
                    ))}
                </>
            ) : (
                <>
                    {journals.map((journal) => (
                        <Card
                            title={journal.title}
                            date={journal.date}
                            body={journal.body}
                        />
                    ))}
                </>
            )}

            {!isSearch && (
                <label>
                    Showing {totalFetchedJournal} journals out of {totalJournal}{' '}
                    journals
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
