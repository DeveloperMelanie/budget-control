import { useEffect, useState } from 'react'
import CostsList from './components/CostsList'
import Filters from './components/Filters'
import Header from './components/Header'
import Modal from './components/Modal'
import { generateId } from './helpers'

import NewCostIcon from './img/nuevo-gasto.svg'

export default function App() {
    const [costs, setCosts] = useState(
        JSON.parse(localStorage.getItem('costs')) ?? []
    )

    const [budget, setBudget] = useState(
        Number(localStorage.getItem('budget')) ?? 0
    )
    const [isValidBudget, setIsValidBudget] = useState(false)

    const [modal, setModal] = useState(false)
    const [animateModal, setAnimateModal] = useState(false)

    const [editCost, setEditCost] = useState({})

    const [filter, setFilter] = useState('')
    const [filteredCosts, setFilteredCosts] = useState([])

    useEffect(() => {
        if (Object.keys(editCost).length) {
            setModal(true)

            setTimeout(() => {
                setAnimateModal(true)
            }, 1)
        }
    }, [editCost])

    useEffect(() => {
        localStorage.setItem('budget', budget ?? 0)
    }, [budget])

    useEffect(() => {
        localStorage.setItem('costs', JSON.stringify(costs))
    }, [costs])

    useEffect(() => {
        if (filter) {
            const filteredCosts = costs.filter(cost => cost.category === filter)
            setFilteredCosts(filteredCosts)
        }
    }, [filter])

    useEffect(() => {
        const budgetLS = Number(localStorage.getItem('budget')) ?? 0

        if (budgetLS > 0) {
            setIsValidBudget(true)
        }
    }, [])

    const handleNewCost = () => {
        setModal(true)
        setEditCost({})

        setTimeout(() => {
            setAnimateModal(true)
        }, 1)
    }

    const saveCost = cost => {
        if (cost.id) {
            // Update
            const newCosts = costs.map(c => (c.id === cost.id ? cost : c))
            setCosts(newCosts)
            setEditCost({})
        } else {
            // Create
            cost.id = generateId()
            cost.date = Date.now()
            setCosts([...costs, cost])
        }

        setAnimateModal(false)
        setTimeout(() => {
            setModal(false)
        }, 300)
    }

    const deleteCost = id => {
        const updatedCosts = costs.filter(cost => cost.id !== id)
        setCosts(updatedCosts)
    }

    return (
        <div className={modal ? 'fijar' : ''}>
            <Header
                costs={costs}
                setCosts={setCosts}
                budget={budget}
                setBudget={setBudget}
                isValidBudget={isValidBudget}
                setIsValidBudget={setIsValidBudget}
            />

            {isValidBudget && (
                <>
                    <main>
                        <Filters filter={filter} setFilter={setFilter} />
                        <CostsList
                            costs={costs}
                            setEditCost={setEditCost}
                            deleteCost={deleteCost}
                            filter={filter}
                            filteredCosts={filteredCosts}
                        />
                    </main>
                    <div className='nuevo-gasto'>
                        <img
                            src={NewCostIcon}
                            alt='Nuevo gasto'
                            onClick={handleNewCost}
                        />
                    </div>
                </>
            )}

            {modal && (
                <Modal
                    setModal={setModal}
                    animateModal={animateModal}
                    setAnimateModal={setAnimateModal}
                    saveCost={saveCost}
                    editCost={editCost}
                    setEditCost={setEditCost}
                />
            )}
        </div>
    )
}
