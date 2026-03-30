"use client";
import { ingredientIcons, gammeColors } from "@/components/FruitIcons";
import { ShoppingBag } from "lucide-react";

interface Props {
  ingredients: string[];
  gammeId: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: { container: "aspect-[4/3]", main: "w-16 h-16", secondary: "w-10 h-10" },
  md: { container: "aspect-[4/3]", main: "w-24 h-24", secondary: "w-14 h-14" },
  lg: { container: "aspect-square", main: "w-32 h-32", secondary: "w-18 h-18" },
  xl: { container: "aspect-square", main: "w-44 h-44 sm:w-56 sm:h-56", secondary: "w-20 h-20" },
};

function RenderIcon({ Icon, className }: { Icon: React.FC<{ className?: string }>; className: string }) {
  return <Icon className={className} />;
}

export default function ProductIllustration({ ingredients, gammeId, size = "md", className = "" }: Props) {
  const colors = gammeColors[gammeId] || { from: "#c9a84c", to: "#e0c76a", accent: "#e0c76a" };
  const dims = sizeMap[size];

  const icons = ingredients
    .map((name) => ({ name, Icon: ingredientIcons[name] }))
    .filter((x): x is { name: string; Icon: React.FC<{ className?: string }> } => !!x.Icon);

  return (
    <div
      className={`${dims.container} flex items-center justify-center relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${colors.from}12, ${colors.to}06)` }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ background: `radial-gradient(circle at 50% 50%, ${colors.accent}, transparent 60%)` }}
      />

      {icons.length >= 2 ? (
        <div className="relative z-10 flex items-center gap-1 group-hover:scale-110 transition-transform duration-500">
          <div className="relative" style={{ transform: "translateX(8px) rotate(-5deg)" }}>
            <RenderIcon Icon={icons[0].Icon} className={dims.main} />
          </div>
          <div className="relative" style={{ transform: "translateX(-8px) rotate(5deg)" }}>
            <RenderIcon Icon={icons[1].Icon} className={dims.main} />
          </div>
        </div>
      ) : icons.length === 1 ? (
        <div className="relative z-10 group-hover:scale-110 transition-transform duration-500">
          <RenderIcon Icon={icons[0].Icon} className={dims.main} />
        </div>
      ) : (
        <ShoppingBag className="w-12 h-12 text-gold/15" />
      )}

      {/* Extra small ingredient badges at bottom for 3+ ingredients */}
      {icons.length > 2 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
          {icons.slice(2, 5).map(({ name, Icon }) => (
            <div key={name} className="w-8 h-8 rounded-full bg-dark/50 backdrop-blur-sm flex items-center justify-center border border-dark-border/30">
              <RenderIcon Icon={Icon} className="w-6 h-6" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
