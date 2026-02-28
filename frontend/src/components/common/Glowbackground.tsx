const GlowBackground = ({ gridSize = "40px", glowWidth = "500px", glowHeight = "500px" }) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.08) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize} ${gridSize}`,
        }}
        className="absolute inset-0 opacity-40"
      />

      <div
        style={{ width: glowWidth, height: glowHeight }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--primary)/0.2)] blur-[150px]"
      />
    </>
  );
};

export default GlowBackground;