export function GroseilleIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <circle cx="40" cy="42" r="12" fill="#c0392b" />
      <circle cx="56" cy="38" r="11" fill="#e74c3c" />
      <circle cx="48" cy="54" r="12" fill="#d63031" />
      <circle cx="60" cy="52" r="10" fill="#c0392b" />
      <circle cx="35" cy="55" r="9" fill="#e74c3c" />
      <circle cx="40" cy="42" r="3" fill="#ffffff20" />
      <circle cx="56" cy="38" r="2.5" fill="#ffffff20" />
      <circle cx="48" cy="54" r="3" fill="#ffffff20" />
      <path d="M48 22 C48 22 44 30 40 35" stroke="#27ae60" strokeWidth="2" fill="none" />
      <path d="M48 22 C48 22 52 28 56 33" stroke="#27ae60" strokeWidth="2" fill="none" />
      <path d="M48 22 C48 22 48 30 48 38" stroke="#2ecc71" strokeWidth="2" fill="none" />
      <ellipse cx="44" cy="20" rx="6" ry="3" fill="#27ae60" transform="rotate(-20 44 20)" />
      <ellipse cx="53" cy="20" rx="6" ry="3" fill="#2ecc71" transform="rotate(20 53 20)" />
    </svg>
  );
}

export function GrenadeIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <ellipse cx="50" cy="55" rx="28" ry="30" fill="#c0392b" />
      <ellipse cx="50" cy="55" rx="28" ry="30" fill="url(#grenadeGrad)" />
      <path d="M42 30 L50 18 L58 30" fill="#e67e22" stroke="#d35400" strokeWidth="1" />
      <rect x="46" y="18" width="8" height="6" rx="2" fill="#d35400" />
      <path d="M35 50 Q42 45 50 50 Q58 55 65 50" stroke="#ffffff15" strokeWidth="1.5" fill="none" />
      <circle cx="42" cy="58" r="3" fill="#e74c3c" />
      <circle cx="50" cy="52" r="3" fill="#e74c3c" />
      <circle cx="58" cy="58" r="3" fill="#e74c3c" />
      <circle cx="46" cy="64" r="2.5" fill="#e74c3c" />
      <circle cx="54" cy="64" r="2.5" fill="#e74c3c" />
      <circle cx="42" cy="58" r="1" fill="#ffffff30" />
      <circle cx="50" cy="52" r="1" fill="#ffffff30" />
      <defs>
        <radialGradient id="grenadeGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#e74c3c" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#c0392b" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function PassionIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <ellipse cx="50" cy="52" rx="28" ry="25" fill="#8e44ad" />
      <ellipse cx="50" cy="52" rx="28" ry="25" fill="url(#passionGrad)" />
      <ellipse cx="50" cy="52" rx="18" ry="16" fill="#f39c12" />
      <circle cx="42" cy="48" r="2" fill="#e67e22" />
      <circle cx="50" cy="46" r="2" fill="#e67e22" />
      <circle cx="58" cy="49" r="2" fill="#e67e22" />
      <circle cx="45" cy="55" r="2" fill="#e67e22" />
      <circle cx="55" cy="54" r="2" fill="#e67e22" />
      <circle cx="50" cy="60" r="2" fill="#e67e22" />
      <ellipse cx="50" cy="32" rx="5" ry="2.5" fill="#27ae60" transform="rotate(-10 50 32)" />
      <ellipse cx="56" cy="32" rx="5" ry="2.5" fill="#2ecc71" transform="rotate(15 56 32)" />
      <defs>
        <radialGradient id="passionGrad" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#9b59b6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8e44ad" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function PapayeIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <ellipse cx="50" cy="55" rx="22" ry="30" fill="#f39c12" />
      <ellipse cx="50" cy="55" rx="22" ry="30" fill="url(#papayeGrad)" />
      <ellipse cx="50" cy="55" rx="12" ry="18" fill="#e67e22" />
      <circle cx="47" cy="45" r="2" fill="#2c3e50" />
      <circle cx="53" cy="45" r="2" fill="#2c3e50" />
      <circle cx="50" cy="52" r="2" fill="#2c3e50" />
      <circle cx="46" cy="58" r="1.8" fill="#2c3e50" />
      <circle cx="54" cy="58" r="1.8" fill="#2c3e50" />
      <circle cx="50" cy="64" r="1.5" fill="#2c3e50" />
      <ellipse cx="48" cy="28" rx="5" ry="3" fill="#27ae60" transform="rotate(-15 48 28)" />
      <ellipse cx="54" cy="29" rx="5" ry="3" fill="#2ecc71" transform="rotate(20 54 29)" />
      <path d="M50 25 L50 32" stroke="#27ae60" strokeWidth="2" />
      <defs>
        <radialGradient id="papayeGrad" cx="40%" cy="30%">
          <stop offset="0%" stopColor="#f1c40f" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f39c12" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function MangueIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path d="M50 25 Q30 35 28 55 Q26 75 50 80 Q74 75 72 55 Q70 35 50 25Z" fill="#f39c12" />
      <path d="M50 25 Q30 35 28 55 Q26 75 50 80 Q74 75 72 55 Q70 35 50 25Z" fill="url(#mangueGrad)" />
      <path d="M50 25 Q45 35 43 50" stroke="#e67e22" strokeWidth="1" opacity="0.5" fill="none" />
      <path d="M50 25 Q55 38 55 55" stroke="#e67e22" strokeWidth="1" opacity="0.5" fill="none" />
      <circle cx="42" cy="40" r="4" fill="#ffffff10" />
      <path d="M50 25 Q48 18 42 16" stroke="#27ae60" strokeWidth="2.5" fill="none" />
      <ellipse cx="40" cy="16" rx="6" ry="3" fill="#27ae60" transform="rotate(-30 40 16)" />
      <path d="M46 20 Q44 14 38 14" stroke="#2ecc71" strokeWidth="1.5" fill="none" />
      <defs>
        <radialGradient id="mangueGrad" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#f1c40f" stopOpacity="0.7" />
          <stop offset="40%" stopColor="#e67e22" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#e74c3c" stopOpacity="0.3" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function GingembreIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path d="M45 35 Q38 32 32 38 Q28 45 32 52 Q36 58 42 55 Q45 53 48 55 Q52 58 58 58 Q65 58 68 52 Q72 45 65 40 Q60 36 55 40 Q52 43 48 40 Q46 38 45 35Z" fill="#d4a262" />
      <path d="M45 35 Q38 32 32 38 Q28 45 32 52 Q36 58 42 55 Q45 53 48 55 Q52 58 58 58 Q65 58 68 52 Q72 45 65 40 Q60 36 55 40 Q52 43 48 40 Q46 38 45 35Z" fill="url(#gingembreGrad)" />
      <path d="M32 45 Q26 42 24 48 Q22 55 28 56" fill="#c49550" />
      <path d="M62 42 Q66 34 72 36 Q78 38 76 45" fill="#c49550" />
      <path d="M38 40 Q40 44 38 48" stroke="#b8860b" strokeWidth="0.8" opacity="0.4" fill="none" />
      <path d="M55 44 Q57 48 55 52" stroke="#b8860b" strokeWidth="0.8" opacity="0.4" fill="none" />
      <ellipse cx="46" cy="30" rx="4" ry="2" fill="#27ae60" transform="rotate(-10 46 30)" />
      <path d="M46 30 L47 35" stroke="#27ae60" strokeWidth="1.5" />
      <defs>
        <radialGradient id="gingembreGrad" cx="45%" cy="40%">
          <stop offset="0%" stopColor="#e8c87a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#d4a262" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function CharbonIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path d="M30 65 L35 35 L50 30 L65 35 L70 65 L55 72 L40 72Z" fill="#2c3e50" />
      <path d="M30 65 L35 35 L50 30 L65 35 L70 65 L55 72 L40 72Z" fill="url(#charbonGrad)" />
      <path d="M35 35 L50 30 L65 35 L55 40 L42 40Z" fill="#34495e" />
      <path d="M42 40 L40 65" stroke="#3d566e" strokeWidth="0.5" opacity="0.5" />
      <path d="M55 40 L55 68" stroke="#3d566e" strokeWidth="0.5" opacity="0.5" />
      <circle cx="45" cy="50" r="1.5" fill="#5dade2" opacity="0.4" />
      <circle cx="55" cy="55" r="1" fill="#5dade2" opacity="0.3" />
      <circle cx="48" cy="62" r="1.2" fill="#5dade2" opacity="0.35" />
      <defs>
        <radialGradient id="charbonGrad" cx="45%" cy="35%">
          <stop offset="0%" stopColor="#5dade2" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2c3e50" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function MentheIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path d="M50 75 L50 35" stroke="#27ae60" strokeWidth="2.5" />
      <path d="M50 65 Q35 60 30 50 Q28 42 35 40 Q42 38 50 50" fill="#2ecc71" />
      <path d="M50 55 Q65 50 70 40 Q72 32 65 30 Q58 28 50 40" fill="#27ae60" />
      <path d="M50 45 Q38 40 34 32 Q32 26 38 24 Q44 22 50 32" fill="#2ecc71" />
      <path d="M50 35 Q60 32 64 25 Q66 20 60 18 Q55 17 50 25" fill="#1abc9c" />
      <path d="M50 65 Q43 58 38 48" stroke="#ffffff20" strokeWidth="0.8" fill="none" />
      <path d="M50 55 Q57 48 62 38" stroke="#ffffff20" strokeWidth="0.8" fill="none" />
      <path d="M50 45 Q43 38 38 30" stroke="#ffffff20" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

