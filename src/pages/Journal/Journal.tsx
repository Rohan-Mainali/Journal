import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../../components/Card/Card'
import { JournalType } from '../../types/JournalType'
import { useParams } from 'react-router-dom'

function Journal() {
  const [journal, setJournal] = useState<JournalType>()
  const { id } = useParams()

  const getJournal = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/journal/${id}`
      )
      setJournal(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getJournal()
  }, [])

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-bold ">Journal App</h1>
      </div>

      {journal && (
        <div className="py-6 bg-white w-4/5 ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-700 text-left">
            {journal.title}
          </h5>
          <p className="font-normal text-lg text-gray-700 dark:text-gray-400 text-left">
            {journal.body}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-right">
            {journal.date}
          </p>
        </div>
      )}
    </>
  )
}

export default Journal
