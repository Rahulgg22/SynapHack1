
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEvents } from "../api/events";


export default function EventListing() {
		const [events, setEvents] = useState([]);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState("");

		useEffect(() => {
			let mounted = true;
			(async () => {
				try {
					const data = await fetchEvents();
					if (mounted) setEvents(Array.isArray(data) ? data : []);
				} catch (e) {
					setError(e?.message || "Failed to load events");
				} finally {
					if (mounted) setLoading(false);
				}
			})();
			return () => { mounted = false; };
		}, []);
       return (
	       <div className="relative flex size-full min-h-screen flex-col bg-white dark:bg-[#111118] group/design-root overflow-x-hidden transition-colors duration-300" style={{ fontFamily: 'Space Grotesk, Noto Sans, sans-serif' }}>
		       <div className="layout-container flex h-full grow flex-col">
				{/* Main Content */}
				<div className="gap-1 px-6 flex flex-1 justify-center py-5">
					{/* Sidebar Filters */}
			       <div className="layout-content-container flex flex-col w-80">
				       <div className="flex flex-wrap justify-between gap-3 p-4"><p className="text-[#111118] dark:text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Explore Hackathons</p></div>
				       <h3 className="text-[#111118] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Filters</h3>
						{/* Category Filter */}
						<div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
							<label className="flex flex-col min-w-40 flex-1">
									   <p className="text-[#111118] dark:text-white text-base font-medium leading-normal pb-2">Category</p>
									   <select className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] dark:text-white focus:outline-0 focus:ring-0 border border-[#dcdce5] dark:border-[#2a2a30] bg-white dark:bg-[#23232b] focus:border-[#dcdce5] dark:focus:border-[#2a2a30] h-14 bg-[image:--select-button-svg] placeholder:text-[#636388] dark:placeholder:text-[#b3b3c6] p-[15px] text-base font-normal leading-normal">
										<option value="one">All Categories</option>
										<option value="two">two</option>
										<option value="three">three</option>
									</select>
							</label>
						</div>
						{/* Date Filter */}
						<div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
							<label className="flex flex-col min-w-40 flex-1">
									   <p className="text-[#111118] dark:text-white text-base font-medium leading-normal pb-2">Date</p>
									   <select className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] dark:text-white focus:outline-0 focus:ring-0 border border-[#dcdce5] dark:border-[#2a2a30] bg-white dark:bg-[#23232b] focus:border-[#dcdce5] dark:focus:border-[#2a2a30] h-14 bg-[image:--select-button-svg] placeholder:text-[#636388] dark:placeholder:text-[#b3b3c6] p-[15px] text-base font-normal leading-normal">
										<option value="one">Any Date</option>
										<option value="two">two</option>
										<option value="three">three</option>
									</select>
							</label>
						</div>
						{/* Location Filter */}
						<div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
							<label className="flex flex-col min-w-40 flex-1">
									   <p className="text-[#111118] dark:text-white text-base font-medium leading-normal pb-2">Location</p>
									   <select className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] dark:text-white focus:outline-0 focus:ring-0 border border-[#dcdce5] dark:border-[#2a2a30] bg-white dark:bg-[#23232b] focus:border-[#dcdce5] dark:focus:border-[#2a2a30] h-14 bg-[image:--select-button-svg] placeholder:text-[#636388] dark:placeholder:text-[#b3b3c6] p-[15px] text-base font-normal leading-normal">
										<option value="one">Anywhere</option>
										<option value="two">two</option>
										<option value="three">three</option>
									</select>
							</label>
						</div>
						{/* Prize Filter */}
						<div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
							<label className="flex flex-col min-w-40 flex-1">
									   <p className="text-[#111118] dark:text-white text-base font-medium leading-normal pb-2">Prize</p>
									   <select className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] dark:text-white focus:outline-0 focus:ring-0 border border-[#dcdce5] dark:border-[#2a2a30] bg-white dark:bg-[#23232b] focus:border-[#dcdce5] dark:focus:border-[#2a2a30] h-14 bg-[image:--select-button-svg] placeholder:text-[#636388] dark:placeholder:text-[#b3b3c6] p-[15px] text-base font-normal leading-normal">
										<option value="one">Any Prize</option>
										<option value="two">two</option>
										<option value="three">three</option>
									</select>
							</label>
						</div>
					</div>
					{/* Main Event Listing */}
							   <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
						{/* Search Bar */}
				       <div className="px-4 py-3">
				       	<label className="flex flex-col min-w-40 h-12 w-full">
				       		<div className="flex w-full flex-1 items-stretch rounded-lg h-full">
				       			<div className="text-[#636388] dark:text-[#b3b3c6] flex border-none bg-[#f0f0f4] dark:bg-[#23232b] items-center justify-center pl-4 rounded-l-lg border-r-0" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
										<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
											<path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
										</svg>
									</div>
								   <input placeholder="Search for hackathons" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f0f0f4] dark:bg-[#23232b] focus:border-none h-full placeholder:text-[#636388] dark:placeholder:text-[#b3b3c6] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" />
								</div>
							</label>
						</div>
								{/* Event Cards Grid */}
							   <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
							   {loading && <p className="text-[#636388] dark:text-[#b3b3c6]">Loading events...</p>}
							   {error && <p className="text-red-500">{error}</p>}
							   {!loading && !error && events.length === 0 && (
							   <p className="text-[#636388] dark:text-[#b3b3c6]">No events found.</p>
							   )}
							   {events.map((evt) => (
							   <Link key={evt.event_id || evt.id} to={`/events/${evt.event_id || evt.id}`} className="flex flex-col gap-3 pb-3 cursor-pointer hover:scale-[1.03] transition-transform">
							   <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg" style={{backgroundImage: `url(${evt.banner_url || evt.image_url || 'https://picsum.photos/640/640?blur=2'})`}}></div>
							   <div>
							   <p className="text-[#111118] dark:text-white text-base font-medium leading-normal">{evt.name || evt.title || 'Untitled Event'}</p>
							   <p className="text-[#636388] dark:text-[#b3b3c6] text-sm font-normal leading-normal">{evt.start_date ? String(evt.start_date).slice(0,10) : ''}</p>
							   </div>
							   </Link>
							   ))}
							   </div>
							{/* Pagination */}
				       <div className="flex items-center justify-center p-4">
					       <a href="#" className="flex size-10 items-center justify-center">
					       	<div className="text-[#111118] dark:text-white" data-icon="CaretLeft" data-size="18px" data-weight="regular">
										<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
											<path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
										</svg>
									</div>
							</a>
					       <a className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-[#111118] dark:text-white rounded-full bg-[#f0f0f4] dark:bg-[#23232b]" href="#">1</a>
					       <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111118] dark:text-white rounded-full" href="#">2</a>
					       <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111118] dark:text-white rounded-full" href="#">3</a>
					       <span className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111118] dark:text-white rounded-full" href="#">...</span>
					       <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111118] dark:text-white rounded-full" href="#">10</a>
					       <a href="#" className="flex size-10 items-center justify-center">
					       	<div className="text-[#111118] dark:text-white" data-icon="CaretRight" data-size="18px" data-weight="regular">
										<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
											<path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
										</svg>
									</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
