import Sidebar from "./Sidebar";
import FlowCanvas from "../flow/FlowCanvas";

export default function AppLayout() {
  return (
    <div className="flex h-screen w-screen bg-black text-white overflow-hidden">
      <Sidebar />
      <FlowCanvas />
    </div>
  );
}
