"use client";

import { motion } from "framer-motion";

import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";

import { Task } from "@/types/task";

import { useTaskStore } from "@/store/useTaskStore";

import { toast } from "sonner";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  const { deleteTask, toggleTask } = useTaskStore();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className=" border p-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={async () => {
              await toggleTask(task.id);

              toast.success("Task updated");
            }}
          />

          <div>
            <h2 className={task.completed ? "line-through" : ""}>
              {task.title}
            </h2>

            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>
        </div>

        <Button
          variant="destructive"
          size="sm"
          onClick={async () => {
            await deleteTask(task.id);

            toast.success("Task deleted");
          }}
        >
          Delete
        </Button>
      </div>
    </motion.div>
  );
}
