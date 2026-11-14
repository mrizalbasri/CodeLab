import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "President University Pekanbaru Code Lab";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#09090b",
          color: "#fafafa",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 71, 186, 0.45) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Top badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              backgroundColor: "#0047BA",
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            P
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.5px" }}>
              PUPCL
            </span>
            <span style={{ fontSize: "14px", color: "#a1a1aa" }}>
              President University Pekanbaru
            </span>
          </div>
        </div>

        {/* Center content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            zIndex: 1,
            maxWidth: "900px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "9999px",
              backgroundColor: "rgba(0, 71, 186, 0.2)",
              border: "1px solid rgba(0, 71, 186, 0.4)",
              color: "#93c5fd",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Student Tech & Coding Community
          </div>
          <h1
            style={{
              fontSize: "54px",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              margin: 0,
            }}
          >
            Where Passionate Coders Build Real Impact.
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "#a1a1aa",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            Workshops, collaborative real-world projects, hackathon squad, and tech mentorship.
          </p>
        </div>

        {/* Bottom footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            zIndex: 1,
          }}
        >
          <span style={{ fontSize: "16px", color: "#71717a" }}>
            President University Pekanbaru Code Lab
          </span>
          <span style={{ fontSize: "16px", color: "#60a5fa", fontWeight: 600 }}>
            codelab-five.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
