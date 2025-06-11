"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: "*",
}));
const querySchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
});
const counter = {};
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
