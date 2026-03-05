"use client";

import { useVoice } from "../hooks/useVoice";
import { useTaskStore } from "../lib/store";
import { Mic, MicOff, Trash2 } from "lucide-react";

export default function Home() {
  const { tasks, addTask, removeTask } = useTaskStore();

  const handleVoiceCommand = async (transcript: string) => {
    try {
      const res = await fetch("/api/actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript }),
      });

      const data = await res.json();

      if (data.action === "CREATE_TASK" && data.taskName) {
        addTask({ 
          name: data.taskName, 
          priority: data.priority || "medium" 
        });
      }
    } catch (error) {
      console.error("AI Action failed:", error);
    }
  }; // <--- Fixed: Function now closes correctly here

  const { isListening, startListening } = useVoice(handleVoiceCommand);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">Echo Pulse</h1>
      
      <button 
        onClick={startListening}
        className={`p-6 rounded-full transition-all duration-300 ${
          isListening ? "bg-red-500 animate-pulse scale-110" : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        {isListening ? <MicOff size={32} /> : <Mic size={32} />}
      </button>

      <p className="mt-4 text-slate-400">
        {isListening ? "Listening..." : "Click to speak (e.g., 'Add a high priority task')"}
      </p>

      <div className="mt-12 w-full max-w-md space-y-4">
        {tasks.map((task: any) => (
          <div key={task.id} className="bg-slate-900 p-4 rounded-lg flex justify-between items-center border border-slate-800">
            <div>
              <p className="font-medium">{task.name}</p>
              <span className={`text-xs uppercase font-bold ${
                task.priority === 'high' ? 'text-red-400' : task.priority === 'low' ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {task.priority}
              </span>
            </div>
            <button 
              onClick={() => removeTask(task.id)} 
              className="text-slate-500 hover:text-red-400 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}


