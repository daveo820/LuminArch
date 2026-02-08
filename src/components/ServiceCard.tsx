import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  href,
}: ServiceCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="card p-8 h-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blush flex items-center justify-center text-champagne group-hover:bg-champagne group-hover:text-white transition-colors">
          {icon}
        </div>
        <h3
          className="text-xl mb-3 group-hover:text-champagne-dark transition-colors"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed">
          {description}
        </p>
        <div className="mt-6 text-champagne-dark text-sm font-semibold flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          Learn More
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
    </Link>
  );
}
