import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"

interface NewsArticle {
  title: string
  image: string
  content: string
  link: string
  hasExternalLink: boolean
  date: string
  linkText?: string
}

interface NewsModalProps {
  article: NewsArticle
}

export function NewsModal({ article }: NewsModalProps) {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden max-w-3xl w-full mx-auto text-slate-200 max-h-[90vh] flex flex-col">
      <div className="relative h-80 w-full flex-shrink-0">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-contain"
          priority
        />
      </div>
      
      {/* Header */}
      <div className="p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold text-white mb-4">{article.title}</h2>
        
        {/* Meta information */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{article.date}</span>
          </div>
        </div>
        
        {/* Main content */}
        <div className="text-slate-300 space-y-4 mb-8">
          <p className="text-lg">{article.content}</p>
        </div>
        
        {/* Action button */}
        {article.hasExternalLink && (
          <div className="flex justify-center mt-8">
            <Link href={article.link}>
              <Button className="bg-[#1a3d5c] text-white hover:bg-[#152f47] px-8 py-6">
                {article.linkText || "Read Full Article"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
} 