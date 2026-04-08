export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: "conic-gradient(#f5a623 0deg 180deg, #4a3fbf 180deg 360deg)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: size * 0.58,
          height: size * 0.58,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.28)",
        }}
      />
    </div>
  );
}