import { useEffect, useState } from "react";
import { supabase } from "../api/supabase";
import { useNavigate } from "react-router-dom";

export default function CaseList() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("columns")
        .select("*")
        .order("created_at", { ascending: false });

      setList(data || []);
    };

    fetchData();
  }, []);

  return (
    <div className="table-wrap">
      <div className="table-header">
        <h2>업무사례 목록</h2>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>순번</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성일</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item, index) => (
            <tr
              key={item.id}
              onClick={() => navigate(`/detail/${item.id}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{(item.content || "").replace(/<[^>]*>/g, "").slice(0, 10)}</td>
              <td>
                {item.created_at
                  ? new Date(item.created_at).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 등록 버튼 (표 기준 우측 하단) */}
      <button className="table-fab" onClick={() => navigate("/write")}>
        등록
      </button>
    </div>
  );
}