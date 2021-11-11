const Credits = (props) => {
    let creditsView = () => {
        const { credits } = props;
        return credits.map((credit) =>
        {
            let date = credit.date.slice(0, 10);
            return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
        })
    }
    return(
        <div>
            <h1>Credits</h1>
            {creditsView()}
                <br/>
            <form onSubmit={props.addCredit}>
                <div>Description: </div>
                <input
                    name="description"
                    label="Description"
                />
                <div>Amount: </div>
                <input
                    name="amount"
                    label="Amount"
                />
                <button type="submit">Submit</button>
            </form>
        </div>

        
    )
}

export default Credits;