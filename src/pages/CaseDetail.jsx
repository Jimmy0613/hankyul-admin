import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../api/supabase";

export default function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("columns")
        .select("*")
        .eq("id", id)
        .single();

      setData(data);
    };

    fetchData();
  }, [id]);

  if (!data) return <div>로딩중...</div>;

  return (
    <div className="write-container">
      <button className="btn-secondary back-btn" onClick={() => navigate("/")}>
        목록
      </button>

      <h2>{data.title}</h2>

      <div
        className="card"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
}