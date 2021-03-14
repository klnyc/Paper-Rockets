export const Company = (props) => {
    const { company, user, setUser } = props

    const addToWatchlist = () => {
        window.firebase.firestore().collection("users").doc(user.userID)
        .update({ watchlist: window.firebase.firestore.FieldValue.arrayUnion(company.symbol) })
        .then(() => {
            window.firebase.firestore().collection("users").doc(user.userID).get()
            .then((userData) => setUser(userData.data()))
        })
    }

    const removeFromWatchlist = () => {
        window.firebase.firestore().collection("users").doc(user.userID)
        .update({ watchlist: window.firebase.firestore.FieldValue.arrayRemove(company.symbol) })
        .then(() => {
            window.firebase.firestore().collection("users").doc(user.userID).get()
            .then((userData) => setUser(userData.data()))
        })
    }

    return (
        <div>
            <h4 className="p-4">{company.companyName}</h4>
            <h5 className="px-4">${company.latestPrice.toFixed(2)}</h5>

            {user.watchlist.includes(company.symbol)
            ? <button className="btn btn-outline-info btn-sm m-4" onClick={() => removeFromWatchlist()}>Remove from Watchlist</button>
            : <button className="btn btn-outline-info btn-sm m-4" onClick={() => addToWatchlist()}>Add to Watchlist</button>}
        </div>
    )
}