import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ApartmentCard from '../components/ApartmentsComponents/ApartmentCard';
import Jumbotron from '../components/LayoutComponents/Jumbotron';

export default function AdvancedSearchPage() {
    // State to store all fetched apartments
    const [apartments, setApartments] = useState([]);
    // State to store apartments after applying filters
    const [filteredApartments, setFilteredApartments] = useState([]);
    // State to store filter values (beds, bathrooms, square meters, rooms)
    const [filters, setFilters] = useState({
        letti: '', // Beds
        bagni: '', // Bathrooms
        metriQuadri: '', // Square meters
        stanze: '', // Rooms
    });

    // Read query parameters from the URL (e.g., "city")
    const [searchParams] = useSearchParams();
    const apiUrl = import.meta.env.VITE_EXPRESS_API_SERVER; // API base URL from environment variables

    // Fetch apartments based on the "city" query parameter when the page loads or searchParams change
    useEffect(() => {
        const city = searchParams.get('city'); // Get the "city" query parameter
        if (city) {
            fetchApartments(city); // Fetch apartments for the given city
        }
    }, [searchParams]);

    // Fetch apartments from the API based on the city
    function fetchApartments(city) {
        const url = `${apiUrl}/apartments?city=${city}`;
        fetch(url)
            .then((res) => res.json())
            .then(({ data }) => {
                setApartments(data || []); // Store fetched apartments
                setFilteredApartments(data || []); // Initialize filtered apartments
            })
            .catch((error) => console.error('Error fetching apartments:', error));
    }

    // Apply filters to the fetched apartments
    function applyFilters() {
        let filtered = [...apartments];

        // Filter by minimum number of beds
        if (filters.letti) {
            filtered = filtered.filter(apartment => apartment.beds >= Number(filters.letti));
        }
        // Filter by minimum number of bathrooms
        if (filters.bagni) {
            filtered = filtered.filter(apartment => apartment.bathrooms >= Number(filters.bagni));
        }
        // Filter by minimum square meters
        if (filters.metriQuadri) {
            filtered = filtered.filter(apartment => apartment.square_meters >= Number(filters.metriQuadri));
        }
        // Filter by minimum number of rooms
        if (filters.stanze) {
            filtered = filtered.filter(apartment => apartment.rooms >= Number(filters.stanze));
        }

        setFilteredApartments(filtered); // Update the state with the filtered apartments
    }

    return (
        <div className="advanced-search">
            {/* Jumbotron Section */}
            <section className="d-flex justify-content-around">
                <div className="container">
                    <Jumbotron />
                </div>
            </section>

            {/* Filters and Results Section */}
            <section className="d-flex justify-content-around">
                <div className="container">
                    {/* Filters Section */}
                    <div className="advanced-search mb-4">
                        <h1>Ricerca Avanzata</h1>
                        <div className="filters row align-items-end">
                            {/* Filter by Beds */}
                            <div className="col-md-3">
                                <label>Beds:</label>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Minimum Beds"
                                    className="form-control"
                                    value={filters.letti}
                                    onChange={(e) => setFilters({ ...filters, letti: e.target.value })}
                                />
                            </div>
                            {/* Filter by Bathrooms */}
                            <div className="col-md-3">
                                <label>Bathrooms:</label>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Minimum Bathrooms"
                                    className="form-control"
                                    value={filters.bagni}
                                    onChange={(e) => setFilters({ ...filters, bagni: e.target.value })}
                                />
                            </div>
                            {/* Filter by Square Meters */}
                            <div className="col-md-3">
                                <label>Square Meters:</label>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Minimum Square Meters"
                                    className="form-control"
                                    value={filters.metriQuadri}
                                    onChange={(e) => setFilters({ ...filters, metriQuadri: e.target.value })}
                                />
                            </div>
                            {/* Filter by Rooms */}
                            <div className="col-md-3">
                                <label>Rooms:</label>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Minimum Rooms"
                                    className="form-control"
                                    value={filters.stanze}
                                    onChange={(e) => setFilters({ ...filters, stanze: e.target.value })}
                                />
                            </div>
                            {/* Apply Filters Button */}
                            <div className="col-12 mt-3">
                                <button className="btn btn-primary w-100" onClick={applyFilters}>
                                    Applica Filtri
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Apartments Grid */}
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 pb-5">
                        {filteredApartments.length > 0 ? (
                            // Display filtered apartments
                            filteredApartments.map((apartment) => (
                                <div key={apartment.id} className="col">
                                    <Link
                                        to={`/apartments/${apartment.id}`}
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <ApartmentCard apartment={apartment} setApartments={setApartments} />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            // Display message when no apartments match filters
                            <div className="col-12 text-center">
                                <p>No apartments found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
