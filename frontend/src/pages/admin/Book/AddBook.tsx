import { useState, useRef } from "react";
import { showError, showSuccess } from "@/utils/toast";
import { uploadBooksCSV } from "@/services/admin.service";

interface AddBooksModalProps {
  onClose: () => void;
}

const AddBooksModal = ({ onClose }: AddBooksModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const pickFile = (f: File) => {
    if (!f.name.endsWith(".csv")) { showError("Only .csv files are accepted."); return; }
    setFile(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const res = await uploadBooksCSV(file);
      showSuccess(`${res.data.successCount} books added${res.data.failedCount > 0 ? `, ${res.data.failedCount} skipped` : ""}`);
      setFile(null);
      onClose();
    } catch (e: any) {
      showError(e?.response?.data?.message ?? "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-2xl flex flex-col"
        style={{
          background: "hsl(160, 15%, 8%)",
          border: "1px solid hsl(160, 15%, 18%)",
          boxShadow: "0 0 60px hsl(142,70%,45%,0.07), 0 24px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "hsl(160,15%,18%)" }}>
          <h2 className="font-bold text-sm" style={{ color: "hsl(150,20%,90%)" }}>Import Books via CSV</h2>
          <button onClick={onClose} style={{ color: "hsl(150,10%,50%)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-5 space-y-4">
          <p className="text-xs font-mono" style={{ color: "hsl(150,10%,45%)" }}>
            <span style={{ color: "hsl(142,70%,50%)" }}>Columns: </span>
            title, author, year, image_url
          </p>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) pickFile(f); }}
            className="rounded-xl flex flex-col items-center justify-center gap-2 py-8 transition-all duration-150"
            style={{
              border: `2px dashed ${dragOver ? "hsl(142,70%,45%)" : "hsl(160,15%,22%)"}`,
              background: dragOver ? "hsl(142,70%,45%,0.05)" : "transparent",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(142,70%,45%)" strokeWidth="1.8" strokeLinecap="round">
              <polyline points="16 16 12 12 8 16" />
              <line x1="12" y1="12" x2="12" y2="21" />
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
            </svg>
            <p className="text-sm" style={{ color: "hsl(150,20%,75%)" }}>Drag & drop your CSV here</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "hsl(160,15%,18%)" }} />
            <span className="text-xs" style={{ color: "hsl(150,10%,38%)" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "hsl(160,15%,18%)" }} />
          </div>

          <button
            onClick={() => inputRef.current?.click()}
            className="w-full py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{ border: "1px solid hsl(160,15%,22%)", color: "hsl(150,20%,80%)", background: "hsl(160,15%,11%)" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "hsl(142,70%,45%,0.4)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "hsl(160,15%,22%)")}
          >
            Choose from device
          </button>
          <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={(e) => e.target.files?.[0] && pickFile(e.target.files[0])} />

          {file && (
            <div className="flex items-center justify-between rounded-lg px-3 py-2" style={{ background: "hsl(142,70%,45%,0.07)", border: "1px solid hsl(142,70%,45%,0.2)" }}>
              <span className="text-xs truncate" style={{ color: "hsl(142,70%,55%)" }}>{file.name}</span>
              <button onClick={() => setFile(null)} className="ml-2 shrink-0" style={{ color: "hsl(150,10%,45%)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-2 px-5 pb-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{ border: "1px solid hsl(160,15%,18%)", color: "hsl(150,10%,55%)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "hsl(160,15%,12%)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            style={{ background: "hsl(142,70%,45%)", color: "hsl(160,20%,4%)" }}
            onMouseEnter={e => { if (file && !loading) (e.currentTarget as HTMLButtonElement).style.background = "hsl(142,70%,50%)"; }}
            onMouseLeave={e => (e.currentTarget.style.background = "hsl(142,70%,45%)")}
          >
            {loading
              ? <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg> Uploading…</>
              : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBooksModal;