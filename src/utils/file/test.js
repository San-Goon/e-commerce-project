import React, { useState } from 'react';

const MyTabsComponent = () => {
  const [active, setActive] = useState(1);
  const onClickOne = () => {
    setActive(1);
  };
  const onClickTwo = () => {
    setActive(2);
  };
  const onClickThree = () => {
    setActive(3);
  };
  return (
    <div className="tabs">
      <div style={{ display: 'flex' }}>
        <button>Section title 1</button>
        <button>Section title 2</button>
        <button>Section title 3</button>
      </div>
    </div>
  );
};

export default MyTabsComponent;
