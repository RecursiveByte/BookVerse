interface SearchProps {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
  }
  
  const Search = ({ value, onChange, placeholder = "Search…" }: SearchProps) => {
    return (
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="hsl(150,10%,45%)" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-11 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all"
          style={{
            background: "hsl(160,15%,10%)",
            border: "1px solid hsl(160,15%,18%)",
            color: "hsl(150,20%,90%)",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = "hsl(142,70%,45%,0.5)")}
          onBlur={e => (e.currentTarget.style.borderColor = "hsl(160,15%,18%)")}
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2"
            style={{ color: "hsl(150,10%,45%)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  };
  
  export default Search;