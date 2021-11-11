import { Component } from 'react';
import axios from 'axios';

// API: https://pokeapi.co/

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            apiData: {
              id: -1,
              height: -1,
              weight: -1,
              abilities: [],
              name: ""
            },
            searchText: "",
            found: false
        }
    }

    handleInputChange = (event) => {
        this.setState({searchText: event.target.value});
    }

    handleSearchClick = async () => {
        let pokemonName = this.state.searchText;//ditto
        let linkToAPI = 'https://pokeapi.co/api/v2/pokemon/'+pokemonName;
                        //'https://pokeapi.co/api/v2/pokemon/ditto';

        try {
            let response = await axios.get(linkToAPI);
            //below will only execute if API response is sucessful
            //to get actual object from response you need to do
            //response.data
            this.setState({apiData: response.data, found: true});
        } catch (error) {
            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                console.log(error.response.data); //Not Found
                console.log(error.response.status); //404
                this.setState({found: false});
            }
       
        }
    }

    makeTable = () => {
        let currData = this.state.apiData;
        let table = [];
        table.push(
          <tr key={currData.id}>
            <td>Height: {currData.height}</td>
            <td>Weight: {currData.weight}</td>
          </tr>
        );
        return table;
    }
    
    makeList = () => {
        let abilities = this.state.apiData.abilities;
        let list = abilities.map( (item, index) => {
            return (
                <li key={index}>{item.ability.name}</li>
            );
        });
        return list;
    }

    render() {
        return (
          <div className="container">
            <div className="search">
              <h3>Search Pokemon:</h3>
              <input type="text" value={this.state.searchText} onChange={this.handleInputChange} placeholder="Enter Pokemon name"/>
              <button onClick={this.handleSearchClick}>Search</button>
            </div>
            { this.state.found 
            ? <div>
                <h1>{this.state.apiData.name}</h1>
                <table id="data">
                    <tbody>
                    {this.makeTable()}
                    </tbody>
                </table>
                <p>Abilities:</p>
                <ul>{this.makeList()}</ul>
                </div> 
            : <h4>No results</h4>
            }
          </div>
        );
    }
}

export default Search;

