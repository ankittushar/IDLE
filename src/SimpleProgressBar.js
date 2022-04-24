import React from "react";

class SimpleProgressBar extends React.Component {
  rafId = null;
  defaultId = "progress-bar";
  defaultClassName = "progress-bar";

  constructor(props) {
    super(props);

    // Used to determine initial width when `startAt` is set
    const initialWidth = props.startAt
      ? (props.startAt / props.duration) * 100
      : 0;

    this.state = {
      width: initialWidth
    };

    this.startProgress = this.startProgress.bind(this);
  }

  componentDidMount() {
    const duration = this.props.duration || 0;
    const startAt = this.props.startAt || 0;
    const progressbarId = this.props.id ? this.props.id : this.defaultId;

    const progressbarEl = document.getElementById(progressbarId);
    // Width of direct parent of `progressbarEl`
    const parentWidth = progressbarEl.parentNode.clientWidth;
    // Percent value that is added every second to the initial width
    const widthStepInPercent = (parentWidth / duration / parentWidth) * 100;

    this.startProgress(duration - startAt, () => {
      this.setState(prevState => ({
        width: prevState.width + widthStepInPercent
      }));
    });
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.rafId);
  }

  startProgress(duration, updateProgress) {
    let currentSecond = 1;
    let second = 1000;
    let startTimestamp = performance.now();

    // Start progressing as soon as the component mounted
    updateProgress();

    const step = timestamp => {
      // Branch is entered whenever a second passed
      if (timestamp - startTimestamp >= second) {
        currentSecond += 1;
        updateProgress();
        startTimestamp = timestamp;
      }
      window.cancelAnimationFrame(this.rafId);

      // Execute `step` callback again if progress bar hasn't finished
      if (currentSecond < duration) {
        this.rafId = window.requestAnimationFrame(step);
      }
    };

    this.rafId = window.requestAnimationFrame(step);
  }

  render() {
    const { className, id } = this.props;
    return (
      <div
        style={{
          width: `${this.state.width}%`,
          transition: "width 1s linear",
        
        }}
        id={id ? id : this.defaultId}
        className={className ? className : this.defaultClassName}
      />
    );
  }
}

export default SimpleProgressBar;
