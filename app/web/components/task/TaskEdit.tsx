"use client";

import { useEffect, useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TaskEditModal() {
  const { editingTask, setEditingTask, updateTask } = useTaskStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
    }
  }, [editingTask]);

  const isOpen = !!editingTask;

  return (
    <Dialog open={isOpen} onOpenChange={() => setEditingTask(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setEditingTask(null)}>
              Cancel
            </Button>

            <Button
              onClick={async () => {
                if (!editingTask) return;

                await updateTask(editingTask.id, {
                  title,
                  description,
                });

                setEditingTask(null);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
