export default function Message({ type, children }) {
    return <div className={`alerta ${type}`}>{children}</div>
}
