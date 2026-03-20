import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#FAFAF7",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Left blue border */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 5,
            height: 630,
            background: "#1D4ED8",
          }}
        />

        {/* THE LIVING LIBRARY pill */}
        <div
          style={{
            position: "absolute",
            left: 85,
            top: 50,
            width: 312,
            height: 46,
            borderRadius: 9,
            background: "#EFF6FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 19,
              color: "#1D4ED8",
              letterSpacing: 3.5,
            }}
          >
            THE LIVING LIBRARY
          </span>
        </div>

        {/* Logo */}
        <div
          style={{
            position: "absolute",
            left: 85,
            top: 144,
            display: "flex",
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 120,
              letterSpacing: -3.5,
              color: "#111827",
            }}
          >
            Biblioth
          </span>
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 120,
              letterSpacing: -3.5,
              color: "#1D4ED8",
            }}
          >
            è
          </span>
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 120,
              letterSpacing: -3.5,
              color: "#111827",
            }}
          >
            que
          </span>
        </div>

        {/* Horizontal rule */}
        <div
          style={{
            position: "absolute",
            left: 85,
            top: 280,
            width: 1033,
            height: 1,
            background: "#D1D5DB",
          }}
        />

        {/* Description pill */}
        <div
          style={{
            position: "absolute",
            left: 85,
            top: 308,
            width: 545,
            height: 46,
            borderRadius: 9,
            background: "#EFF6FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 27,
              color: "#1E40AF",
            }}
          >
            Interactive books, articles, news, and wikis.
          </span>
        </div>

        {/* Tagline line 1 */}
        <div
          style={{
            position: "absolute",
            left: 85,
            top: 395,
            display: "flex",
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 42,
              color: "#111827",
            }}
          >
            You read the book.
          </span>
        </div>

        {/* Tagline line 2 */}
        <div
          style={{
            position: "absolute",
            left: 85,
            top: 451,
            display: "flex",
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 42,
              color: "#1D4ED8",
            }}
          >
            And the book reads you.
          </span>
        </div>

        {/* URL pill */}
        <div
          style={{
            position: "absolute",
            left: 85,
            top: 536,
            width: 230,
            height: 46,
            borderRadius: 9,
            background: "#1D4ED8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 19,
              color: "#ffffff",
            }}
          >
            bibliotheque.ai
          </span>
        </div>

        {/* Color dots bottom right */}
        {[
          "#0891B2",
          "#DC2626",
          "#7C3AED",
          "#F59E0B",
          "#10B981",
          "#1D4ED8",
        ].map((color, i) => (
          <div
            key={color}
            style={{
              position: "absolute",
              right: 86 + i * 30,
              top: 543,
              width: 18,
              height: 18,
              borderRadius: 4,
              background: color,
            }}
          />
        ))}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
