import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Home } from "lucide-react";

/**
 * Adapted from a 21st.dev 404 page (white bg + stick runners + expanding
 * circles). Inverted to the project's dark + single-blue-accent theme.
 */

type StickFigure = {
  top?: string;
  bottom?: string;
  src: string;
  transform?: string;
  speedX: number;
  speedRotation?: number;
};

const STICK_FIGURES: StickFigure[] = [
  {
    top: "0%",
    src: "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg",
    transform: "rotateZ(-90deg)",
    speedX: 1500,
  },
  {
    top: "10%",
    src: "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick1.svg",
    speedX: 3000,
    speedRotation: 2000,
  },
  {
    top: "20%",
    src: "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick2.svg",
    speedX: 5000,
    speedRotation: 1000,
  },
  {
    top: "25%",
    src: "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg",
    speedX: 2500,
    speedRotation: 1500,
  },
  {
    top: "35%",
    src: "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg",
    speedX: 2000,
    speedRotation: 300,
  },
  {
    bottom: "5%",
    src: "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick3.svg",
    speedX: 0,
  },
];

function CharactersAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = "";

    STICK_FIGURES.forEach((figure, index) => {
      const stick = document.createElement("img");
      stick.style.position = "absolute";
      stick.style.width = "18%";
      stick.style.height = "18%";
      // Invert the black SVGs to white-ish so they read on dark bg; tint slightly toward accent.
      stick.style.filter =
        "invert(1) brightness(0.85) sepia(1) hue-rotate(190deg) saturate(2.5)";
      stick.style.opacity = "0.55";
      if (figure.top) stick.style.top = figure.top;
      if (figure.bottom) stick.style.bottom = figure.bottom;
      stick.src = figure.src;
      stick.alt = "";
      if (figure.transform) stick.style.transform = figure.transform;
      container.appendChild(stick);

      if (index === 5) return;

      stick.animate(
        [{ left: "100%" }, { left: "-20%" }],
        { duration: figure.speedX, easing: "linear", fill: "forwards" },
      );

      if (index === 0) return;

      if (figure.speedRotation) {
        stick.animate(
          [{ transform: "rotate(0deg)" }, { transform: "rotate(-360deg)" }],
          {
            duration: figure.speedRotation,
            iterations: Infinity,
            easing: "linear",
          },
        );
      }
    });

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "99%",
        height: "95%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}

interface Circle {
  x: number;
  y: number;
  size: number;
}

function CircleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timerRef = useRef(0);
  const circlesRef = useRef<Circle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initArr = () => {
      circlesRef.current = [];
      for (let i = 0; i < 70; i++) {
        const x =
          Math.floor(
            Math.random() * (canvas.width * 3 - canvas.width * 1.2 + 1),
          ) + canvas.width * 1.2;
        const y =
          Math.floor(Math.random() * (canvas.height - canvas.height * -0.2 + 1)) +
          canvas.height * -0.2;
        circlesRef.current.push({ x, y, size: canvas.width / 2000 });
      }
    };

    const draw = () => {
      timerRef.current++;
      const distanceX = canvas.width / 80;
      const growth = canvas.width / 4000;
      ctx.fillStyle = "rgba(59,130,246,0.22)";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      circlesRef.current.forEach((c) => {
        ctx.beginPath();
        if (timerRef.current < 65) {
          c.x -= distanceX;
          c.size += growth;
        } else if (timerRef.current < 500) {
          c.x -= distanceX * 0.02;
          c.size += growth * 0.15;
        }
        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (timerRef.current > 500) {
        cancelAnimationFrame(rafRef.current);
        return;
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      timerRef.current = 0;
      cancelAnimationFrame(rafRef.current);
      initArr();
      draw();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

function MessageDisplay() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: "5%",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--text3)",
          marginBottom: 14,
        }}
      >
        — Page not found
      </div>
      <div
        style={{
          fontFamily: "var(--font-cinematic, var(--font-display))",
          fontSize: "clamp(96px, 16vw, 200px)",
          fontWeight: 800,
          lineHeight: 0.9,
          background: "linear-gradient(180deg, var(--text) 0%, rgba(255,255,255,0.35) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 18,
          letterSpacing: "-0.02em",
        }}
      >
        404
      </div>
      <p
        style={{
          fontSize: 15,
          maxWidth: 460,
          color: "var(--text2)",
          lineHeight: 1.65,
          margin: "0 0 32px",
        }}
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-outline"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
        <Link to="/" className="btn btn-primary">
          <Home size={16} />
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "var(--bg)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Helmet>
        <title>404 — Page Not Found | Neelesh Yadav</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <CircleAnimation />
      <CharactersAnimation />
      <MessageDisplay />
    </div>
  );
}
