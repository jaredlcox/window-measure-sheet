import React from "react";

const Steps: React.FC = () => {
  return (
<ul className="steps steps-vertical lg:steps-horizontal">
  <li className="step step-primary">Select Building</li>
  <li className="step step-primary">Choose plan</li>
  <li className="step">Purchase</li>
  <li className="step">Receive Product</li>
</ul>
  );
};

export default Steps;
