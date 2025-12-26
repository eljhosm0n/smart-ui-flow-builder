export default function DraggableNode({
  node,
  onMove,
  onSelect,
  selected,
  preview,
  running,
}) {
  const onMouseDown = (e) => {
    if (preview || running) return;
    e.stopPropagation();

    const startX = e.clientX - node.x;
    const startY = e.clientY - node.y;

    const onMouseMove = (e) => {
      onMove(e.clientX - startX, e.clientY - startY);
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const typeStyles = {
    start: "bg-green-600",
    process: "bg-blue-600",
    decision: "bg-yellow-600 text-black",
    end: "bg-red-600",
  };

  return (
    <div
      onMouseDown={onMouseDown}
      onClick={onSelect}
      className={`absolute px-4 py-2 rounded select-none cursor-pointer transition
        ${
          running
            ? "ring-4 ring-green-400 scale-105"
            : selected
            ? "ring-2 ring-white"
            : ""
        }
        ${typeStyles[node.type] || "bg-gray-800"}
      `}
      style={{ left: node.x, top: node.y }}
    >
      <div className="text-xs opacity-80 mb-1">
        {node.type?.toUpperCase()}
      </div>
      <div className="font-medium">{node.label}</div>
    </div>
  );
}
