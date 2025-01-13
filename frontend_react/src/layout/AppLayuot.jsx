import { Outlet } from "react-router-dom";

export default function AppLayout() {
    return (
        <>
            <header></header>

            <main>
                <Outlet />
            </main>

            <footer></footer>

        </>
    )

}