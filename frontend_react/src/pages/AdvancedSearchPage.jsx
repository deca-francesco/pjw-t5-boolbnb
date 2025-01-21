import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ApartmentCard from '../components/ApartmentsComponents/ApartmentCard';
import Jumbotron from '../components/LayoutComponents/Jumbotron';

export default function AdvancedSearchPage() {
    const [apartments, setApartments] = useState([]);
    const [filteredApartments, setFilteredApartments] = useState([]);
    const [filters, setFilters] = useState({
        letti: '',
        bagni: '',
        metriQuadri: '',
        stanze: '',
    });

    const [searchParams, setSearchParams] = useSearchParams();
    const apiUrl = import.meta.env.VITE_EXPRESS_API_SERVER;

    useEffect(() => {
        const city = searchParams.get('city');
        if (city) {
            fetchApartments(city);
        }

        setFilters({
            letti: searchParams.get('letti') || '',
            bagni: searchParams.get('bagni') || '',
            metriQuadri: searchParams.get('metriQuadri') || '',
            stanze: searchParams.get('stanze') || '',
        });
    }, [searchParams]);

    function fetchApartments(city) {
        const url = `${apiUrl}/apartments?city=${city}`;
        fetch(url)
            .then((res) => res.json())
            .then(({ data }) => {
                setApartments(data || []);
                setFilteredApartments(data || []);
                applyFilters(data || []);
            })
            .catch((error) => console.error('Error fetching apartments:', error));
    }

    function applyFilters(apartmentsList = apartments) {
        let filtered = [...apartmentsList];

        if (filters.letti) {
            filtered = filtered.filter(apartment => apartment.beds >= Number(filters.letti));
        }
        if (filters.bagni) {
            filtered = filtered.filter(apartment => apartment.bathrooms >= Number(filters.bagni));
        }
        if (filters.metriQuadri) {
            filtered = filtered.filter(apartment => apartment.square_meters >= Number(filters.metriQuadri));
        }
        if (filters.stanze) {
            filtered = filtered.filter(apartment => apartment.rooms >= Number(filters.stanze));
        }

        setFilteredApartments(filtered);

        const newSearchParams = new URLSearchParams(searchParams);
        Object.keys(filters).forEach((key) => {
            if (filters[key]) {
                newSearchParams.set(key, filters[key]);
            } else {
                newSearchParams.delete(key);
            }
        });
        setSearchParams(newSearchParams);
    }

    return (
        <div className="advanced-search">
            <section className="d-flex justify-content-around">
                <div className="container">
                    <Jumbotron />
                </div>
            </section>

            <section className="d-flex justify-content-around">
                <div className="container">
                    <div className="advanced-search mb-4">
                        <h1>Ricerca Avanzata</h1>
                        <div className="filters row align-items-end my-4 fs-5">
                            {['letti', 'bagni', 'metriQuadri', 'stanze'].map((field, index) => (
                                <div key={index} className="col-md-3">
                                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder={`Numero minimo ${field}`}
                                        className="form-control"
                                        value={filters[field]}
                                        onChange={(e) => setFilters({ ...filters, [field]: e.target.value })}
                                    />
                                </div>
                            ))}
                            <div className="col-12 mt-3">
                                <button className="btn btn-dark my-4 fs-5" onClick={() => applyFilters()}>
                                    Applica Filtri
                                </button>
                                <p className="mt-2 fs-5">Appartamenti trovati: {filteredApartments.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 pb-5">
                        {filteredApartments.length > 0 ? (
                            filteredApartments.map((apartment) => (
                                <div key={apartment.id} className="col">
                                    <Link to={`/apartments/${apartment.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <ApartmentCard apartment={apartment} />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center fs-3 text-nowrap w-100">
                                <p>Nessun appartamento trovato con i filtri inseriti</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
