import { Star } from "lucide-react";
import Image from 'next/image';
import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/types";

interface PortfolioCardProps {
  project: PortfolioItem;
  className?: string;
  onClick?: () => void;
  featured?: boolean;
  animated?: boolean;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  project,
  className = "",
  onClick,
  featured = false,
  animated = true,
}) => {
  if (!project) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={cn(
        // Base Tailwind classes - заменен border на box-shadow + фиксированная высота
        "relative bg-white rounded-3xl shadow-lg transition-all duration-300 h-[26rem]",
        "hover:shadow-2xl cursor-pointer overflow-hidden flex flex-col",
        // Featured styling
        featured && "ring-2 ring-accent",
        // Global hover effects
        animated && "hoverLift",
        className
      )}
      style={{
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(43, 122, 138, 0.1)"
      }}
      onClick={handleClick}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg">
            <Star className="w-4 h-4 fill-current text-white" />
          </div>
        </div>
      )}

      {/* Project Image - убраны External Link элементы */}
      <div className="relative h-48 overflow-hidden rounded-t-3xl">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Project Content - фиксированная структура с равными отступами */}
      <div className="p-6 flex flex-col flex-1 text-center">
        {/* Project Title - фиксированная высота */}
        <div className="h-14 flex items-center justify-center mb-4">
          <h3 className="text-lg font-bold text-text-primary hover:text-accent transition-colors duration-300 line-clamp-2 leading-tight">
            {project.title}
          </h3>
        </div>

        {/* Project Description - фиксированная высота */}
        <div className="h-20 flex items-start justify-center mb-4 flex-1">
          <p className="text-text-primary/80 line-clamp-4 leading-relaxed text-sm">
            {project.description}
          </p>
        </div>

        {/* Project Tags - фиксированная позиция внизу */}
        <div className="mt-auto">
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 justify-center">
              {project.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs font-semibold px-3 py-1.5 bg-accent/10 text-accent border border-accent/20 rounded-md transition-all duration-300 leading-tight"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-xs font-semibold px-3 py-1.5 bg-gray-100 text-text-primary/60 border border-gray-200 rounded-md leading-tight">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />
      
      {/* Border Glow for Featured */}
      {featured && (
        <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/20 via-transparent to-accent/20 blur-sm" />
        </div>
      )}
    </div>
  );
};

export default PortfolioCard;
