import React from "react";

export default function LandingPage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white dark:bg-[#111118] overflow-x-hidden" style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container container-type-inline-size">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-center justify-center p-4"
                  style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAatRS5BIFNNjat9saAOdkilne3L_bmcQ2UJNGnopmr8tkFSKZQp2tqIO8C9OUv9Nb3Nf8j0DFs5h3RUX3jO19W7AaJjuhM-0Eg1wqSvxTG5TsoTDP95yAl6QU2_gH_4hV1zCKA8a5cmS7dz3_cgMnFvzoZoM8trV3KoTRkeAZk6JAwZ1TMAmuS3DgnJTvZGPIB-OVrww5b8lkkJHjmFsEy9m39AMsZSfs-JHHVTzhqs_JYliMrohe5ndmLjbtoGFbKFmy9HAj6mw")' }}
                >
                  <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                      Unleash Your Innovation
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Join InnovateHub and participate in exciting hackathons. Collaborate, create, and compete with developers worldwide.
                    </h2>
                  </div>
                  <a href="/events" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#686aed] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                    <span className="truncate">Explore Events</span>
                  </a>
                </div>
              </div>
            </div>

            <h2 className="text-[#111118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Upcoming Events</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <a href="/events/1" className="flex flex-col gap-3 pb-3 cursor-pointer hover:scale-[1.03] transition-transform">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjWzT_-h6tAvb_3F1iaKQLHgeNPWE_zI0YE1IPQbwPvnpiPHLgqaNa5NAhGgWFYlSH3sDoKoB3cQfhAydpyHPdbesRSH6RFguALB3nQV3tMIlmBx__LmMB5SkNDz9ia4cClN3rw1QUjhK-2B9x43CdCDlCn7_vHo4xk6S4ELFy0lqqL7XkSdKP55IkDTEIS55ALCD2Y_WjsRAcp8DwW1_rpLOSinR7JPCRJdpIabDe3ap3tG2fjqP4Ie6tlNrZ6iOP3fMOBDMbkw")' }}
                ></div>
                <div>
                  <p className="text-[#111118] text-base font-medium leading-normal">CodeFest 2024</p>
                  <p className="text-[#636388] text-sm font-normal leading-normal">July 15 - 17, 2024</p>
                </div>
              </a>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAA1SKj4W1ts_iFVt6k_gy4on60Dt_PQlY0sLzcXBustwSxs5TJP_jUoJirxiQVwIlaHKPyNT-OvqfBKOCIyrjvl15sZHjqVScMjVQrQaq1wwgfUCyRTTXUJspOEvMA3zlIMDH0MyJ-xydpmIW8yStk3V6sbYlWV_XBM_FbbgXCMSo7izaOX1dPeBmbnPDlJvB6K4WKvWXm5dRC6IMZ-gGFdWYZAhRNrF_Y-H_aT6xYCDbvSb6eDPKsuD_FLKF6lEiJ2tWfgskAaQ")' }}
                ></div>
                <div>
                  <p className="text-[#111118] text-base font-medium leading-normal">DataDive Challenge</p>
                  <p className="text-[#636388] text-sm font-normal leading-normal">August 5 - 7, 2024</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD61519ObmAgLQr4PaXyKtt_hoFaonqBkwYvY_VEmYA6iYxcccQJ2v1_ipvArePPsKxsXOwJrAA3jbtRYJ8loC6trfmmuHd-Mk8BrQjwqlSd1CYizP5uTzLjLsWJD5ac0MI85IIIJVnjwhhnJYQIyMduGprw7BormbBpXQwWe-oELIQdoeVSIohN6hmMTRJh_zTLt2VZB7beH00wuBU54UBTlzVXFZeSQ-zKeEeATw_mBjC1vql_sc8GcGjWGBa6xEa-UBelVNLww")' }}
                ></div>
                <div>
                  <p className="text-[#111118] text-base font-medium leading-normal">AI Innovate Sprint</p>
                  <p className="text-[#636388] text-sm font-normal leading-normal">September 20 - 22, 2024</p>
                </div>
              </div>
            </div>

            <h2 id="features" className="text-[#111118] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Feature Highlights</h2>
            <div className="flex flex-col gap-10 px-4 py-10 @container container-type-inline-size">
              <div className="flex flex-col gap-4">
                <h1 className="text-[#111118] dark:text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                  Empowering Your Hackathon Experience
                </h1>
                <p className="text-[#111118] dark:text-white text-base font-normal leading-normal max-w-[720px]">
                  InnovateHub provides the tools and resources you need to succeed in your next hackathon.
                </p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#dcdce5] bg-white p-4 flex-col">
                  <div className="text-[#111118]" data-icon="Users" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path></svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#111118] text-base font-bold leading-tight">Real-time Collaboration</h2>
                    <p className="text-[#636388] text-sm font-normal leading-normal">Work together seamlessly with team members in real-time, regardless of location.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#dcdce5] bg-white p-4 flex-col">
                  <div className="text-[#111118]" data-icon="Code" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"></path></svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#111118] text-base font-bold leading-tight">Integrated Development Environment</h2>
                    <p className="text-[#636388] text-sm font-normal leading-normal">Code, test, and deploy your projects directly within our platform with our integrated IDE.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#dcdce5] bg-white p-4 flex-col">
                  <div className="text-[#111118]" data-icon="ChatCircleDots" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path></svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#111118] text-base font-bold leading-tight">Community Support</h2>
                    <p className="text-[#636388] text-sm font-normal leading-normal">Get help and feedback from a vibrant community of developers and mentors.</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 id="sponsors" className="text-[#111118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Our Sponsors</h2>
            <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-stretch p-4 gap-3">
                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCOBB1guzpygOk0jsN3OeXk_d9_td1tXyiCuoFnKB1mi4qXd6Foe8Hf6IdiczZLDBrChvHeKNKioDZcsj8bqwGMCzmpSwsK5yiryEo0Ts8YJD_GYn7Al8vDJ9qGvBBSLySfKJdLiGDFUWocTG1E0atrF-Jd7ilAt8z7VOhXdGrCbqA8liGzLwzkF4xlvhw2-HRBmkTaARX4DhvnftNXJBtZSgL4opGpwsgXY8VLd7E_yZVFWbKcAqVo8fYj1RYbvnJn6un_8xovNA")' }}
                  ></div>
                  <p className="text-[#111118] text-base font-medium leading-normal">Tech Solutions Inc.</p>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6_gFo7cCwnsQp6JQZJLM_NPFOlTmRPXGJcEnmPHDc3ZcNmSnHJYqvp8RBuhB4DAd6q87wwmXhutSNGpU1_FDCJHiRQ2DVm_Uf2xUlTNsTU7cBwAh2r-ZWuwF0tdFVT_oKbnABKsrqV90LrWi4UN-ZKfyXG0C21tz4lIspPwYbU4Ow6sWqu_MJBRaTOoOpBzzmMWTX9nufs1OPnIHScrM330FLT7FSc7bV2rQtmnJU-zh1IOptsWHKNEiCaBURfmmZSS7ZrMqrOA")' }}
                  ></div>
                  <p className="text-[#111118] text-base font-medium leading-normal">Software Innovators Ltd.</p>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAb8lKxZvhOlrMKBG7nTry8EYPQNAKeE3JSHOubzJOxADKrHufB3qHj_ol6QrQMo_GeZsrneUu5Vfrlsllw4a2aBr6b3nYwgQNDCO8hKiZTtSZTonxI-wTtbW5bghLYD3QuJwNOUgTetiT_aeaNQKGhRFvu5SkRglQzoXYEhSjdiYq6JKv26KscDO0TtCvHoSyUcPH9K8bPkSzUJJz432aZeagYnsgJcFM-LgpSOc5yByI5-umZ31UAN52dTWcMF7A6bgWtkjf4bw")' }}
                  ></div>
                  <p className="text-[#111118] text-base font-medium leading-normal">Innovation Fund</p>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBeZnCCB2M55D4CKpj5466WaAmwunkEhBIkHIaFh9820dXd9i6T47GWGLcjjMKqJTgIyDz6RKHvkCz5MOyYbtT9rj8mzTfHZrkY1dYzmLXbLQPcWheAvdZp9NOB736BlUX52xzf177-wu_FK6MUxeMNeiRt8o7s3_-gkb6Ors_0v-7NvoiriIGA4EndM2G2NaNM-OdMcOp2dVAqun0kKqS7Oh1g7CAYrTRXkpJbyG-bOiiNXRhUMoaMZ_0mdQYzRmpPdnmogVauFA")' }}
                  ></div>
                  <p className="text-[#111118] text-base font-medium leading-normal">Cloud Services Co.</p>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC28Igm_g1iEyscs-Vxd0uNntI9FYICqDBxkAF83gUUfKSNYu3yP0l7cJItX2LT7X1tsIO-IYWg_zm7T4-vuVKTLbfZOX0BcBzHaD8K03OjIiJiLGnlowKRm4CoRMlzqIEjSQyvzwjtmjhvBRUhKHbJ70Y3NZAek1fZW59bWgMrZaGpogZveg9CEydI4V3t1iikkn77TrJUnGAAtDarLKv1PIfpjnmHqxpIlJ3roKeva1OHgjOaRc0DoxLw_xjJktvyroFw9wU-2g")' }}
                  ></div>
                  <p className="text-[#111118] text-base font-medium leading-normal">Startup Accelerator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
