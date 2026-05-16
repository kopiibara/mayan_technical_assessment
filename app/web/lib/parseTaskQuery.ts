type ParsedTaskQuery = {
  search: string;
  status: "all" | "active" | "completed";
};

export const parseTaskQuery = (input: string): ParsedTaskQuery => {
  const raw = input.toLowerCase();

  let status: "all" | "active" | "completed" = "all";

  if (raw.includes("completed")) status = "completed";
  else if (raw.includes("active")) status = "active";

  const search = input.replace(/completed|active/gi, "").trim();

  return {
    search,
    status,
  };
};
