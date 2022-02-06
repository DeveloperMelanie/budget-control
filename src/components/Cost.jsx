import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatAmount, formatDate } from '../helpers'

import SavingsIcon from '../img/icono_ahorro.svg'
import HouseIcon from '../img/icono_casa.svg'
import FoodIcon from '../img/icono_comida.svg'
import CostsIcon from '../img/icono_gastos.svg'
import LeisureIcon from '../img/icono_ocio.svg'
import HealthyIcon from '../img/icono_salud.svg'
import SuscriptionsIcon from '../img/icono_suscripciones.svg'

const iconsDictionary = {
    ahorro: SavingsIcon,
    casa: HouseIcon,
    comida: FoodIcon,
    gastos: CostsIcon,
    ocio: LeisureIcon,
    salud: HealthyIcon,
    suscripciones: SuscriptionsIcon,
}

export default function Cost({ cost, setEditCost, deleteCost }) {
    const { name, amount, category, id, date } = cost

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setEditCost(cost)}>Editar</SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => deleteCost(id)} destructive>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className='gasto sombra'>
                    <div className='contenido-gasto'>
                        <img
                            src={iconsDictionary[category]}
                            alt='Icono Gasto'
                        />
                        <div className='descripcion-gasto'>
                            <p className='categoria'>{category}</p>
                            <p className='nombre-gasto'>{name}</p>
                            <p className='fecha-gasto'>
                                Agregado el: <span>{formatDate(date)}</span>
                            </p>
                        </div>
                    </div>
                    <p className='cantidad-gasto'>{formatAmount(amount)}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
