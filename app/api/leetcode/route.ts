export async function GET() {
  try {
    const res = await fetch('https://leetcode-api-faisalshohag.vercel.app/SworajKhadka', {
      next: { revalidate: 3600 },
    })
    const data = await res.json()
    return Response.json(data)
  } catch {
    return Response.json({ error: 'Failed to fetch LeetCode data' }, { status: 500 })
  }
}
