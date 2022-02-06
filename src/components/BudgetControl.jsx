import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import Swal from 'sweetalert2/dist/sweetalert2'
import { formatAmount } from '../helpers'

import 'react-circular-progressbar/dist/styles.css'
import 'sweetalert2/src/sweetalert2.scss'

export default function BudgetControl({
    costs,
    setCosts,
    budget,
    setBudget,
    setIsValidBudget,
}) {
    const [progress, setProgress] = useState(0)
    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)

    useEffect(() => {
        const totalSpent = costs.reduce((acc, cost) => acc + cost.amount, 0)
        const totalAvailable = budget - totalSpent

        // Calculate progress
        const progress = Math.round((totalSpent / budget) * 100)

        setAvailable(totalAvailable)
        setSpent(totalSpent)
        setTimeout(() => {
            setProgress(progress)
        }, 300)
    }, [costs])

    const handleResetApp = () => {
        Swal.fire({
            title: '¿Deseas reiniciar presupuesto y gastos?',
            icon: 'question',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            showCancelButton: true,
        }).then(result => {
            if (result.isConfirmed) {
                setBudget(0)
                setCosts([])
                setIsValidBudget(false)
            }
        })
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: progress > 100 ? '#DC2626' : '#10B981',
                        trailColor: '#F5F5F5',
                        textColor: progress > 100 ? '#DC2626' : '#10B981',
                    })}
                    value={progress}
                    text={`${progress}% gastado`}
                />
            </div>

            <div className='contenido-presupuesto'>
                <button
                    className='reset-app mb-2'
                    type='button'
                    onClick={handleResetApp}
                >
                    Eliminar Presupuesto
                </button>
                <p>
                    <span>Presupuesto:</span> {formatAmount(budget)}
                </p>
                <p className={`${available < 0 ? 'negativo' : ''}`}>
                    <span>Disponible:</span> {formatAmount(available)}
                </p>
                <p>
                    <span>Gastado:</span> {formatAmount(spent)}
                </p>
            </div>
        </div>
    )
}
