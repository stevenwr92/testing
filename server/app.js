const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const midtransClient = require("midtrans-client");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log("start di port", port);
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "oke sudah masuk",
  });
});

app.post("/checkout", async (req, res) => {
  try {
    const order = req.body.order;
    const gross = req.body.gross;

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-degeBoSA2XjP6Yf9u6u8wMLL",
    });

    let parameter = {
      transaction_details: {
        order_id: order,
        gross_amount: gross,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: "hahahaha",
        last_name: "",
        email: "test@mail.com",
        phone: "087777777",
      },
    };
    snap.createTransaction(parameter).then((transaction) => {
      res.status(201).json(transaction);
    });
  } catch (err) {
    console.log(err);
  }
});
