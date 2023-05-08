import React from 'react'
import { JournalType } from '../../types/JournalType'

function Card({ id, title, date, body }: CardProps) {
  const newdate = new Date(date)
  const options = {
    timeZone: 'Asia/Kathmandu',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
  }
  const formattedDate = newdate.toLocaleString('en-US', options)
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-left">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 text-left">
        {body}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400 text-right">
        {formattedDate}
      </p>
    </div>
  )
}

export default Card
