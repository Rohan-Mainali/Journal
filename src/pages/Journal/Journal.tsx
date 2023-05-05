import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../../components/Card/Card'
import { useParams } from 'react-router-dom'

function Journal() {
  const [journal, setJournal] = useState()
  const { id } = useParams()

  const getJournal = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/journal/${id}`
      )
      console.log(response)
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

        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-left"></h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-left"></p>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-right"></p>
        </div>
      </div>
    </>
  )
}

export default Journal
