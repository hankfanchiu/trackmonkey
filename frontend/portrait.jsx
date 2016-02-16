var React = require("react");

var Portrait = React.createClass({
  render: function () {
    var portrait = this.props.portrait;

    return (
      <figure>
        <a href={portrait.linkedin} target="_blank">
          <img src={portrait.img}></img>
        </a>
        <p>
          {portrait.name}<br/>
          {portrait.role}
        </p>
      </figure>
    );
  }
});

module.exports = Portrait;
