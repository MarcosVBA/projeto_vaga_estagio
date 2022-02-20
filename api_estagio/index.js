const app = require("express")();
const cors = require("cors");
const PORT = process.env.npm_config_PORT || 8080;
const chart_one = require("./json/chart_one.json");
const chart_two = require("./json/chart_two.json");

app.use(cors());

app.get("/rota1", (req, res) => {
  res.status(200).json(chart_one);
});

app.get("/rota2", (req, res) => {
  res.status(200).json(chart_two);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando no endereço: localhost:${PORT}`);
});
