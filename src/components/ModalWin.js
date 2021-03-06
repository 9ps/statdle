import React from "react";
import catagoryNames from "../assets/catagoryNames.json";
import StatsDisplay from "../components/StatsDisplay";
import WinCountries from "./WinCountries";

/*props: 
catagories: 
history... ["Uzbekistan", "Singapore", "Bangladesh", "Malaysia… */
class ModalWin extends React.Component {
  constructor(props) {
    super(props);

    this.share = this.share.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);
    this.getNumber = this.stopPropagation.bind(this);
  }

  stopPropagation(e) {
    if (e) {
      e.stopPropagation();
    }
  }

  /* what is returned when share clicked */
  share(e) {
    var text =
      "I got #StatdleEndless in " +
      this.props.history.length +
      " and all I got was this lousy message!\n\nhttps://9ps.github.io/statdle/";
    navigator.clipboard.writeText(text);
    this.props.togglePopup(3);
  }

  render() {
    let stats = JSON.parse(localStorage.getItem("stats"));
    let content;

    if (this.props.win) {
      //share buttons

      let fillerText = " Guesses";
      if (this.props.history.length === 1) {
        fillerText = " Guess";
      }

      content = (
        <>
          <h1 className="text-center">
            {this.props.history.length + " " + fillerText}
          </h1>
          <div className="btn-wide btn-modal btn-active" onClick={this.share}>
            Share
          </div>
          <StatsDisplay stats={stats} />
          <WinCountries history={this.props.history} win={true}/>
        </>
      );
    } else {
      content = (
        <>
          <StatsDisplay stats={stats} />
          <WinCountries history={this.props.history} win={false}/>
          <p className="results-text">
            (finish playing the round for sharing options)
          </p>
        </>
      );
    }

    return (
      <div
        className={
          this.props.special
            ? "modal-backing modal-backing-special"
            : "modal-backing"
        }
        onClick={() => this.props.toggleModal()}
      >
        <div
          className={
            this.props.special
              ? "modal-content modal-content-special"
              : "modal-content"
          }
          onClick={this.stopPropagation}
        >
          <div className="modal-title">
            <h2>Results</h2>
            <span
              className="material-icons btn"
              onClick={() => this.props.toggleModal()}
            >
              close
            </span>
          </div>
          <div className="modal-body">{content}</div>
        </div>
      </div>
    );
  }
}

export default ModalWin;
