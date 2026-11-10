import express from "express";

const router = express.Router();

let adherents = [
    { id: 1, nom: "Salma", email: "salma@exemple.ma" },
    { id: 2, nom: "Yassine", email: "yassine@exemple.ma" }
];

// GET /adherents
router.get("/", (req, res) => {
    res.json(adherents);
});

// POST /adherents
router.post("/", (req, res) => {
    let nom = req.body.nom;
    let email = req.body.email;

    if (!nom || !email) {
        return res.status(400).send("Nom et email obligatoires");
    }

    let adherent = {
        id: adherents.length + 1,
        nom: nom,
        email: email
    };

    adherents.push(adherent);

    res.status(201).json(adherent);
});

export { adherents };
export default router;