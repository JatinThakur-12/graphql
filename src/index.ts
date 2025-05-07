import { initServer } from "./app";

async function init() {
    const app = await initServer();
    const PORT = process.env.PORT || 8000;

    app.get("/", (req, res) => {
        console.log(req.body);
        res.json({ message: "Server is up and running", body: req.body });
    });

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

init();
