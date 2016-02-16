var React = require("react");

var Portrait = React.createClass({

  render: function () {
    var portraitDetails = this.props.portraitDetails;
    console.log(portraitDetails["img"])
    return (
      <div>
        <a href={portraitDetails["linkedin"]} target="_blank"><img src={portraitDetails["img"]}></img></a>
        <br/>
        {portraitDetails["name"]}
        <br/>
        {portraitDetails["role"]}
      </div>
    );
  }
});

module.exports = Portrait;
