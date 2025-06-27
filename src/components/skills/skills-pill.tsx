import { FC, SVGProps } from "react";
import Tooltip from "@/components/ui/tooltip";

export type SkillPillProps = {
  name: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  description?: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
};

export default function SkillPill(props: SkillPillProps) {
  const { name, icon: Icon, description, level } = props;
  
  const getLevelColor = (level?: string) => {
    switch (level) {
      case "Expert":
        return "text-green-500";
      case "Advanced":
        return "text-blue-500";
      case "Intermediate":
        return "text-yellow-500";
      case "Beginner":
        return "text-orange-500";
      default:
        return "text-accent";
    }
  };

  const tooltipContent = description || level || `${name} skill`;
  
  return (
    <Tooltip 
      content={tooltipContent}
      position="top"
      delay={200}
    >
      <div className="group flex w-max items-center gap-2 overflow-hidden rounded-lg border border-accent/20 bg-white px-4 py-3 text-sm shadow-sm dark:bg-zinc-800 sm:text-base md:px-6 md:py-3 md:text-lg hover:border-accent/40 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer">
        <Icon className={`h-5 w-5 sm:h-8 sm:w-8 transition-all duration-200 group-hover:scale-110 ${level ? getLevelColor(level) : ""}`} />
        <span className="font-medium group-hover:text-accent transition-colors duration-200">{name}</span>
        {level && (
          <span className={`text-xs px-1.5 py-0.5 rounded-full bg-current/10 ${getLevelColor(level)} hidden sm:inline`}>
            {level}
          </span>
        )}
      </div>
    </Tooltip>
  );
}
