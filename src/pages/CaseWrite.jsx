import Editor from "../components/Editor";
import { useState } from "react";
import { supabase } from "../api/supabase";

export default function CaseWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleSave = async () => {
    const { error } = await supabase.from("columns").insert([
      { title, content },
    ]);

    if (error) {
      alert("저장 실패");
      return;
    }

    alert("저장 완료");
  };

  return (
    <div className="write-container">
      <h2 className="page-title">업무사례 등록</h2>

      <input
        className="input"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="editor-card">
        <Editor content={content} onChange={setContent} />
      </div>

      {/* 버튼 영역 */}
      <div className="action-bar">
        <button
          className="btn-secondary small-btn"
          onClick={() => setPreviewOpen(true)}
        >
          미리보기
        </button>

        <button className="btn-primary small-btn" onClick={handleSave}>
          저장
        </button>
      </div>

      {/* 미리보기 모달 */}
      {previewOpen && (
        <div className="modal-backdrop" onClick={() => setPreviewOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>미리보기</h3>

            <div
              className="preview-box"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <button
              className="btn-secondary"
              onClick={() => setPreviewOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}