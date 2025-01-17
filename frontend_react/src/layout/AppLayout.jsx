import { Outlet } from "react-router-dom";
import Header from "../components/LayoutComponents/Header";
import Footer from "../components/LayoutComponents/Footer";

export default function AppLayout() {

    return (
        <>
            <Header />

            <main className="py-4 bg-light min-vh-100 m-0">
                <Outlet />
            </main>

            <Footer />

        </>
    )

}