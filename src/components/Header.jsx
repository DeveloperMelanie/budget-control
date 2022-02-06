import BudgetControl from './BudgetControl'
import NewBuget from './NewBuget'

export default function Header({
    costs,
    budget,
    setBudget,
    isValidBudget,
    setIsValidBudget,
    setCosts,
}) {
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {isValidBudget ? (
                <BudgetControl
                    budget={budget}
                    setBudget={setBudget}
                    costs={costs}
                    setCosts={setCosts}
                    setIsValidBudget={setIsValidBudget}
                />
            ) : (
                <NewBuget
                    budget={budget}
                    setBudget={setBudget}
                    setIsValidBudget={setIsValidBudget}
                />
            )}
        </header>
    )
}
