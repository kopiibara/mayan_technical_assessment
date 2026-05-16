"use client";

import { Input } from "@/components/ui/input";

import { useTaskStore } from "@/store/useTaskStore";
import { parseTaskQuery } from "@/lib/parseTaskQuery";

export default function TaskSearch() {
  const { search, setSearch, setStatus, fetchTasks } = useTaskStore();

  return (
    <Input
      value={search}
      onChange={(e) => {
        const value = e.target.value;

        setSearch(value);

        const parsed = parseTaskQuery(value);

        setStatus(parsed.status);
        fetchTasks(parsed);
      }}
      placeholder="Search tasks..."
    />
  );
}
