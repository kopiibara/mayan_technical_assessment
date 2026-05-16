"use client";

import { Button } from "@/components/ui/button";

import { useTaskStore } from "@/store/useTaskStore";

const filters = ["all", "active", "completed"] as const;

export default function TaskFilter() {
  const { status, setStatus, fetchTasks } = useTaskStore();

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={status === filter ? "default" : "outline"}
          onClick={() => {
            setStatus(filter);

            fetchTasks();
          }}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}
