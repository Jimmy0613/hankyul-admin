import {BrowserRouter, Routes, Route} from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import CaseList from "./pages/CaseList";
import CaseWrite from "./pages/CaseWrite";
import CaseDetail from "./pages/CaseDetail.jsx";
import Login from "./pages/Login.jsx";
import {useEffect, useState} from "react";
import {supabase} from "./api/supabase.js";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({data}) => {
            setUser(data.session?.user ?? null);
        });

        const {data: listener} = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => listener.subscription.unsubscribe();
    }, []);

    if (!user) return <Login/>;

    return (
        <AdminLayout>
            <Routes>
                <Route path="/" element={<CaseList/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/write" element={<CaseWrite/>}/>
                <Route path="/detail/:id" element={<CaseDetail/>}/>
            </Routes>
        </AdminLayout>
    );
}

export default App;