"use client";

import { useState, useRef } from "react";
import { Download, Share2, QrCode } from "lucide-react";
import { motion } from "motion/react";

interface MemberCardDisplayProps {
  name: string;
  role: string;
  division?: string;
  batch?: string;
  memberId?: string;
  avatarUrl?: string;
  skills?: string[];
}

/**
 * MemberCardDisplay
 * Kartu digital anggota PUPCL yang keren dan interaktif.
 * Warna solid President University Blue & Crimson Red, tanpa gradasi.
 * Fitur: 3D tilt on hover, download, share.
 */
export function MemberCardDisplay({
  name = "M. Rizal Basri",
  role = "Chairman",
  division = "Leadership",
  batch = "Class of 2024",
  memberId = "PUPCL-2024-001",
  avatarUrl,
  skills = ["Next.js", "TypeScript", "React"],
}: MemberCardDisplayProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovering(false);
  };

  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hovering ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: "preserve-3d", perspective: 800 }}
        className="cursor-pointer select-none"
      >
        {/* Physical card body */}
        <div
          style={{
            width: "340px",
            height: "210px",
            borderRadius: "16px",
            backgroundColor: "#0047BA",
            position: "relative",
            overflow: "hidden",
            boxShadow: hovering
              ? "0 24px 48px rgba(0,71,186,0.4)"
              : "0 12px 32px rgba(0,71,186,0.25)",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {/* Top accent strip */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "5px",
              backgroundColor: "#E31B23",
            }}
          />

          {/* Dot pattern — purely decorative */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          {/* Top section: logo + badge */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "20px",
              right: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/codelab-mark.svg" alt="" width="24" height="24" />
              </div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "1.5px",
                  color: "white",
                  opacity: 0.9,
                }}
              >
                PUPCL MEMBER CARD
              </span>
            </div>
            {/* Chip decoration */}
            <div
              style={{
                width: "32px",
                height: "24px",
                borderRadius: "5px",
                backgroundColor: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            />
          </div>

          {/* Avatar */}
          <div
            style={{
              position: "absolute",
              left: "20px",
              top: "56px",
            }}
          >
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={name}
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  border: "3px solid rgba(255,255,255,0.4)",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "#E31B23",
                  border: "3px solid rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "white",
                }}
              >
                {initials}
              </div>
            )}
          </div>

          {/* Name & role */}
          <div
            style={{
              position: "absolute",
              left: "88px",
              top: "56px",
              right: "20px",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.2,
              }}
            >
              {name}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.75)",
                marginTop: "3px",
                fontWeight: 600,
              }}
            >
              {role} · {division}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.55)",
                marginTop: "2px",
              }}
            >
              {batch}
            </div>
          </div>

          {/* Skills badges */}
          <div
            style={{
              position: "absolute",
              left: "20px",
              bottom: "36px",
              display: "flex",
              gap: "5px",
              flexWrap: "wrap",
              maxWidth: "200px",
            }}
          >
            {skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  padding: "2px 7px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Bottom: member ID */}
          <div
            style={{
              position: "absolute",
              left: "20px",
              right: "20px",
              bottom: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "1px",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "monospace",
              }}
            >
              #{memberId}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                }}
              />
              <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
                ACTIVE MEMBER
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border"
          style={{
            borderColor: "#0047BA",
            color: "#0047BA",
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0047BA";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#0047BA";
          }}
        >
          <Download size={15} />
          Download Card
        </button>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border"
          style={{
            borderColor: "var(--gray-6)",
            color: "var(--gray-11)",
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--gray-9)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--gray-6)";
          }}
        >
          <Share2 size={15} />
          Share
        </button>
      </div>

      {/* QR code hint */}
      <div
        className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400"
      >
        <QrCode size={14} />
        <span>Scan QR Code untuk verifikasi keanggotaan</span>
      </div>
    </div>
  );
}
