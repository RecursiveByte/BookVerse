import { useState, useMemo, useRef, useEffect } from "react";
import { getAllUsers, deleteUser } from "@/services/admin.service";
import { showError, showSuccess } from "@/utils/toast";
import type { UserRes } from "@/types/user.type";

const ITEM_HEIGHT_DESKTOP = 64;
const ITEM_HEIGHT_MOBILE = 90;
const CONTAINER_HEIGHT = 600;
const OVERSCAN = 8;

const isMobile = () => window.innerWidth < 640;

const UserDetails = () => {
  const [users, setUsers] = useState<UserRes[]>([]);
  const [scrollTop, setScrollTop] = useState(0);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [mobile, setMobile] = useState(isMobile());
  const scrollRef = useRef<HTMLDivElement>(null);

  const ITEM_HEIGHT = mobile ? ITEM_HEIGHT_MOBILE : ITEM_HEIGHT_DESKTOP;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data.users);
      } catch {
        showError("Failed to fetch users");
      }
    };
    fetchUsers();

    const onResize = () => setMobile(isMobile());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return users;
    return users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [search, users]);

  const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);
  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN);
  const endIndex = Math.min(filtered.length, startIndex + visibleCount + OVERSCAN * 2);
  const visibleItems = filtered.slice(startIndex, endIndex);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setScrollTop(0);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const handleDelete = async (email: string) => {
    setDeletingId(email);
    try {
      await deleteUser(email);
      setUsers((prev) => prev.filter((u) => u.email !== email));
      showSuccess("User deleted successfully");
    } catch {
      showError("Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">

      <div className="flex items-center justify-between px-6 pt-6">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "hsl(150,20%,90%)" }}>Users</h2>
          <p className="text-sm" style={{ color: "hsl(150,10%,50%)" }}>
            {filtered.length.toLocaleString()} {search ? "results" : "total users"}
          </p>
        </div>
      </div>

      <div className="px-6 flex flex-col gap-4">

        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="hsl(150,10%,45%)" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{
              background: "hsl(160,15%,10%)",
              border: "1px solid hsl(160,15%,18%)",
              color: "hsl(150,20%,90%)",
            }}
            onFocus={e => (e.currentTarget.style.borderColor = "hsl(142,70%,45%,0.5)")}
            onBlur={e => (e.currentTarget.style.borderColor = "hsl(160,15%,18%)")}
          />
          {search && (
            <button
              onClick={() => { setSearch(""); setScrollTop(0); if (scrollRef.current) scrollRef.current.scrollTop = 0; }}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              style={{ color: "hsl(150,10%,45%)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid hsl(160,15%,18%)" }}>

          {!mobile && (
            <div
              className="grid px-4 py-3 text-xs font-semibold uppercase tracking-wider"
              style={{
                gridTemplateColumns: "2fr 2.5fr 0.8fr",
                background: "hsl(160,15%,6%)",
                color: "hsl(150,10%,45%)",
                borderBottom: "1px solid hsl(160,15%,18%)",
              }}
            >
              <span>Name</span>
              <span>Email</span>
              <span></span>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3" style={{ background: "hsl(160,15%,8%)" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(150,10%,35%)" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p className="text-sm" style={{ color: "hsl(150,10%,40%)" }}>No users found</p>
            </div>
          ) : (
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              style={{ height: CONTAINER_HEIGHT, overflowY: "auto", background: "hsl(160,15%,8%)" }}
            >
              <div style={{ height: filtered.length * ITEM_HEIGHT, position: "relative" }}>
                <div style={{ transform: `translateY(${startIndex * ITEM_HEIGHT}px)` }}>
                  {visibleItems.map((user) => (
                    <div
                      key={user.email}
                      className="transition-colors"
                      style={{
                        height: ITEM_HEIGHT,
                        borderBottom: "1px solid hsl(160,15%,13%)",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "hsl(160,15%,11%)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      {mobile ? (
                        <div className="flex items-center justify-between px-4 h-full gap-3">
                          <div className="flex flex-col gap-1 min-w-0">
                            <span className="text-sm font-medium truncate" style={{ color: "hsl(150,20%,88%)" }}>
                              {user.name}
                            </span>
                            <span className="text-xs truncate" style={{ color: "hsl(150,10%,55%)" }}>
                              {user.email}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDelete(user.email)}
                            disabled={deletingId === user.email}
                            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{
                              background: "hsl(6,78%,57%,0.1)",
                              color: "hsl(6,78%,65%)",
                              border: "1px solid hsl(6,78%,57%,0.2)",
                            }}
                            onMouseEnter={e => { if (deletingId !== user.email) (e.currentTarget.style.background = "hsl(6,78%,57%,0.2)"); }}
                            onMouseLeave={e => (e.currentTarget.style.background = "hsl(6,78%,57%,0.1)")}
                          >
                            {deletingId === user.email ? (
                              <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                              </svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                <path d="M10 11v6M14 11v6" />
                              </svg>
                            )}
                            Delete
                          </button>
                        </div>
                      ) : (
                        <div
                          className="grid px-4 items-center h-full"
                          style={{ gridTemplateColumns: "2fr 2.5fr 0.8fr" }}
                        >
                          <span className="text-sm font-medium truncate pr-2" style={{ color: "hsl(150,20%,88%)" }}>
                            {user.name}
                          </span>
                          <span className="text-xs truncate pr-2" style={{ color: "hsl(150,10%,55%)" }}>
                            {user.email}
                          </span>
                          <button
                            onClick={() => handleDelete(user.email)}
                            disabled={deletingId === user.email}
                            className="justify-self-end flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{
                              background: "hsl(6,78%,57%,0.1)",
                              color: "hsl(6,78%,65%)",
                              border: "1px solid hsl(6,78%,57%,0.2)",
                            }}
                            onMouseEnter={e => { if (deletingId !== user.email) (e.currentTarget.style.background = "hsl(6,78%,57%,0.2)"); }}
                            onMouseLeave={e => (e.currentTarget.style.background = "hsl(6,78%,57%,0.1)")}
                          >
                            {deletingId === user.email ? (
                              <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                              </svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                <path d="M10 11v6M14 11v6" />
                              </svg>
                            )}
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;