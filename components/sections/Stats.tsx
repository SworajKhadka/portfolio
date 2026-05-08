'use client'

import { useEffect, useRef, useState } from 'react'
import { SiGithub, SiLeetcode } from 'react-icons/si'

type GitHubData = {
  public_repos: number
  followers: number
  following: number
  public_gists: number
}

type ContribDay = { date: string; contributionCount: number }
type GitHubContribData = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: { contributionDays: ContribDay[] }[]
        }
      }
    }
  }
}

type LeetCodeData = {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  submissionCalendar?: Record<string, number> | string
}

const HEAT_LEVELS = ['#D1CFC9', '#0b4f61', '#0f7a92', '#1bafc9', '#4FC9DA']

function heatColor(count: number) {
  if (count === 0) return HEAT_LEVELS[0]
  if (count === 1) return HEAT_LEVELS[1]
  if (count <= 3) return HEAT_LEVELS[2]
  if (count <= 6) return HEAT_LEVELS[3]
  return HEAT_LEVELS[4]
}

function buildWeeks(): string[][] {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const start = new Date(today)
  start.setUTCDate(start.getUTCDate() - 364)
  start.setUTCDate(start.getUTCDate() - start.getUTCDay())

  const weeks: string[][] = []
  const cur = new Date(start)
  while (cur <= today) {
    const week: string[] = []
    for (let d = 0; d < 7; d++) {
      week.push(cur <= today ? cur.toISOString().split('T')[0] : '')
      cur.setUTCDate(cur.getUTCDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
}

function StatBox({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-lg border border-[#4A5C6A] bg-[#06141B] p-4 text-center">
      <p className="text-2xl font-bold text-[#4FC9DA]">{value}</p>
      <p className="mt-1 text-xs text-[#9BA8AB]">{label}</p>
    </div>
  )
}

function PulseSkeleton({ rows = 4, cols = 2 }: { rows?: number; cols?: number }) {
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-20 animate-pulse rounded-lg bg-[#253745]" />
      ))}
    </div>
  )
}

function ChartSkeleton() {
  return (
    <>
      <div className="mt-6 h-[95px] animate-pulse rounded-lg bg-[#253745]" />
      <div className="mt-3 h-[4px] animate-pulse rounded-full bg-[#253745]" />
    </>
  )
}

function scrollTo(ref: React.RefObject<HTMLDivElement | null>, pct: number) {
  const el = ref.current
  if (!el) return
  el.scrollLeft = ((el.scrollWidth - el.clientWidth) * pct) / 100
}

export default function Stats() {
  const [gh, setGh] = useState<GitHubData | null>(null)
  const [ghLoading, setGhLoading] = useState(true)
  const [ghContrib, setGhContrib] = useState<GitHubContribData | null>(null)
  const [ghContribLoading, setGhContribLoading] = useState(true)
  const [lc, setLc] = useState<LeetCodeData | null>(null)
  const [lcLoading, setLcLoading] = useState(true)

  const ghScrollRef = useRef<HTMLDivElement>(null)
  const lcScrollRef = useRef<HTMLDivElement>(null)
  const [ghSlider, setGhSlider] = useState(100)
  const [lcSlider, setLcSlider] = useState(100)

  useEffect(() => {
    fetch('https://api.github.com/users/SworajKhadka')
      .then((r) => r.json())
      .then(setGh)
      .catch(() => setGh(null))
      .finally(() => setGhLoading(false))

    fetch('/api/github-contributions')
      .then((r) => r.json())
      .then((data) => {
        if (data?.data?.user?.contributionsCollection) setGhContrib(data)
      })
      .catch(() => {})
      .finally(() => setGhContribLoading(false))

    fetch('/api/leetcode')
      .then((r) => r.json())
      .then((data) => {
        if (
          data &&
          typeof data.totalSolved === 'number' &&
          typeof data.easySolved === 'number' &&
          typeof data.mediumSolved === 'number' &&
          typeof data.hardSolved === 'number'
        ) {
          setLc(data)
        } else {
          setLc(null)
        }
      })
      .catch(() => setLc(null))
      .finally(() => setLcLoading(false))
  }, [])

  useEffect(() => {
    if (!ghContribLoading) scrollTo(ghScrollRef, 100)
  }, [ghContribLoading])

  useEffect(() => {
    if (!lcLoading) scrollTo(lcScrollRef, 100)
  }, [lcLoading])

  const lcTotal = (lc?.easySolved ?? 0) + (lc?.mediumSolved ?? 0) + (lc?.hardSolved ?? 0)
  const easyPct = lcTotal ? ((lc!.easySolved / lcTotal) * 100).toFixed(1) : '0'
  const mediumPct = lcTotal ? ((lc!.mediumSolved / lcTotal) * 100).toFixed(1) : '0'
  const hardPct = lcTotal ? ((lc!.hardSolved / lcTotal) * 100).toFixed(1) : '0'

  // Build LeetCode calendar map
  const lcCalendar: Record<string, number> = (() => {
    if (!lc?.submissionCalendar) return {}
    const raw = typeof lc.submissionCalendar === 'string'
      ? JSON.parse(lc.submissionCalendar)
      : lc.submissionCalendar
    const map: Record<string, number> = {}
    for (const [ts, count] of Object.entries(raw as Record<string, number>)) {
      const key = new Date(parseInt(ts) * 1000).toISOString().split('T')[0]
      map[key] = (map[key] ?? 0) + count
    }
    return map
  })()

  // Build GitHub calendar map from GraphQL response
  const ghCalendar: Record<string, number> = (() => {
    if (!ghContrib) return {}
    const map: Record<string, number> = {}
    for (const week of ghContrib.data.user.contributionsCollection.contributionCalendar.weeks) {
      for (const day of week.contributionDays) {
        map[day.date] = day.contributionCount
      }
    }
    return map
  })()

  const ghTotalContributions =
    ghContrib?.data.user.contributionsCollection.contributionCalendar.totalContributions ?? null

  const weeks = buildWeeks()

  return (
    <section id="stats" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-[#CCD0CF] md:text-4xl">Stats</h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#4FC9DA]" />
        <p className="mt-4 text-[#9BA8AB]">By the numbers</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* ── GitHub card ── */}
        <div className="rounded-2xl border border-[#4A5C6A] bg-[#11212D] p-6">
          <div className="mb-6 flex items-center gap-2">
            <SiGithub size={20} className="text-[#CCD0CF]" />
            <h3 className="font-semibold text-[#CCD0CF]">GitHub</h3>
          </div>

          {ghLoading ? (
            <PulseSkeleton rows={4} cols={2} />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <StatBox value={gh?.public_repos ?? '--'} label="Public Repos" />
              <StatBox value={gh?.followers ?? '--'} label="Followers" />
              <StatBox value={gh?.following ?? '--'} label="Following" />
              <StatBox value={ghTotalContributions ?? gh?.public_gists ?? '--'} label={ghTotalContributions !== null ? 'Contributions' : 'Public Gists'} />
            </div>
          )}

          {ghContribLoading ? (
            <ChartSkeleton />
          ) : (
            <>
              <div
                ref={ghScrollRef}
                className="no-scrollbar mt-6 h-[95px] overflow-x-scroll rounded-lg"
              >
                <div className="flex h-full min-w-max gap-[3px]">
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((dateStr, di) => (
                        <div
                          key={di}
                          className="h-[11px] w-[11px] rounded-[2px]"
                          style={{ backgroundColor: heatColor(dateStr ? (ghCalendar[dateStr] ?? 0) : 0) }}
                          title={dateStr ? `${dateStr}: ${ghCalendar[dateStr] ?? 0}` : undefined}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                value={ghSlider}
                onChange={(e) => {
                  const v = Number(e.target.value)
                  setGhSlider(v)
                  scrollTo(ghScrollRef, v)
                }}
                className="chart-slider mt-3"
              />

              <div className="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-[#9BA8AB]">
                <span>Less</span>
                {HEAT_LEVELS.map((c) => (
                  <div key={c} className="h-[10px] w-[10px] rounded-[2px]" style={{ backgroundColor: c }} />
                ))}
                <span>More</span>
              </div>
            </>
          )}
        </div>

        {/* ── LeetCode card ── */}
        <div className="rounded-2xl border border-[#4A5C6A] bg-[#11212D] p-6">
          <div className="mb-6 flex items-center gap-2">
            <SiLeetcode size={20} className="text-[#CCD0CF]" />
            <h3 className="font-semibold text-[#CCD0CF]">LeetCode</h3>
          </div>

          {lcLoading ? (
            <>
              <PulseSkeleton rows={4} cols={2} />
              <div className="mt-6 h-3 animate-pulse rounded-full bg-[#253745]" />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <StatBox value={lc?.totalSolved ?? '--'} label="Total Solved" />
                <StatBox value={lc?.easySolved ?? '--'} label="Easy" />
                <StatBox value={lc?.mediumSolved ?? '--'} label="Medium" />
                <StatBox value={lc?.hardSolved ?? '--'} label="Hard" />
              </div>

              {/* Difficulty bar */}
              <div className="mt-6">
                <div className="flex h-3 w-full overflow-hidden rounded-full bg-[#253745]">
                  <div style={{ width: `${easyPct}%` }} className="bg-green-500 transition-all duration-700" />
                  <div style={{ width: `${mediumPct}%` }} className="bg-yellow-500 transition-all duration-700" />
                  <div style={{ width: `${hardPct}%` }} className="bg-red-500 transition-all duration-700" />
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#9BA8AB]">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                    Easy &nbsp;{lc?.easySolved ?? 0}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" />
                    Medium &nbsp;{lc?.mediumSolved ?? 0}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                    Hard &nbsp;{lc?.hardSolved ?? 0}
                  </span>
                </div>
              </div>

              {/* Activity heatmap */}
              {lc?.submissionCalendar && (
                <>
                  <div
                    ref={lcScrollRef}
                    className="no-scrollbar mt-6 h-[95px] overflow-x-scroll rounded-lg"
                  >
                    <div className="flex h-full min-w-max gap-[3px]">
                      {weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px]">
                          {week.map((dateStr, di) => (
                            <div
                              key={di}
                              className="h-[11px] w-[11px] rounded-[2px]"
                              style={{ backgroundColor: heatColor(dateStr ? (lcCalendar[dateStr] ?? 0) : 0) }}
                              title={dateStr ? `${dateStr}: ${lcCalendar[dateStr] ?? 0}` : undefined}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={lcSlider}
                    onChange={(e) => {
                      const v = Number(e.target.value)
                      setLcSlider(v)
                      scrollTo(lcScrollRef, v)
                    }}
                    className="chart-slider mt-3"
                  />

                  <div className="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-[#9BA8AB]">
                    <span>Less</span>
                    {HEAT_LEVELS.map((c) => (
                      <div key={c} className="h-[10px] w-[10px] rounded-[2px]" style={{ backgroundColor: c }} />
                    ))}
                    <span>More</span>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
