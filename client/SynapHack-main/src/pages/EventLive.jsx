import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchEventById } from "../api/events";
import { fetchMessagesByEvent, sendMessage } from "../api/chat";
import { fetchAnnouncementsByEvent } from "../api/announcements";

export default function EventLive() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [ev, msgs, anns] = await Promise.all([
          fetchEventById(id),
          fetchMessagesByEvent(id),
          fetchAnnouncementsByEvent(id),
        ]);
        if (!mounted) return;
        setEvent(ev);
        setMessages(Array.isArray(msgs) ? msgs : []);
        setAnnouncements(Array.isArray(anns) ? anns : []);
      } catch (e) {
        setError(e?.message || "Failed to load event");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const timeline = useMemo(() => {
    // naive: build a simple timeline from dates
    const start = event?.start_date ? String(event.start_date).slice(0,10) : null;
    const end = event?.end_date ? String(event.end_date).slice(0,10) : null;
    return [
      { label: "Opening", date: start },
      { label: "Hacking", date: start },
      { label: "Midpoint", date: start },
      { label: "Demo Day", date: end },
    ];
  }, [event]);

  async function handleSend(e) {
    e.preventDefault();
    if (!message.trim()) return;
    const payload = { event_id: Number(id), message, user_id: 0 };
    try {
      const saved = await sendMessage(payload);
      setMessages((m) => [...m, saved]);
      setMessage("");
    } catch {}
  }

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><p className="text-[#636388] dark:text-[#b3b3c6]">Loading...</p></div>;
  if (error || !event) return <div className="flex items-center justify-center min-h-[60vh]"><p className="text-red-500">{error || 'Event not found'}</p></div>;

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white dark:bg-[#111118] group/design-root overflow-x-hidden" style={{ fontFamily: 'Space Grotesk, Noto Sans, sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-start justify-end px-4 pb-10 @[480px]:px-10" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("${event.banner_url || event.image_url || 'https://picsum.photos/1200/640?blur=2'}")` }}>
                  <div className="flex flex-col gap-2 text-left">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">{event.name || event.title || 'Event'}</h1>
                    <h2 className="text-white text-sm font-normal">{event.description || ''}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-3">
              <div className="flex border-b border-[#dcdce5] dark:border-[#2a2a30] px-4 gap-8">
                <button className={`flex flex-col items-center justify-center border-b-[3px] ${activeTab==='overview'?'border-b-[#111118] dark:border-b-white text-[#111118] dark:text-white':'border-b-transparent text-[#636388] dark:text-[#b3b3c6]'} pb-[13px] pt-4`} onClick={()=>setActiveTab('overview')}>
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">Overview</p>
                </button>
                <button className={`flex flex-col items-center justify-center border-b-[3px] ${activeTab==='timeline'?'border-b-[#111118] dark:border-b-white text-[#111118] dark:text-white':'border-b-transparent text-[#636388] dark:text-[#b3b3c6]'} pb-[13px] pt-4`} onClick={()=>setActiveTab('timeline')}>
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">Timeline</p>
                </button>
                <button className={`flex flex-col items-center justify-center border-b-[3px] ${activeTab==='announcements'?'border-b-[#111118] dark:border-b-white text-[#111118] dark:text-white':'border-b-transparent text-[#636388] dark:text-[#b3b3c6]'} pb-[13px] pt-4`} onClick={()=>setActiveTab('announcements')}>
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">Announcements</p>
                </button>
              </div>
            </div>
            {activeTab === 'overview' && (
              <>
                <h2 className="text-[#111118] dark:text-white text-[22px] font-bold tracking-[-0.015em] px-4 pb-3 pt-5">Overview</h2>
                <p className="text-[#111118] dark:text-white text-base px-4">{event.overview || event.description || ''}</p>
              </>
            )}
            {activeTab === 'timeline' && (
              <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
                {timeline.map((t, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center gap-1 pt-3">
                      <div className={`text-[#111118] dark:text-white ${i===1?'text-[#686aed]':''}`}> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path></svg>
                      </div>
                      <div className="w-[1.5px] bg-[#dcdce5] dark:bg-[#2a2a30] h-2 grow"></div>
                    </div>
                    <div className="flex flex-1 flex-col py-3">
                      <p className={`text-base font-medium ${i===1?'text-[#686aed]':'text-[#111118] dark:text-white'}`}>{t.label}</p>
                      <p className="text-[#636388] dark:text-[#b3b3c6] text-base">{t.date || ''}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
            {activeTab === 'announcements' && (
              <div className="px-4 py-3">
                {announcements.length === 0 && <p className="text-[#636388] dark:text-[#b3b3c6]">No announcements yet.</p>}
                <ul className="space-y-3">
                  {announcements.map((a, i) => (
                    <li key={i} className="border rounded-lg p-3 border-[#dcdce5] dark:border-[#2a2a30]">
                      <p className="text-[#111118] dark:text-white text-sm font-medium">{a.title || 'Announcement'}</p>
                      <p className="text-[#636388] dark:text-[#b3b3c6] text-sm">{a.message || a.content}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat button */}
      <button onClick={()=>setChatOpen(true)} className="fixed left-4 bottom-4 flex items-center justify-center size-12 rounded-full bg-[#686aed] text-white shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M239.6,91.12A88.1,88.1,0,0,0,152,16H104A88.1,88.1,0,0,0,16.4,91.12,87.43,87.43,0,0,0,32,136v48a16,16,0,0,0,16,16h64a88.1,88.1,0,0,0,87.6-74.88A87.43,87.43,0,0,0,239.6,91.12ZM200,152a72.08,72.08,0,0,1-72,72H48V136a15.87,15.87,0,0,0-3.2-9.6A72.08,72.08,0,0,1,104,32h48a72.08,72.08,0,0,1,72,72A71.52,71.52,0,0,1,200,152Z"></path></svg>
      </button>

      {/* Chat modal */}
      {chatOpen && (
        <div className="fixed left-4 bottom-20 w-80 max-w-[90vw] rounded-lg border border-[#dcdce5] dark:border-[#2a2a30] bg-white dark:bg-[#23232b] shadow-xl">
          <div className="flex items-center justify-between px-3 py-2 border-b border-[#dcdce5] dark:border-[#2a2a30]">
            <p className="text-[#111118] dark:text-white text-sm font-bold">Event Chat</p>
            <button onClick={()=>setChatOpen(false)} className="text-[#636388]">×</button>
          </div>
          <div className="h-64 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className="text-sm">
                <span className="font-semibold text-[#111118] dark:text-white">User {m.user_id || '-'}:</span>
                <span className="ml-2 text-[#111118] dark:text-white">{m.message}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="flex p-2 gap-2">
            <input value={message} onChange={(e)=>setMessage(e.target.value)} className="flex-1 form-input rounded border border-[#dcdce5] dark:border-[#2a2a30] px-2 py-1 bg-white dark:bg-[#111118] text-[#111118] dark:text-white" placeholder="Type a message" />
            <button className="px-3 py-1 rounded bg-[#686aed] text-white text-sm">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}


