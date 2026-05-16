import { create } from "zustand";
import { api } from "@/services/api";
import { Task } from "@/types/task";

type FilterStatus = "all" | "active" | "completed";

type CreateTaskDto = {
  title: string;
  description?: string;
};

let requestId = 0;

type TaskStore = {
  tasks: Task[];
  loading: boolean;
  search: string;
  status: FilterStatus;

  editingTask: Task | null;

  fetchTasks: (params?: {
    search?: string;
    status?: FilterStatus;
  }) => Promise<void>;

  createTask: (data: CreateTaskDto) => Promise<void>;
  updateTask: (id: string, data: CreateTaskDto) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;

  setSearch: (value: string) => void;
  setStatus: (value: FilterStatus) => void;

  setEditingTask: (task: Task | null) => void;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  search: "",
  status: "all",

  editingTask: null,

  setSearch: (value) => set({ search: value }),
  setStatus: (value) => set({ status: value }),

  setEditingTask: (task) => set({ editingTask: task }),

  fetchTasks: async (params) => {
    const currentRequest = ++requestId;

    set({ loading: true });

    try {
      const state = get();

      const search = params?.search ?? state.search;
      const status = params?.status ?? state.status;

      const response = await api.get("/tasks", {
        params: { search, status },
      });

      if (currentRequest !== requestId) return;

      set({ tasks: response.data });
    } finally {
      set({ loading: false });
    }
  },

  createTask: async (data) => {
    const title = data.title?.trim();
    if (!title) return;

    await api.post("/tasks", {
      title,
      description: data.description?.trim() || null,
    });

    await get().fetchTasks();
  },

  updateTask: async (id, data) => {
    await api.patch(`/tasks/${id}`, data);
    await get().fetchTasks();
  },

  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
    await get().fetchTasks();
  },

  toggleTask: async (id) => {
    await api.patch(`/tasks/${id}/toggle`);
    await get().fetchTasks();
  },
}));
