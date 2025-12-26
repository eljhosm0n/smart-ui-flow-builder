import Sidebar from "../components/layout/Sidebar";
import FlowCanvas from "../components/flow/Flowcanvas";

export default function Builder() {
  return (
    <div className="h-screen bg-zinc-950 text-white flex overflow-hidden">
      <Sidebar />
      <FlowCanvas />
    </div>
  );
}
