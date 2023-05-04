import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../../components/Card/Card'
import AddModal from '../../components/Modal/AddModal'
import { CardProps } from '../../types/CardProps'

function Home() {
    const [journals, setJournals] = useState()
    const [isOpen, setIsOpen] = useState(false)

    const changeModalState = () => setIsOpen(!isOpen)
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/api/v1/journal')
        setJournals(response.data.data)
        console.log(response)
    }

    useEffect(() => {
        fetchData()
    }, [])

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
            <div className="journals mt-3">
                {journals?.map((journal: CardProps, index: number) => {
                    return (
                        <>
                            <Card
                                id={journal.id}
                                title={journal.title}
                                body={journal.body}
                                date={journal.date}
                            />
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Home
