export const Company = (props) => {
    const { company, user } = props

    return (
        <div>
            <h4 className="p-4">{company.companyName}</h4>
            <h5 className="px-4">${company.latestPrice}</h5>

            {!user.watchlist.includes(company.symbol) && 
            <button type="button" className="btn btn-outline-info btn-sm m-4">Add to Watchlist</button>}
        </div>
    )
}