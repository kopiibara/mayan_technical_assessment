"use client";

import { useEffect } from "react";

import { useTaskStore } from "@/store/useTaskStore";

import TaskDialog from "@/components/task/TaskDialog";
import TaskSearch from "@/components/task/TaskSearch";
import TaskFilter from "@/components/task/TaskFilter";
import TaskCard from "@/components/task/TaskCard";

export default function HomePage() {
  const { tasks, fetchTasks, loading } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="mx-auto w-[95vw] md:w-[80vw] lg:w-[70vw] p-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Task Manager</h1>

        <TaskDialog />
      </div>

      <div className="mb-6 space-y-4">
        <TaskSearch />

        <TaskFilter />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </main>
  );
}
