import { execSync } from "child_process";

export async function query<T>(sql: string): Promise<T[]> {
  const command = `team-db "${sql.replace(/"/g, '\\"')}"`;
  try {
    const output = execSync(command, { encoding: "utf8" });
    return JSON.parse(output);
  } catch (error) {
    console.error("Database query failed:", error);
    throw error;
  }
}

export async function execute(sql: string): Promise<void> {
  const command = `team-db "${sql.replace(/"/g, '\\"')}"`;
  try {
    execSync(command, { encoding: "utf8" });
  } catch (error) {
    console.error("Database execution failed:", error);
    throw error;
  }
}
