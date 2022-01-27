import { useState } from "react";

const useToggle = () => {
  const [isTrue, setToggle] = useState(false);

  const toggle = () => {
    setToggle(!isTrue);
  };

  return { isTrue, toggle };
};

export default useToggle;
