import { db } from "../config/db";

const sampleTasks = [
  {
    title: "Setup project structure",
    description: "Organize backend and frontend folders",
    completed: false,
  },
  {
    title: "Build task API",
    description: "Create CRUD endpoints for tasks",
    completed: true,
  },
  {
    title: "Connect frontend",
    description: "Integrate React with Express API",
    completed: false,
  },
  {
    title: "Connect frontend",
    description: "Integrated Forms ",
    completed: true,
  },
  {
    title: "Add authentication",
    description: "Implement JWT auth system",
    completed: false,
  },
];

export const seedTasks = async () => {
  try {
    console.log("🌱 Seeding tasks...");

    // optional: clear existing data
    await db.query(`DELETE FROM tasks`);

    for (const task of sampleTasks) {
      await db.query(
        `
        INSERT INTO tasks (title, description, completed)
        VALUES ($1, $2, $3)
        `,
        [task.title, task.description, task.completed],
      );
    }

    console.log("✅ Seeding complete");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    process.exit();
  }
};

// run directly
seedTasks();
