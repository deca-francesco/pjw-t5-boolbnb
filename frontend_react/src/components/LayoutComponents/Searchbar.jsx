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
            <form onSubmit={handleSearchForm} className="d-flex align-items-center position-relative">
                {/* Input di ricerca */}
                <input
                    type="search"
                    className="form-control me-2 pe-5 fs-4"
                    name="searchText"
                    id="searchText"
                    aria-describedby="searchHelper"
                    placeholder="Cerca una città..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                {/* Icona di ricerca */}
                <button
                    type="submit"
                    className="btn btn position-absolute end-0 me-1 text-decoration-none"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                    <i className="bi bi-search"></i>
                </button>
            </form>
        </div>

    );
}
