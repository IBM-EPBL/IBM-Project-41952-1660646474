import React, { useEffect, useState } from "react";

const Skill = ({ skill, setSelectedSkills, disabled }) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSelected) {
      setSelectedSkills((prev) => [...prev, skill]);
    } else {
      setSelectedSkills((prev) => prev.filter((item) => item !== skill));
    }
  }, [isSelected]);

  return (
    <li className="hover:text-white flex gap-1 items-center justify-between p-1 rounded-sm">
      {skill}
      <button
        disabled={disabled}
        onClick={() => setIsSelected(!isSelected)}
        className={`cursor-pointer border-2 ${
          !isSelected ? "border-green-500" : "border-red-400"
        } p-1 rounded-lg`}
      >
        {!isSelected ? "Add" : "Remove"}
      </button>
    </li>
  );
};

export default Skill;