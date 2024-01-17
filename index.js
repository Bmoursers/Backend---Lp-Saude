const express = require("express");
const env = require('dotenv').config();
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
const port = process.env.PORT || 5000;



//comentarioß

app.use(express.json());
app.use(cors());

app.post("/enviar-email", async (req, res) => {
  const { nome, email, mensagem, areaAtuacao } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: "contas@bmouseproductions.com",
    to: ["jenifer@bmouseproductions.com", "benolopesdias@gmail.com"],
    subject: "Landing Page - Saúde Bmouse",
    html: `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Area de Atuação:</strong> ${areaAtuacao}</p>
        <p><strong>Mensagem:</strong> ${mensagem}</p>
      `,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`RODANDO NA PORTA ${port}`);
});
