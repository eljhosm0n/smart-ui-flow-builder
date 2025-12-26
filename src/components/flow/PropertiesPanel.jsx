export default function PropertiesPanel({ node, onChange }) {
  if (!node) {
    return (
      <aside className="w-72 bg-neutral-900 border-l border-neutral-800 p-4 text-neutral-500 text-sm">
        Select a node
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-neutral-900 border-l border-neutral-800 p-4">
      <h3 className="text-white font-semibold mb-4">Properties</h3>

      <label className="text-xs text-neutral-400">Text</label>
      <input
        value={node.data.text}
        onChange={(e) => onChange({ text: e.target.value })}
        className="w-full mt-1 rounded bg-neutral-800 border border-neutral-700 px-2 py-1 text-sm text-white"
      />
    </aside>
  );
}
