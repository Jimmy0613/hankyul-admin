import {useNavigate} from "react-router-dom";
import {supabase} from "../api/supabase.js";

export default function Sidebar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await supabase.auth.signOut();
    };


    return (
        <aside className="sidebar">
            <h3 className="sidebar-title">홈페이지 관리</h3>
            <button className="btn-secondary" onClick={handleLogout}>
                로그아웃
            </button>
            <ul className="sidebar-menu">
                <li>
                    <a onClick={() => navigate("/")}>업무사례 관리</a>
                </li>
            </ul>
        </aside>
    );
}