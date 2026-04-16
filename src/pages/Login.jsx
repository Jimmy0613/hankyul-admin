import { useState } from "react";
import { supabase } from "../api/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("로그인 실패");
      return;
    }

    alert("로그인 성공");
    navigate("/");
  };

  return (
    <div className="write-container">
      <h2>관리자 로그인</h2>

      <input
        className="input"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn-primary" onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
}