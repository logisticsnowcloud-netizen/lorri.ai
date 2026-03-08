const nodes = [
  { x: 72, y: 15 }, { x: 88, y: 40 }, { x: 94, y: 68 }, { x: 80, y: 87 },
  { x: 62, y: 72 }, { x: 70, y: 50 }, { x: 84, y: 60 }, { x: 96, y: 28 },
  { x: 74, y: 33 }, { x: 87, y: 80 },
];
const lines: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,1],[7,0],[7,1],[8,5],[8,6],[9,3],[9,4],[6,2],[5,8],
];

export default function NetworkBg() {
  return (
    <svg className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
      {lines.map(([a, b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="hsl(246 44% 36% / 0.4)" strokeWidth="0.3" />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i === 0 || i === 6 ? 0.9 : 0.55}
          fill={i % 3 === 0 ? "#393185" : i % 3 === 1 ? "#1AA6DF" : "#54AF3A"}
          opacity="0.7"
          style={{ animation: `nodeGlow ${2 + i * 0.4}s ${i * 0.3}s ease-in-out infinite` }}
        />
      ))}
    </svg>
  );
}
