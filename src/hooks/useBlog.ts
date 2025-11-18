import { useEffect, useState } from 'react'

type WPPost = {
  id: number
  title: { rendered: string }
  excerpt?: { rendered: string }
  content?: { rendered: string }
  _embedded?: any
}

export function useBlog() {
  const [posts, setPosts] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async (attempt = 0) => {
    try {
      setLoading(true)
      setError(null)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const res = await fetch('https://cms.nazaresantosestetica.com.br/wp-json/wp/v2/posts?_embed&per_page=20', {
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`)
      const data: WPPost[] = await res.json()
      setPosts(data)
    } catch (e: any) {
      if (attempt < 3) {
        const delay = Math.pow(2, attempt) * 1000
        setTimeout(() => fetchPosts(attempt + 1), delay)
      } else {
        setError(e?.message ?? 'Falha ao carregar posts')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return { posts, loading, error }
}

