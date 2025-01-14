import { Outlet } from "react-router-dom";
import Header from "../components/LayoutComponents/Header";
import Footer from "../components/LayoutComponents/Footer";

export default function AppLayout() {

    return (
        <>
            <Header />

            <main>
                <Outlet />
            </main>

            <Footer />

        </>
    )

}