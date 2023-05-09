import axios from 'axios'
import { useEffect, useState } from 'react'

const BASE_URL = 'http://localhost:3001/api/v1'

export const useJournals = ({ page = 1, itemCount = 10 }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${BASE_URL}/journal?page=${page}&take=${itemCount}`)
      .then((res) => {
        setData(res.data.data)
      })
      .finally(() => {
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
      })
  }, [page, itemCount])

  return {
    error,
    loading,
    data,
  }
}
