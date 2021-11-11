import {Link} from 'react-router-dom';


const Debits = (props) => {
    let debitsView = () => {
        const { debits } = props;
        return debits.map((debit) =>
        {
            let date = debit.date.slice(0, 10);
            return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>            
        })
        
    }

    return(
        <div>
            <h1>Debits</h1>
            {debitsView()}
                 
            <form onSubmit={props.addDebit}>
            <div>Description: </div>
            <input
                name="description"
                label="Description"
           //     onChange={this.handleChange}
            />
            <div>Amount: </div>
            <input
                name="amount"
                label="Amount"

         //       onChange={this.handleChange}

            />
            <button type="submit">Submit</button>
        </form>
        <Link to="/">Return to Home</Link>
        </div>

        
    )
}

export default Debits;