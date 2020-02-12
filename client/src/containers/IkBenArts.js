import React from "react";
import "../assets/styles/App.css";
import "../assets/styles/style_IkBenArts.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

class IkBenArts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      voornaam: "",
      tussenvoegsel: "",
      achternaam: "",
      geboortedatum: "",
      bigregnr: "",
      straatnaam: "",
      huisnummer: "",
      toevoeging: "",
      postcode: "",
      plaatsnaam: "",
      telefoon: "",
      email: "",
      email2: "",
      specialisme: ""
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });

    document.title = "Ik ben arts - Huur een arts";
  }

  loadImage(event) {
    var image = document.getElementById("output");
    var icon = document.getElementById("userIcon");
    image.src = URL.createObjectURL(event.target.files[0]);
    icon.parentNode.removeChild(icon);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      isLoading: true
    });

    fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body:
        "voornaam=" +
        this.state.voornaam +
        "&tussenvoegsel=" +
        this.state.tussenvoegsel +
        "&achternaam=" +
        this.state.achternaam +
        "&geboortedatum=" +
        this.state.geboortedatum +
        "&bigregnr=" +
        this.state.bigregnr +
        "&straatnaam=" +
        this.state.straatnaam +
        "&huisnummer=" +
        this.state.huisnummer +
        "&toevoeging=" +
        this.state.toevoeging +
        "&postcode=" +
        this.state.postcode +
        "&plaatsnaam=" +
        this.state.plaatsnaam +
        "&telefoon=" +
        this.state.telefoon +
        "&email=" +
        this.state.email +
        "&email2=" +
        this.state.email2 +
        "specialisme=" +
        this.state.specialisme
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            voornaam: "",
            tussenvoegsel: "",
            achternaam: "",
            geboortedatum: "",
            bigregnr: "",
            straatnaam: "",
            huisnummer: "",
            toevoeging: "",
            postcode: "",
            plaatsnaam: "",
            telefoon: "",
            email: "",
            email2: "",
            specialisme: ""
          });
          this.props.history.push("/ikbenarts/confirmation");
        } else {
          console.log(this.state);
          this.setState({
            signUpError: json.message,
            isLoading: false
          });
        }
      });
  };

  render() {
    if (this.state.isLoading) return <div>Loading...</div>;
    return (
      <div>
        <Header />

        <div className="heading_text">
          <span>Ik ben arts</span>
        </div>

        <form id="signup-form" onSubmit={this.handleSubmit}>
          <div className="form_heading">
            <span>Persoonlijk</span>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="geslacht"
              id="vrouw"
              value="vrouw"
              required
            />
            <label className="form-check-label" htmlFor="geslacht">
              Vrouw*
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="geslacht"
              id="man"
              value="man"
            />
            <label className="form-check-label" htmlFor="man">
              Man*
            </label>
          </div>

          <div className="form-row">
            <div className="form-group col-sm-4">
              <input
                type="text"
                className="form-control"
                id="voornaam"
                placeholder="Voornaam*"
                name="voornaam"
                required
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-sm-4">
              <input
                type="text"
                className="form-control"
                id="tussenvoegsel"
                placeholder="tussenvoegsel"
                name="tussenvoegsel"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-sm-4">
              <input
                type="text"
                className="form-control"
                id="achternaam"
                placeholder="Achternaam*"
                name="achternaam"
                required
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-sm-4">
              <input
                type="text"
                className="form-control"
                id="geboortedatum"
                onFocus={e => (e.target.type = "date")}
                placeholder="Geboortedatum*"
                name="geboortedatum"
                required
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-sm-4">
              <input
                type="number"
                className="form-control"
                id="bigreg"
                placeholder="BIG-registratienummer*"
                name="bigregnr"
                required
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form_heading">
            <span>Adres</span>
          </div>

          <div className="form-row">
            <div className="form-group col-sm-4">
              <input
                type="text"
                className="form-control"
                id="straatnaam"
                placeholder="Straatnaam*"
                name="straatnaam"
                required
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-sm-4">
              <input
                type="number"
                className="form-control"
                id="huisnummer"
                placeholder="Huisnummer*"
                name="huisnummer"
                required
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-sm-4">
              <input
                type="text"
                className="form-control"
                id="toevoeging"
                placeholder="Toevoeging"
                name="toevoeging"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-sm-4">
              <input
                type="text"
                className="form-control"
                id="postcode"
                placeholder="Postcode*"
                name="postcode"
                required
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-sm-4">
              <input
                type="text"
                className="form-control"
                id="plaatsnaam"
                placeholder="Plaatsnaam*"
                name="plaatsnaam"
                required
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form_heading">
            <span>Contactgegevens</span>
          </div>

          <div className="form-row">
            <div className="form-group col-sm-4">
              <input
                type="number"
                className="form-control"
                id="telefoonnummer"
                placeholder="Telefoonnummer*"
                name="telefoon"
                required
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-sm-4">
              <input
                type="email"
                className="form-control"
                id="email1"
                placeholder="Emailadres*"
                name="email"
                required
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-sm-4">
              <input
                type="email"
                className="form-control"
                id="email2"
                placeholder="Emailadresverificatie*"
                name="email2"
                required
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form_heading">
            <span>Vaardigheden</span>
          </div>

          <div className="form-row">
            <div className="form-group col-sm-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="inlineCheckbox1"
                name="vaardigheid"
                value="BLS"
              />
              <label className="form-check-label" htmlFor="inlineCheckbox1">
                Basic Life Support Diploma
              </label>
            </div>
            <div className="form-group col-sm-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="inlineCheckbox2"
                name="vaardigheid"
                value="ALS"
              />
              <label className="form-check-label" htmlFor="inlineCheckbox2">
                Advanced Life Support Diploma
              </label>
            </div>
            <div className="form-group col-sm-4">
              <select
                className="custom-select"
                name="specialisme"
                required
                defaultValue={"DEFAULT"}
                onChange={this.handleChange}
              >
                <option value="DEFAULT" hidden>
                  Specialisme*
                </option>
                <option value="one">One</option>
                <option value="two">Two</option>
                <option value="three">Three</option>
              </select>
            </div>
          </div>

          <div className="form_heading">
            <span>Pasfoto</span>
          </div>

          <div className="form-row">
            <div className="form-group col-sm-12 image_wrapper">
              <input
                type="file"
                accept="image/*"
                name="image"
                id="file"
                onChange={this.loadImage}
                style={{ display: "none" }}
              />
              <div className="col-sm-4 image_picker">
                <label htmlFor="file">
                  <span className="image_text">Upload (pas)foto</span>
                </label>
              </div>
              <div className="form-group col-sm-4 image_area">
                <img id="output" alt="" />
                <div className="far fa-user" id="userIcon"></div>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-sm-4 submit_button">
              <input
                type="submit"
                className="btn btn-outline-primary btn-block"
                value="Aanmelden"
              />
            </div>
          </div>
        </form>
        <Footer />
      </div>
    );
  }
}

export default IkBenArts;