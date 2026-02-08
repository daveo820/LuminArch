import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  image,
  date,
  category,
  readTime,
}: BlogCardProps) {
  return (
    <Link href={`/setthestage/${slug}`} className="group block">
      <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-champagne text-white text-xs uppercase tracking-wider px-3 py-1 rounded-full">
              {category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 text-sm text-text-muted mb-3">
            <time dateTime={date}>{date}</time>
            <span>•</span>
            <span>{readTime}</span>
          </div>
          <h2
            className="text-xl mb-3 group-hover:text-champagne transition-colors"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {title}
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
            {excerpt}
          </p>
          <div className="mt-4 text-champagne text-sm font-medium flex items-center gap-2">
            Read More
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
