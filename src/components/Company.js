export const Company = (props) => {
    const { company } = props
    return (
        <div>
            <div>{company.companyName}</div>
            <div>{company.symbol}</div>
            <div>{company.latestPrice}</div>
        </div>
    )
}