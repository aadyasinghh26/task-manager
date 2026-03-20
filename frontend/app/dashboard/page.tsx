"use client";

import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ FETCH TASKS
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error("Error fetching tasks:", data);
        setTasks([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setTasks([]);
    }
  };

  // ✅ ADD TASK
  const addTask = async () => {
    if (!title) return;

    setLoading(true);

    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    await fetchTasks();

    setLoading(false);
  };

  // ✅ LOAD ON START
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  } else {
    const loadTasks = async () => {
      await fetchTasks();
    };

    loadTasks();
  }
}, []);

  // ✅ DELETE
  const deleteTask = async (id: string) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();
  };

  // ✅ TOGGLE
  const toggleTask = async (id: string) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl w-full max-w-md shadow-2xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Task Manager</h1>

          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            Logout
          </button>
        </div>

        {/* INPUT */}
        <div className="flex gap-2 mb-4">
          <input
            className="p-2 text-black bg-white flex-1 rounded focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter new task..."
          />

          <button
            onClick={addTask}
            disabled={loading}
            className={`px-4 rounded ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {/* TASK LIST */}
        {tasks.length === 0 ? (
          <p className="text-center text-gray-400">
            No tasks yet 🚀
          </p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-gray-800 p-2 rounded"
              >
                <span
                  className={
                    task.completed ? "line-through text-gray-400" : ""
                  }
                >
                  {task.title}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="bg-green-500 px-2 py-1 rounded hover:bg-green-600 text-sm"
                  >
                    ✓
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}