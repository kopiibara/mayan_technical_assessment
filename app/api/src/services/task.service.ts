import { db } from "../config/db";

type CreateTaskDto = {
  title: string;
  description?: string;
};

type UpdateTaskDto = {
  title?: string;
  description?: string;
};

export const getTasksService = async (search?: string, status?: string) => {
  try {
    let query = `
      SELECT *
      FROM tasks
      WHERE 1=1
    `;

    const values: any[] = [];

    const safeSearch = typeof search === "string" ? search.trim() : "";
    const safeStatus = typeof status === "string" ? status : "all";

    if (safeSearch) {
      values.push(`%${safeSearch}%`);
      query += ` AND LOWER(title) LIKE LOWER($${values.length})`;
    }

    if (safeStatus === "completed") {
      query += ` AND completed = true`;
    } else if (safeStatus === "active") {
      query += ` AND completed = false`;
    }

    query += ` ORDER BY created_at DESC`;

    const result = await db.query(query, values);
    return result.rows;
  } catch (err) {
    console.error("🔥 GET_TASKS_SERVICE_ERROR:", err);
    console.log("SEARCH:", search);
    console.log("STATUS:", status);
    throw err;
  }
};

export const createTaskService = async (data: CreateTaskDto) => {
  const result = await db.query(
    `
      INSERT INTO tasks (
        title,
        description
      )
      VALUES ($1, $2)
      RETURNING *
    `,
    [data.title, data.description || null],
  );

  return result.rows[0];
};

export const updateTaskService = async (id: string, data: UpdateTaskDto) => {
  const result = await db.query(
    `
      UPDATE tasks
      SET
        title = $1,
        description = $2,
        updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `,
    [data.title, data.description || null, id],
  );

  return result.rows[0];
};

export const deleteTaskService = async (id: string) => {
  await db.query(
    `
      DELETE FROM tasks
      WHERE id = $1
    `,
    [id],
  );
};

export const toggleTaskService = async (id: string) => {
  const result = await db.query(
    `
      UPDATE tasks
      SET
        completed = NOT completed,
        updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );

  return result.rows[0];
};
