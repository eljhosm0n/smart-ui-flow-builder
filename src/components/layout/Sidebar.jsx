export default function Sidebar() {
  const onDragStart = (e, type) => {
    e.dataTransfer.setData("application/node-type", type);
    e.dataTransfer.effectAllowed = "move";
  };

  const Item = ({ type, label, color }) => (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      className={`cursor-grab ${color} text-white text-sm py-2 px-3 rounded mb-2 text-center`}
    >
      {label}
    </div>
  );

  return (
    <aside className="w-56 bg-neutral-900 border-r border-neutral-800 p-4">
      <h3 className="text-sm text-neutral-400 mb-4">Componentes</h3>

      <Item type="start" label="▶ Inicio" color="bg-green-600" />
      <Item type="process" label="⚙ Proceso" color="bg-blue-600" />
      <Item type="decision" label="❓ Decisión" color="bg-yellow-600" />
      <Item type="end" label="⏹ Fin" color="bg-red-600" />
    </aside>
  );
}
