export interface ThemeTokens {
  colors: {
    background: string;
    surface: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
    border: string;
  };
  typography: {
    h1: string;
    h2: string;
    h3: string;
    body: string;
    kicker: string;
    cta: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

export const Themes: Record<string, ThemeTokens> = {
  light: {
    colors: {
      background: "#ffffff",
      surface: "#f8f9fa",
      text: "#111827",
      primary: "#1d4ed8",
      secondary: "#6b7280",
      accent: "#2563eb",
      border: "#e5e7eb"
    },
    typography: {
      h1: "700 48px/1.1 'Inter', sans-serif",
      h2: "700 36px/1.2 'Inter', sans-serif",
      h3: "600 24px/1.3 'Inter', sans-serif",
      body: "400 16px/1.6 'Inter', sans-serif",
      kicker: "600 14px/1.4 'Inter', sans-serif",
      cta: "600 16px/1.4 'Inter', sans-serif"
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "32px",
      xl: "64px"
    },
    radius: {
      sm: "4px",
      md: "8px",
      lg: "16px"
    },
    shadows: {
      sm: "0 1px 2px rgba(0,0,0,0.05)",
      md: "0 4px 6px rgba(0,0,0,0.1)",
      lg: "0 10px 15px rgba(0,0,0,0.15)"
    }
  },

  dark: {
    colors: {
      background: "#0f0f14",
      surface: "#1a1a22",
      text: "#f3f4f6",
      primary: "#3b82f6",
      secondary: "#9ca3af",
      accent: "#60a5fa",
      border: "#2d2d35"
    },
    typography: {
      h1: "700 48px/1.1 'Inter', sans-serif",
      h2: "700 36px/1.2 'Inter', sans-serif",
      h3: "600 24px/1.3 'Inter', sans-serif",
      body: "400 16px/1.6 'Inter', sans-serif",
      kicker: "600 14px/1.4 'Inter', sans-serif",
      cta: "600 16px/1.4 'Inter', sans-serif"
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "32px",
      xl: "64px"
    },
    radius: {
      sm: "4px",
      md: "8px",
      lg: "16px"
    },
    shadows: {
      sm: "0 1px 2px rgba(0,0,0,0.2)",
      md: "0 4px 6px rgba(0,0,0,0.3)",
      lg: "0 10px 15px rgba(0,0,0,0.4)"
    }
  },

  patriotic: {
    colors: {
      background: "#0a0d1a",
      surface: "#111827",
      text: "#f9fafb",
      primary: "#1d4ed8", // Navy blue
      secondary: "#dc2626", // Red
      accent: "#ffffff", // White
      border: "#1f2937"
    },
    typography: {
      h1: "800 52px/1.1 'Inter', sans-serif",
      h2: "700 40px/1.2 'Inter', sans-serif",
      h3: "600 26px/1.3 'Inter', sans-serif",
      body: "400 17px/1.6 'Inter', sans-serif",
      kicker: "700 14px/1.4 'Inter', sans-serif",
      cta: "700 16px/1.4 'Inter', sans-serif"
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "32px",
      xl: "64px"
    },
    radius: {
      sm: "4px",
      md: "8px",
      lg: "16px"
    },
    shadows: {
      sm: "0 1px 2px rgba(0,0,0,0.3)",
      md: "0 4px 6px rgba(0,0,0,0.4)",
      lg: "0 10px 15px rgba(0,0,0,0.5)"
    }
  }
};