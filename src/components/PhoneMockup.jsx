import { useEffect, useState } from "react";

export default function PhoneMockup({ color = "#00e5ff", label = "App" }) {
  const [now, setNow] = useState(new Date());

  const screens = {
    "#00e5ff": {
      bg: "linear-gradient(180deg, #0a1628 0%, #0d1f3c 100%)",
      bars: ["#00e5ff", "#7c4dff", "#00ff88"],
      title: "Soul33",
      subtitle: "Today's Meditation",
    },
    "#7c4dff": {
      bg: "linear-gradient(180deg, #0f0a28 0%, #1a0f3c 100%)",
      bars: ["#7c4dff", "#ff6b35", "#00e5ff"],
      title: "Yoke",
      subtitle: "Live Stream",
    },
    "#ff6b35": {
      bg: "linear-gradient(180deg, #1a0a00 0%, #2d1200 100%)",
      bars: ["#ff6b35", "#00e5ff", "#7c4dff"],
      title: "Barva",
      subtitle: "AR Try-On",
    },
    "#00ff88": {
      bg: "linear-gradient(180deg, #001a0f 0%, #002d1f 100%)",
      bars: ["#00ff88", "#7c4dff", "#ff6b35"],
      title: "Culture",
      subtitle: "Card Game",
    },
  };

  const s = screens[color] || screens["#00e5ff"];

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const date = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="phone-frame" style={{ flexShrink: 0 }}>
      {/* Screen content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: s.bg,
          display: "flex",
          flexDirection: "column",
          padding: "48px 16px 20px",
        }}
      >
        {/* Status bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 6,
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {time}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 7,
                color: "rgba(255,255,255,0.3)",
              }}
            >
              {date}
            </span>
          </div>

          <div style={{ display: "flex", gap: 4 }}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 50,
                  background: s.bars[i],
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        </div>

        {/* App content */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 11,
            color: color,
            marginBottom: 4,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {s.title}
        </div>

        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            fontWeight: 600,
            color: "white",
            marginBottom: 16,
          }}
        >
          {s.subtitle}
        </div>

        {/* Visual blocks */}
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}
        >
          <div
            style={{
              height: 80,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${color}22, ${color}08)`,
              border: `1px solid ${color}22`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: color,
                opacity: 0.6,
              }}
            />
          </div>

          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              style={{
                height: 40,
                borderRadius: 10,
                background: `rgba(255,255,255,0.04)`,
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  background: s.bars[i % 3],
                  opacity: 0.4,
                }}
              />

              <div
                style={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.1)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            paddingTop: 12,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            marginTop: 12,
          }}
        >
          {s.bars.map((c, i) => (
            <div
              key={i}
              style={{
                width: 24,
                height: 24,
                borderRadius: 8,
                background: c,
                opacity: i === 0 ? 0.9 : 0.25,
              }}
            />
          ))}
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 8,
              background: "rgba(255,255,255,0.15)",
            }}
          />
        </div>
      </div>

      {/* Glare */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: "50%",
          bottom: 0,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
