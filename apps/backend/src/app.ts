import express from "express";
import { z } from "zod";

const app = express();

const querySchema = z.object({
  name: z.string(),
});

const counter: { [key: string]: number } = {};

app.get("/count", (req, res) => {
  const validation = querySchema.safeParse(req.query);
  if (!validation.success) {
    res.status(400).json({ error: validation.error });
    return;
  }
  counter[validation.data.name] = (counter[validation.data.name] || 0) + 1;

  res.status(200).json({ message: { name: counter[validation.data.name] } });
  return;
});

export { app };
