import React, {useState, useEffect} from 'react';
import CCNetVizComponent from './ccNetVizComponent';

const options = {
  styles: {
    node: { texture: "images/node.png", label: { hideSize: 16 } },
    edge: { arrow: { texture: "images/arrow.png" } }
}};

var nodes = [
  { label: "Hello", x: 0, y: 1 },
  { label: "World", x: 1, y: 1  },
  { label: "!", x: 0.5, y: 0  },
  { label: "I am in center", x: 0.5, y: 0.5 },
  { label: "Right bottom corner", x: 1, y: 0 },
];
var edges = [
  { source: nodes[0], target: nodes[1] },
  { source: nodes[1], target: nodes[0] },
  { source: nodes[0], target: nodes[0] },
  { source: nodes[1], target: nodes[2] },
  { source: nodes[2], target: nodes[4] }
];


const App = () => {
  const [w, setw] = useState(640);
  const [h, seth] = useState(480);

  useEffect(() => {
    const int = setInterval(() => {
      setw(w < 1000 ? w+10 : 640);
      seth(h < 800 ? h+10 : 480);
    },2*1000);

    return () => clearInterval(int);
  });

  console.log(`SIZE [${w}x${h}]`);

  return (<div>
    <h1>ccNetViz example</h1>
      <div>
        <CCNetVizComponent
          width={w}
          height={h}
          options={options}
          nodes={nodes}
          edges={edges}
          />
      </div>
    </div>)
}

export default App;

