const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const User = require("../server/models/User");

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  "mongodb+srv://artshuren:kedbid-vatsaB-cozjy4@cluster0-gatgd.gcp.mongodb.net/test?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, db) => {
    var dbase = db.db("huureenarts");
    if (err) return console.log(err);
    app.listen(8080, () => {
      console.log(`app working on ${port}`);
    });

    router.get("/users", function(req, res) {
      dbase
        .collection("users")
        .find()
        .toArray((err, result) => {
          if (!err) return res.send(result);
        });
    });

    router.post("/user/signup", (req, res) => {
      const {
        voornaam,
        tussenvoegsel,
        achternaam,
        geboortedatum,
        bigregnr,
        straatnaam,
        huisnummer,
        toevoeging,
        postcode,
        plaatsnaam,
        telefoon,
        email,
        email2,
        specialisme
      } = req.body;
      if (!voornaam) {
        return res.send({
          success: false,
          message: "Error: Voornaam is required"
        });
      }
      if (!achternaam) {
        return res.send({
          success: false,
          message: "Error: Achternaam is required"
        });
      }
      if (!geboortedatum) {
        return res.send({
          success: false,
          message: "Error: Geboortedatum is required"
        });
      }
      if (!bigregnr) {
        return res.send({
          success: false,
          message: "Error: BIG-registratienummer is required"
        });
      }
      if (!straatnaam) {
        return res.send({
          success: false,
          message: "Error: Straatnaam is required"
        });
      }
      if (!huisnummer) {
        return res.send({
          success: false,
          message: "Error: Huisnummer is required"
        });
      }
      if (!postcode) {
        return res.send({
          success: false,
          message: "Error: Postcode is required"
        });
      }
      if (!plaatsnaam) {
        return res.send({
          success: false,
          message: "Error: Plaatsnaam is required"
        });
      }
      if (!telefoon) {
        return res.send({
          success: false,
          message: "Error: Telefoonnummer is required"
        });
      }
      if (!email) {
        return res.send({
          success: false,
          message: "Error: Email is required"
        });
      }
      if (!email2) {
        return res.send({
          success: false,
          message: "Error: Emailverificatie is required"
        });
      }
      // if (!specialisme) {
      //   return res.send({
      //     success: false,
      //     message: "Error: Specialisme is required"
      //   });
      // }

      dbase
        .collection("users")
        .find()
        .toArray((err, result) => {
          let existingUser = result.filter(user => user.email == email);
          if (existingUser.length > 0)
            return res.send({
              success: false,
              message: "Error: Emailadres al in gebruik."
            });

          const user = new User();
          user.voornaam = voornaam;
          user.tussenvoegsel = tussenvoegsel;
          user.achternaam = achternaam;
          user.geboortedatum = geboortedatum;
          user.bigregnr = bigregnr;
          user.straatnaam = straatnaam;
          user.huisnummer = huisnummer;
          user.toevoeging = toevoeging;
          user.postcode = postcode;
          user.plaatsnaam = plaatsnaam;
          user.telefoon = telefoon;
          user.email = email;
          user.email2 = email2;
          user.specialisme = specialisme;

          dbase.collection("users").save(user, (err, result) => {
            if (err) {
              return res.send({
                success: false,
                message: "Error: Server error"
              });
            }
            res.send({
              success: true,
              message: "User has been saved on server"
            });
          });
        });
    });

    app.use("/api", router);
  }
);