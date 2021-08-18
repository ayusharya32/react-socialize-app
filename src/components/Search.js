import React, { useContext, useState, useEffect }  from 'react'
import User from './User'
import SearchContext from '../context/search/searchContext'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

function Search() {
    const searchContext = useContext(SearchContext)
    const { searchUsers, searchForUsers, searchLoading, searchError, clearSearchErrors } = searchContext

    const [searchInputValue, setSearchInputValue] = useState('')

    function onSearchFormSubmit(e) {
        e.preventDefault()

        if(searchInputValue.trim().length < 2) {
            toast.info("Search term should contain at least 2 characters")
            return
        }

        searchForUsers(searchInputValue)
        setSearchInputValue('')
    }

    const usersMarkup = (searchUsers.length !== 0) 
        ? searchUsers.map(user => <User key={user.userId} user={user} />)
        : <h3 style={{ textAlign: 'center'}}>No Users</h3>

    useEffect(() => {
        if(searchError !== null) {
            toast.error(searchError.message)
            clearSearchErrors()
        }

        // eslint-disable-next-line
    }, [searchError])

    return (
        <section className="search">
            <div className="container">
                <form className="search-form" onSubmit={onSearchFormSubmit}>
                    <input 
                        type="text" 
                        placeholder="Search.."
                        value={searchInputValue}
                        onChange={(e) => setSearchInputValue(e.target.value)}
                    />
                    <button disabled={searchLoading} type="submit"><i className="fas fa-search"></i></button>
                </form>
                <div className="results-container">
                    { searchLoading ? <Loader /> : usersMarkup }
                </div>
            </div>
        </section>
    )
}

export default Search
