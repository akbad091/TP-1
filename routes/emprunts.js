import express from "express";
import { livres } from "./livres.js";
import { adherents } from "./adherents.js";

const router = express.Router();

let emprunts = [];

// GET /emprunts
router.get("/", (req, res) => {
    res.json(emprunts);
});

// POST /emprunts
router.post("/", (req, res) => {
    let livreId = Number(req.body.livreId);
    let adherentId = Number(req.body.adherentId);

    let livre = livres.find(l => l.id === livreId);
    let adherent = adherents.find(a => a.id === adherentId);

    if (!livre || !adherent) {
        return res.status(404).send("Livre ou adherent introuvable");
    }

    if (livre.disponible === false) {
        return res.status(400).send("Livre non disponible");
    }

    let emprunt = {
        id: emprunts.length + 1,
        livreId: livreId,
        adherentId: adherentId
    };

    emprunts.push(emprunt);

    livre.disponible = false;

    res.status(201).json(emprunt);
});

export default router;