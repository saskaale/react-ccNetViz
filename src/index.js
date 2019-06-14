import React, {createRef} from 'react';
import PropTypes from 'prop-types';
import CCNetViz from 'ccnetviz';

class CCNetVizComponent extends React.Component {
  constructor() {
    super();
    this.canvasEl = createRef();
  }

  draw() {
    this.ccNetViz.draw();
  }

  reset() {
    const {nodes, edges, layout} = this.props;

    this.ccNetViz.set(nodes, edges, layout);
  }

  init() {
    if (this.ccNetViz) {
      this.ccNetViz.remove();
    }
    this.ccNetViz = new CCNetViz(this.canvasEl.current, this.props.options);
  }

  shouldComponentUpdate(newprops) {
    const isChangeIn = (types) =>
      types.some((key) => newprops[key] !== this.props[key]);

    const shouldRender = () => isChangeIn(['width', 'height', 'style', 'className']);

    if (isChangeIn(['options'])) {
      this.init();
      this.reset();
      this.draw();
      return shouldRender();
    }

    if (isChangeIn(['nodes', 'edges', 'layout'])) {
      this.reset();
      this.draw();
      return shouldRender();
    }

    return shouldRender();
  }

  componentDidUpdate() {
    this.draw();
  }

  componentWillUnmount() {
    this.ccNetViz.remove();
  }

  componentDidMount() {
    this.init();
    this.reset();
    this.draw();
  }

  render() {
    const {
      width,
      height,
      style,
      className
    } = this.props;

    return React.createElement('canvas', {
      style,
      width,
      className,
      height,
      ref: this.canvasEl
    });
  }
}

CCNetVizComponent.propTypes = {
  options: PropTypes.object,
  layout: PropTypes.string,
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired
};

export default CCNetVizComponent;
