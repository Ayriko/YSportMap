import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 3000;

app.get("/", (req, res) => {
    fetch('https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?limit=10&offset=0&timezone=UTC&include_links=false&include_app_metas=false')
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(error => console.error('Error:', error));
});

app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
});