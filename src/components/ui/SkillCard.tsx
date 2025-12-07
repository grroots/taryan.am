// src/components/ui/SkillCard.tsx
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Skill } from "@/types";

interface SkillCardProps {
  skill: Skill;
  className?: string;
  showTooltip?: boolean;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  className = "",
  showTooltip = true,
  size = "md",
  animated = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!skill) {
    return null;
  }

  // Size variants using Tailwind classes
  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-10 h-10",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  // Level indicators (1-5 stars/dots)
  const renderLevel = () => {
    if (!skill.level || !showTooltip) return null;
    
    return (
      <div className="flex gap-1 mt-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300",
              index < skill.level
                ? "bg-current opacity-100"
                : "bg-current opacity-20"
            )}
            style={{ color: skill.color }}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className={cn(
        // Base Tailwind classes
        "relative bg-white rounded-2xl border border-gray-200",
        "transition-all duration-300 hover:shadow-lg cursor-pointer",
        sizeClasses[size],
        // Global hover effects
        animated && "hoverLift",
        className
      )}
      style={{ 
        '--skill-color': skill.color,
        borderColor: isHovered ? skill.color : undefined,
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Skill Icon */}
      <div className="flex justify-center mb-3">
        <div 
          className={cn(
            iconSizes[size],
            "transition-all duration-300",
            animated && "group-hover:scale-110"
          )}
          style={{ color: skill.color }}
        >
          {skill.icon}
        </div>
      </div>

      {/* Skill Name */}
      <div className="text-center">
        <h4 className={cn(
          "font-semibold text-text-primary transition-colors duration-300",
          textSizes[size],
          isHovered && "text-current"
        )}
        style={{ color: isHovered ? skill.color : undefined }}
        >
          {skill.name}
        </h4>
      </div>

      {/* Level Indicator */}
      {renderLevel()}

      {/* Tooltip */}
      {showTooltip && isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
          <div 
            className="text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg"
            style={{ backgroundColor: skill.color }}
          >
            <div className="font-semibold">{skill.name}</div>
            {skill.level && (
              <div className="text-xs opacity-90 mt-1">
                Level: {skill.level}/5
              </div>
            )}
            
            {/* Tooltip Arrow */}
            <div 
              className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
              style={{ borderTopColor: skill.color }}
            />
          </div>
        </div>
      )}

      {/* Hover Effects */}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none",
          isHovered && "opacity-10"
        )}
        style={{ backgroundColor: skill.color }}
      />
      
      {/* Progress Ring (for level visualization) */}
      {skill.level && showTooltip && (
        <div className={cn(
          "absolute top-2 right-2 opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )}>
          <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
            {/* Background circle */}
            <circle
              cx="12"
              cy="12"
              r="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <circle
              cx="12"
              cy="12"
              r="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${(skill.level / 5) * 50.27} 50.27`}
              className="transition-all duration-500"
              style={{ color: skill.color }}
            />
          </svg>
        </div>
      )}

      {/* Micro-animation on hover */}
      <div 
        className={cn(
          "absolute top-1 left-1 w-2 h-2 rounded-full opacity-0 transition-all duration-300",
          isHovered && animated && "opacity-60 animate-pulse"
        )}
        style={{ backgroundColor: skill.color }}
      />
    </div>
  );
};

export default SkillCard;