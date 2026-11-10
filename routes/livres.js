import express from "express";

const router = express.Router();

let livres = [
    { id: 1, titre: "Le Petit Prince", auteur: "Saint-Exupéry", disponible: true },
    { id: 2, titre: "Nedjma", auteur: "Kateb Yacine", disponible: true },
    { id: 3, titre: "L'Alchimiste", auteur: "Paulo Coelho", disponible: true }
];

// GET /livres
router.get("/", (req, res) => {
    res.json(livres);
});

// GET /livres/:id
router.get("/:id", (req, res) => {
    let id = Number(req.params.id);
    let livre = livres.find(l => l.id === id);

    if (!livre) {
        return res.status(404).send("Livre introuvable");
    }

    res.json(livre);
});

// POST /livres
router.post("/", (req, res) => {
    let titre = req.body.titre;
    let auteur = req.body.auteur;

    if (!titre || !auteur) {
        return res.status(400).send("Titre et auteur obligatoires");
    }

    let livre = {
        id: livres.length + 1,
        titre: titre,
        auteur: auteur,
        disponible: true
    };

    livres.push(livre);

    res.status(201).json(livre);
});

// PATCH /livres/:id
router.patch("/:id", (req, res) => {
    let id = Number(req.params.id);
    let livre = livres.find(l => l.id === id);

    if (!livre) {
        return res.status(404).send("Livre introuvable");
    }

    if (req.body.titre) {
        livre.titre = req.body.titre;
    }

    if (req.body.auteur) {
        livre.auteur = req.body.auteur;
    }

    res.json(livre);
});

// DELETE /livres/:id
router.delete("/:id", (req, res) => {
    let id = Number(req.params.id);
    let livre = livres.find(l => l.id === id);

    if (!livre) {
        return res.status(404).send("Livre introuvable");
    }

    livres.splice(livres.indexOf(livre), 1);

    res.status(204).send();
});

export { livres };
export default router;