import { useState } from "react";
import DraggableNode from "./DraggableNode";

const STORAGE_KEY = "smart-ui-flow";

export default function FlowCanvas() {
  const [nodes, setNodes] = useState([
    { id: 1, x: 400, y: 200, label: "Inicio", type: "start" },
    { id: 2, x: 650, y: 320, label: "Proceso", type: "process" },
  ]);

  const [connections, setConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [preview, setPreview] = useState(false);
  const [runningNode, setRunningNode] = useState(null);
  const [message, setMessage] = useState(null);

  /* ================= FEEDBACK ================= */
  const notify = (text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 2500);
  };

  /* ================= DRAG NODE ================= */
  const moveNode = (id, x, y) => {
    if (preview || runningNode) return;
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, x, y } : n))
    );
  };

  /* ================= DROP FROM SIDEBAR ================= */
  const onDrop = (e) => {
    if (preview || runningNode) return;
    e.preventDefault();
    const type = e.dataTransfer.getData("application/node-type");
    if (!type) return;

    const rect = e.currentTarget.getBoundingClientRect();

    setNodes((prev) => [
      ...prev,
      {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        label: "Nuevo Nodo",
        type,
      },
    ]);
  };

  const onDragOver = (e) => !preview && e.preventDefault();

  /* ================= CONNECT ================= */
  const handleSelect = (id) => {
    if (preview || runningNode) return;

    if (selectedNode === null) {
      setSelectedNode(id);
    } else if (selectedNode !== id) {
      setConnections((prev) => [
        ...prev,
        { from: selectedNode, to: id },
      ]);
      setSelectedNode(null);
    }
  };

  const removeConnection = (index) => {
    if (preview || runningNode) return;
    setConnections((prev) => prev.filter((_, i) => i !== index));
  };

  /* ================= SAVE / LOAD ================= */
  const saveFlow = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ nodes, connections })
    );
    notify("Flujo guardado", "success");
  };

  const loadFlow = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return notify("No hay flujo guardado", "error");

    const parsed = JSON.parse(data);
    setNodes(parsed.nodes || []);
    setConnections(parsed.connections || []);
    notify("Flujo cargado", "success");
  };

  /* ================= RUN FLOW ================= */
  const runFlow = async () => {
    if (nodes.length === 0) {
      notify("No hay nodos", "error");
      return;
    }

    const start = nodes.find(
      (n) => !connections.some((c) => c.to === n.id)
    );

    if (!start) {
      notify("No se encontró nodo inicial", "error");
      return;
    }

    setPreview(true);
    setRunningNode(start.id);

    let current = start;

    while (current) {
      setRunningNode(current.id);
      await new Promise((r) => setTimeout(r, 900));

      const nextConn = connections.find((c) => c.from === current.id);
      if (!nextConn) break;

      current = nodes.find((n) => n.id === nextConn.to);
    }

    setRunningNode(null);
    notify("Ejecución finalizada", "success");
  };

  /* ================= HELPERS ================= */
  const center = (node) => ({
    x: node.x + 60,
    y: node.y + 20,
  });

  return (
    <div
      className="relative flex-1 bg-gradient-to-br from-gray-950 to-gray-900 overflow-hidden"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {/* ================= MESSAGE ================= */}
      {message && (
        <div
          className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded
            ${
              message.type === "success"
                ? "bg-green-600"
                : message.type === "error"
                ? "bg-red-600"
                : "bg-blue-600"
            }`}
        >
          {message.text}
        </div>
      )}

      {/* ================= ACTIONS ================= */}
      <div className="absolute top-4 right-4 z-40 flex gap-2">
        <button onClick={runFlow} className="px-3 py-1 bg-green-600 rounded">
          ▶ Ejecutar
        </button>
        <button onClick={saveFlow} className="px-3 py-1 bg-indigo-600 rounded">
          Guardar
        </button>
        <button onClick={loadFlow} className="px-3 py-1 bg-blue-600 rounded">
          Cargar
        </button>
        <button
          onClick={() => setPreview((p) => !p)}
          className="px-3 py-1 bg-purple-600 rounded"
        >
          Preview
        </button>
      </div>

      {/* ================= SVG CONNECTIONS ================= */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
          </marker>
        </defs>

        {connections.map((c, i) => {
          const from = nodes.find((n) => n.id === c.from);
          const to = nodes.find((n) => n.id === c.to);
          if (!from || !to) return null;

          const a = center(from);
          const b = center(to);

          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#3b82f6"
              strokeWidth="2"
              markerEnd="url(#arrow)"
              className="pointer-events-auto cursor-pointer"
              onClick={() => removeConnection(i)}
            />
          );
        })}
      </svg>

      {/* ================= NODES ================= */}
      {nodes.map((node) => (
        <DraggableNode
          key={node.id}
          node={node}
          selected={selectedNode === node.id}
          running={runningNode === node.id}
          onMove={(x, y) => moveNode(node.id, x, y)}
          onSelect={() => handleSelect(node.id)}
          preview={preview}
        />
      ))}
    </div>
  );
}
