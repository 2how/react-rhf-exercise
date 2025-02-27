import { useQuery } from "react-query"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

interface Post {
  id: number
  title: string
  content: string
  category: string
  tags: string[]
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("http://localhost:3000/posts")
  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }
  return response.json()
}

export function ViewAllPosts() {
  const { data: posts, isLoading, error } = useQuery<Post[], Error>("posts", fetchPosts)

  if (isLoading) {
    return <div className="text-center py-10">Loading posts...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error.toString()}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <Card key={post.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.category}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="line-clamp-3">{post.content}</p>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </CardFooter>
            <CardFooter>
              <Link to={`/posts/${post.id}`}>
                <Button variant="outline" className="w-full">
                  Read More
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