export function CitronIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <ellipse cx="50" cy="52" rx="25" ry="22" fill="#27ae60" />
      <ellipse cx="50" cy="52" rx="25" ry="22" fill="url(#citronGrad)" />
      <path d="M50 32 Q48 26 44 24" stroke="#2ecc71" strokeWidth="2" fill="none" />
      <ellipse cx="42" cy="23" rx="5" ry="2.5" fill="#2ecc71" transform="rotate(-20 42 23)" />
      <circle cx="44" cy="45" r="1.5" fill="#ffffff15" />
      <circle cx="56" cy="50" r="1" fill="#ffffff15" />
      <circle cx="48" cy="58" r="1.2" fill="#ffffff15" />
      <defs>
        <radialGradient id="citronGrad" cx="38%" cy="35%">
          <stop offset="0%" stopColor="#2ecc71" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#27ae60" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function AloeIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path d="M50 80 Q45 60 30 30 Q28 24 34 22 Q40 20 42 28 Q46 40 50 55" fill="#27ae60" />
      <path d="M50 80 Q55 60 70 30 Q72 24 66 22 Q60 20 58 28 Q54 40 50 55" fill="#2ecc71" />
      <path d="M50 80 Q48 55 40 25 Q38 18 44 16 Q50 14 50 22 Q50 30 50 55" fill="#1abc9c" />
      <path d="M50 80 Q52 55 60 25 Q62 18 56 16 Q50 14 50 22" fill="#16a085" opacity="0.6" />
      <path d="M42 35 Q44 40 42 45" stroke="#ffffff15" strokeWidth="1" fill="none" />
      <path d="M58 35 Q56 40 58 45" stroke="#ffffff15" strokeWidth="1" fill="none" />
      <path d="M50 30 Q50 40 50 50" stroke="#ffffff10" strokeWidth="1" fill="none" />
    </svg>
  );
}

export const ingredientIcons: Record<string, React.FC<{ className?: string }>> = {
  "Groseille": GroseilleIcon,
  "Grenade": GrenadeIcon,
  "Fruit de la Passion": PassionIcon,
  "Papaye": PapayeIcon,
  "Mangue": MangueIcon,
  "Gingembre": GingembreIcon,
  "Charbon Actif": CharbonIcon,
  "Menthe Poivrée": MentheIcon,
  "Citron Vert": CitronIcon,
  "Aloe Vera": AloeIcon,
};

export const gammeColors: Record<string, { from: string; to: string; accent: string }> = {
  "performance-volume": { from: "#c0392b", to: "#e74c3c", accent: "#ff6b6b" },
  "bonne-mine": { from: "#8e44ad", to: "#f39c12", accent: "#f1c40f" },
  "force-croissance": { from: "#f39c12", to: "#d4a262", accent: "#e67e22" },
  "purifiant-detox": { from: "#2c3e50", to: "#27ae60", accent: "#5dade2" },
  "fraicheur-clarification": { from: "#27ae60", to: "#1abc9c", accent: "#2ecc71" },
};
