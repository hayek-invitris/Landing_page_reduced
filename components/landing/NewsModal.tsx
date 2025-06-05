import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, User, Tag } from "lucide-react"
import Link from "next/link"

interface NewsArticle {
  title: string
  image: string
  content: string
  link: string
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
          className="object-cover"
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
            <span>June 15, 2023</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>Invitris Research Team</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4" />
            <span>Biotechnology, Research</span>
          </div>
        </div>
        
        {/* Main content */}
        <div className="text-slate-300 space-y-4 mb-8">
          <p className="text-lg">{article.content}</p>
          
          <p>
            Our research team has been working tirelessly to advance this technology,
            with potential applications spanning multiple areas of biotechnology and medicine.
            The implications for future research and development are significant.
          </p>
          
          {/* Key highlights section */}
          <div className="py-6 px-6 bg-zinc-800 rounded-lg mt-6">
            <h3 className="text-xl font-bold text-white mb-4">Key Highlights</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Breakthrough advancements in protein research methodologies</li>
              <li>Potential applications in therapeutic development</li>
              <li>Collaborative efforts with leading research institutions</li>
              <li>Significant improvements in efficiency and scalability</li>
            </ul>
          </div>
        </div>
        
        {/* Action button */}
        <div className="flex justify-center mt-8">
          <Link href={article.link}>
            <Button className="bg-[#1a3d5c] text-white hover:bg-[#152f47] px-8 py-6">
              Read Full Article
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 