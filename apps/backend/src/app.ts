import express from "express";
import { z } from "zod";
import cors from "cors";

const app = express();
app.use(
	cors({
		origin: "*",
	}),
);

const querySchema = z.object({
	name: z.string().optional(),
});

const counter: { [key: string]: number } = {};

app.get("/count", (req, res) => {
	const validation = querySchema.safeParse(req.query);
	if (!validation.success) {
		res.status(400).json({ error: validation.error });
		return;
	}
	if (validation.data.name) {
		res
			.status(201)
			.json({ message: { name: counter[validation.data.name] || 0 } });
		return;
	}
	res.status(201).json({ message: counter });
	return;
});

app.post("/count", (req, res) => {
	const validation = querySchema.safeParse(req.query);
	if (!validation.success) {
		res.status(400).json({ error: validation.error });
		return;
	}
	if (!validation.data.name) {
		res
			.status(400)
			.json({ error: "Name is not added we need it to increase a key" });
		return;
	}
	counter[validation.data.name] = (counter[validation.data.name] || 0) + 1;
	res.status(201).json({ message: { name: counter[validation.data.name] } });
	return;
});

export { app };
