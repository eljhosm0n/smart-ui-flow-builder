export default function TextNode({ node }) {
  return (
    <div className="bg-neutral-800 text-white px-4 py-3 rounded-xl shadow-lg min-w-[150px]">
      <div className="text-xs text-neutral-400 mb-1">Text Node</div>
      <div className="text-sm">{node.label}</div>
    </div>
  );
}
