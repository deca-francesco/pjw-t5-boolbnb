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
            <form onSubmit={handleSearchForm} className="d-flex align-items-center">

                <input
                    type="search"
                    className="form-control me-2"
                    name="searchText"
                    id="searchText"
                    aria-describedby="searchHelper"
                    placeholder="Cerca una città..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <button type="submit" className="btn btn-primarybtn btn-light text-dark text-decoration-none">
                    Cerca
                </button>
            </form>
        </div>
    );
}
