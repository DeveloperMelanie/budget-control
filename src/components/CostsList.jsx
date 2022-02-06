import Cost from './Cost'

export default function CostsList({
    costs,
    setEditCost,
    deleteCost,
    filter,
    filteredCosts,
}) {
    return (
        <div className='listado-gastos contenedor'>
            {filter ? (
                <>
                    <h2>
                        {filteredCosts?.length
                            ? 'Gastos'
                            : 'No Hay Gastos en esta categoría'}
                    </h2>
                    {filteredCosts.map(cost => (
                        <Cost
                            key={cost.id}
                            cost={cost}
                            setEditCost={setEditCost}
                            deleteCost={deleteCost}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2>{costs?.length ? 'Gastos' : 'No Hay Gastos aún'}</h2>
                    {costs.map(cost => (
                        <Cost
                            key={cost.id}
                            cost={cost}
                            setEditCost={setEditCost}
                            deleteCost={deleteCost}
                        />
                    ))}
                </>
            )}
        </div>
    )
}
