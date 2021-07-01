// Importações necessárias
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Seta as configurações do CORS. No caso, especifica que apenas conexões de tal endereço serão aceitas. Ver: // https://expressjs.com/en/resources/middleware/cors.html
var corsOptions = {
  origin: "https://guilhermesigoli-crudtc2.vercel.app"
};

// Ativa a configuração CORS
app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Parseia requisições do tipo JSON - application/json
app.use(bodyParser.json());

// Parseia também requisições do tipo HTML - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Uma rota, aceitando conexões na raiz e retornando um json simples
app.get("/", (req, res) => {
  res.json({ msg: "Está funcionando!" });
});

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch(err => {
    console.log("Não foi possível conectar ao banco de dados", err);
    process.exit();
  });

require("./app/routes/produto.routes")(app);
// "Executa" o servidor, escutando em uma porta específica.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor está executando na porta ${PORT}.`);
});