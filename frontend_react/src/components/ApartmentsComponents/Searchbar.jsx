import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function Searchbar() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    // Function to handle search form submission
    function handleSearchForm(e) {
        e.preventDefault();
        navigate(`/search?city=${encodeURIComponent(search)}`);
    }

    return (
        <div>
            {/* Search form */}
            <form onSubmit={handleSearchForm}>
                <div className="mb-3">
                    <input
                        type="search"
                        className="form-control"
                        name="searchText"
                        id="searchText"
                        aria-describedby="searchHelper"
                        placeholder="Search..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>
        </div>
    );
}
