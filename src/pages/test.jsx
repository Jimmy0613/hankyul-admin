import { useEffect, useState } from "react";
import { supabase } from "../api/supabase";

export default function Test() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");

  // SELECT
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("columns")
      .select("*")
      .order("id", { ascending: false });

    if (error) console.error(error);
    else setList(data);
  };

  // INSERT
  const addData = async () => {
    if (!title) return;

    const { error } = await supabase
      .from("columns")
      .insert([{ title }]);

    if (error) console.error(error);
    else {
      setTitle("");
      fetchData();
    }
  };

  // DELETE
  const deleteData = async (id) => {
    const { error } = await supabase
      .from("columns")
      .delete()
      .eq("id", id);

    if (error) console.error(error);
    else fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Supabase 테스트</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목 입력"
      />
      <button onClick={addData}>추가</button>

      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => deleteData(item.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}