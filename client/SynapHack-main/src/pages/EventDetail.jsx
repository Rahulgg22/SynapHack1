import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchEventById } from "../api/events";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [countdownTarget, setCountdownTarget] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchEventById(id);
        if (mounted) setEvent(data);
        // If registered locally, redirect to live page
        try {
          if (localStorage.getItem(`registered_event_${id}`) === "1") {
            navigate(`/events/${id}/live`, { replace: true });
            return;
          }
        } catch {}
      } catch (e) {
        setError(e?.message || "Failed to load event");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  // Choose countdown target: before start -> start_date, during -> end_date, else none
  useEffect(() => {
    if (!event) return;
    const now = new Date();
    const start = event.start_date ? new Date(event.start_date) : null;
    const end = event.end_date ? new Date(event.end_date) : null;
    let target = null;
    if (start && now < start) target = start;
    else if (end && start && now >= start && now < end) target = end;
    setCountdownTarget(target);

    if (!target) return;
    const tick = () => {
      const current = new Date();
      const diffMs = Math.max(0, target.getTime() - current.getTime());
      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setTimeLeft({ days, hours, minutes, seconds });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [event]);

  const timeline = useMemo(() => {
    if (!event) return [];
    const start = event.start_date ? new Date(event.start_date) : null;
    const end = event.end_date ? new Date(event.end_date) : null;
    const midpoint = start && end ? new Date((start.getTime() + end.getTime()) / 2) : null;
    const fmt = (d) => d ? new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(d) : "TBA";
    return [
      { icon: "calendar", label: "Opening Ceremony & Team Formation", date: fmt(start) },
      { icon: "clock", label: "Hacking Begins", date: fmt(start) },
      { icon: "clock", label: "Midpoint Check-in", date: fmt(midpoint) },
      { icon: "trophy", label: "Demo Day & Awards", date: fmt(end) },
    ];
  }, [event]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><p className="text-[#636388] dark:text-[#b3b3c6]">Loading event...</p></div>;
  }
  if (error || !event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-[#111118] dark:text-white">Event Not Found</h1>
        <p className="text-[#636388] dark:text-[#b3b3c6] mt-2">{error || "This event is not available."}</p>
      </div>
    );
  }
  const formatUnit = (n) => String(n ?? 0).padStart(2, '0');
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white dark:bg-[#111118] group/design-root overflow-x-hidden" style={{ fontFamily: 'Space Grotesk, Noto Sans, sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-start justify-end px-4 pb-10 @[480px]:px-10"
                  style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("${event.banner_url || event.image_url || 'https://picsum.photos/1200/640?blur=2'}")` }}
                >
                  <div className="flex flex-col gap-2 text-left">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">{event.name || event.title || 'Event'}</h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      {event.description || 'Join us for a weekend of coding, collaboration, and innovation.'}
                    </h2>
                  </div>
                  <Link
                    to={`/register?eventId=${event.event_id || event.id}`}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#686aed] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] mt-4"
                  >
                    <span className="truncate">Register</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="pb-3">
              <div className="flex border-b border-[#dcdce5] dark:border-[#2a2a30] px-4 gap-8">
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-[#111118] dark:border-b-white text-[#111118] dark:text-white pb-[13px] pt-4" href="#">
                  <p className="text-[#111118] dark:text-white text-sm font-bold leading-normal tracking-[0.015em]">Overview</p>
                </a>
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#636388] dark:text-[#b3b3c6] pb-[13px] pt-4" href="#">
                  <p className="text-[#636388] dark:text-[#b3b3c6] text-sm font-bold leading-normal tracking-[0.015em]">Timeline</p>
                </a>
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#636388] dark:text-[#b3b3c6] pb-[13px] pt-4" href="#">
                  <p className="text-[#636388] dark:text-[#b3b3c6] text-sm font-bold leading-normal tracking-[0.015em]">Rules & Guidelines</p>
                </a>
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#636388] dark:text-[#b3b3c6] pb-[13px] pt-4" href="#">
                  <p className="text-[#636388] dark:text-[#b3b3c6] text-sm font-bold leading-normal tracking-[0.015em]">Prizes</p>
                </a>
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#636388] dark:text-[#b3b3c6] pb-[13px] pt-4" href="#">
                  <p className="text-[#636388] dark:text-[#b3b3c6] text-sm font-bold leading-normal tracking-[0.015em]">Sponsors</p>
                </a>
              </div>
            </div>
            <h2 className="text-[#111118] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Overview</h2>
            <p className="text-[#111118] dark:text-white text-base font-normal leading-normal pb-3 pt-1 px-4">{event.overview || event.description || ''}</p>
            <h2 className="text-[#111118] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Timeline</h2>
            <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
              {timeline.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className={`flex flex-col items-center gap-1 ${idx === 0 ? 'pt-3' : ''} ${idx === timeline.length - 1 ? 'pb-3' : ''}`}>
                    <div className="text-[#111118] dark:text-white" data-size="24px" data-weight="regular">
                      {item.icon === 'calendar' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path></svg>
                      )}
                      {item.icon === 'clock' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path></svg>
                      )}
                      {item.icon === 'trophy' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M232,64H208V56a16,16,0,0,0-16-16H64A16,16,0,0,0,48,56v8H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-28.49,64.64-63.51,64.9H128a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"></path></svg>
                      )}
                </div>
                    <div className={`w-[1.5px] bg-[#dcdce5] dark:bg-[#2a2a30] h-2 ${idx === timeline.length - 1 ? '' : 'grow'}`}></div>
              </div>
              <div className="flex flex-1 flex-col py-3">
                    <p className="text-[#111118] dark:text-white text-base font-medium leading-normal">{item.label}</p>
                    <p className="text-[#636388] dark:text-[#b3b3c6] text-base font-normal leading-normal">{item.date}</p>
              </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="layout-content-container flex flex-col w-[360px]">
            <div className="flex px-4 py-3">
              <Link
                to={`/register?eventId=${event.event_id || event.id}`}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-[#686aed] text-white text-base font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Register Now</span>
              </Link>
            </div>
            <div className="flex gap-4 py-6 px-4">
              <div className="flex grow basis-0 flex-col items-stretch gap-4">
                <div className="flex h-14 grow items-center justify-center rounded-lg px-3 bg-[#f0f0f4] dark:bg-[#23232b]">
                  <p className="text-[#111118] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">{countdownTarget ? formatUnit(timeLeft.days) : '--'}</p>
                </div>
                <div className="flex items-center justify-center"><p className="text-[#111118] dark:text-white text-sm font-normal leading-normal">Days</p></div>
              </div>
              <div className="flex grow basis-0 flex-col items-stretch gap-4">
                <div className="flex h-14 grow items-center justify-center rounded-lg px-3 bg-[#f0f0f4] dark:bg-[#23232b]">
                  <p className="text-[#111118] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">{countdownTarget ? formatUnit(timeLeft.hours) : '--'}</p>
                </div>
                <div className="flex items-center justify-center"><p className="text-[#111118] dark:text-white text-sm font-normal leading-normal">Hours</p></div>
              </div>
              <div className="flex grow basis-0 flex-col items-stretch gap-4">
                <div className="flex h-14 grow items-center justify-center rounded-lg px-3 bg-[#f0f0f4] dark:bg-[#23232b]">
                  <p className="text-[#111118] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">{countdownTarget ? formatUnit(timeLeft.minutes) : '--'}</p>
                </div>
                <div className="flex items-center justify-center"><p className="text-[#111118] dark:text-white text-sm font-normal leading-normal">Minutes</p></div>
              </div>
              <div className="flex grow basis-0 flex-col items-stretch gap-4">
                <div className="flex h-14 grow items-center justify-center rounded-lg px-3 bg-[#f0f0f4] dark:bg-[#23232b]">
                  <p className="text-[#111118] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">{countdownTarget ? formatUnit(timeLeft.seconds) : '--'}</p>
                </div>
                <div className="flex items-center justify-center"><p className="text-[#111118] dark:text-white text-sm font-normal leading-normal">Seconds</p></div>
              </div>
            </div>
            <div className="@container">
              <div className="gap-2 px-4 grid-cols-[repeat(auto-fit, minmax(80px,_1fr))] grid">
                <div className="flex flex-col items-center gap-2 bg-white dark:bg-[#23232b] py-2.5 text-center">
                  <div className="rounded-full bg-[#f0f0f4] dark:bg-[#23232b] p-2.5">
                    <div className="text-[#111118] dark:text-white" data-icon="Share" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H165a88,88,0,0,0-85.23,66,8,8,0,0,1-15.5-4A103.94,103.94,0,0,1,165,96h39.71L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66ZM192,208H40V88a8,8,0,0,0-16,0V208a16,16,0,0,0,16,16H192a8,8,0,0,0,0-16Z"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-[#111118] dark:text-white text-sm font-medium leading-normal">Share</p>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white dark:bg-[#23232b] py-2.5 text-center">
                  <div className="rounded-full bg-[#f0f0f4] dark:bg-[#23232b] p-2.5">
                    <div className="text-[#111118] dark:text-white" data-icon="BookmarkSimple" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-[#111118] dark:text-white text-sm font-medium leading-normal">Bookmark</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
