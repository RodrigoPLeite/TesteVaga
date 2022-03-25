const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "movporto",
});

app.use(cors());
app.use(express.json());

app.get("/container", (req, res) => {
     let SQL = "SELECT * FROM container co INNER JOIN movimentacaocontainer mc ON mc.clienteId = co.clienteId INNER JOIN clientes cl ON mc.clienteId = cl.id GROUP BY co.numerocontainer";
    //  console.log(SQL);
     db.query(SQL, (err, result) => {
         if(err) console.log(err);
         else res.send(result);
     });
 });

 app.get("/categoria/:categoria", (req, res) => {
    const { categoria } = req.params;
     let SQL = "SELECT * FROM container co INNER JOIN clientes cl ON cl.id = co.clienteId WHERE co.categoria = ? group by CO.NUMEROCONTAINER";
    //  console.log(SQL);
     db.query(SQL, categoria, (err, result) => {
         if(err) console.log(err);
         else res.send(result);
     });
 });

app.get("/totalMovimentacao", (req, res) => {
     let SQL = "SELECT count(tipoMovimentacao) AS qtd FROM `movimentacaocontainer` mc";
    //  console.log(SQL);
     db.query(SQL, (err, result) => {
         if(err) console.log(err);
         else res.send(result);
     });
 });

app.get("/agrupados/:cliente", (req, res) => {
    const { cliente } = req.params;
     let SQL = "SELECT * FROM movimentacaocontainer mc INNER JOIN container co ON co.clienteId = mc.clienteId INNER JOIN clientes cl ON cl.id = mc.clienteId WHERE mc.clienteId = ? GROUP BY co.numerocontainer";
    //  console.log(SQL);
     db.query(SQL, cliente, (err, result) => {
         if(err) console.log(err);
         else res.send(result);
     });
 });

app.get("/agrupadosMovimentacao/:tipomovimentacao", (req, res) => {
    const { tipomovimentacao } = req.params;
     let SQL = "SELECT * FROM movimentacaocontainer mc INNER JOIN container co ON co.clienteId = mc.clienteId INNER JOIN clientes cl ON cl.id = mc.clienteId WHERE mc.tipomovimentacao = ? GROUP BY co.numerocontainer ";
    //  console.log(SQL);
     db.query(SQL, tipomovimentacao, (err, result) => {
         if(err) console.log(err);
         else res.send(result);
     });
 });

app.get("/movimentacaocontainer/:clienteId/:tipoMovimentacao", (req, res) => {
    const { clienteId, tipoMovimentacao } = req.params;
     let SQL = "SELECT * FROM container c INNER JOIN movimentacaocontainer mc ON mc.clienteId = c.clienteId INNER JOIN clientes cl ON mc.clienteId = cl.id WHERE mc.clienteId = ? AND mc.tipoMovimentacao = ? GROUP BY c.numerocontainer";
    //  console.log(SQL);
     db.query(SQL, [clienteId, tipoMovimentacao], (err, result) => {
         if(err) console.log(err);
         else res.send(result);
     });
 });

app.get("/clientes", (req, res) => {
     let SQL = "SELECT * FROM clientes";
    //  console.log(SQL);
     db.query(SQL, (err, result) => {
         if(err) console.log(err);
         else res.send(result);
     });
 });

app.get("/clientes/:id/", (req, res) => {
    const { id } = req.params;
     let SQL = "SELECT * FROM clientes c WHERE id = ?";
    //  console.log(SQL);
     db.query(SQL, id, (err, result) => {
         if(err) console.log(err);
         else res.send(result);
     });
 });

 app.post("/gravar", (req, res) => {
     const { clienteId } = req.body;
     const { container } = req.body;
     const { tipo } = req.body;
     const { status } = req.body;
     const { categoria } = req.body;

     let SQL = "INSERT INTO movporto.container (clienteId, numeroContainer, tipo, status, categoria) VALUES (?, ?, ?, ?, ?)";
     db.query(SQL, [clienteId, container, tipo, status, categoria], (err, result) => {
     })
 })

 app.post("/gravarMovimentacao", (req, res) => {
     const { clienteId } = req.body;
     const { tipoMovimentacao } = req.body;
     const { dataInicio } = req.body;
     const { dataFim } = req.body;

     let SQL = "INSERT INTO movporto.movimentacaoContainer (clienteId, tipoMovimentacao, dataInicio, dataFim) VALUES (?, ?, ?, ?)";
     db.query(SQL, [clienteId, tipoMovimentacao, dataInicio, dataFim], (err, result) => {
     })
 })

app.listen(3001, () => {
     console.log("rodando servidor...")
 });