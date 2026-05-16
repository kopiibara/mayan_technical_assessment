"use client";

import { motion } from "framer-motion";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { Task } from "@/types/task";
import { useTaskStore } from "@/store/useTaskStore";

import { toast } from "sonner";
import { Ellipsis } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  const { deleteTask, toggleTask, setEditingTask } = useTaskStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border p-4 flex items-start justify-between"
    >
      {/* LEFT SIDE */}
      <div className="flex gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={async () => {
            await toggleTask(task.id);
            toast.success("Task updated");
          }}
        />

        <div>
          <h2 className={task.completed ? "line-through" : ""}>{task.title}</h2>

          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>
      </div>

      {/* RIGHT SIDE MENU */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditingTask(task)}>
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-500"
            onClick={async () => {
              await deleteTask(task.id);
              toast.success("Task deleted");
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}
