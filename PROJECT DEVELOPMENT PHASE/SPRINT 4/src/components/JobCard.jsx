import React, { useEffect } from "react";

const JobCard = ({ title, company, description, link }) => {
  return (
    <div className="max-w-sm flex flex-col rounded overflow-hidden shadow-lg border-2 border-slate-200">
      <>
        <div className="px-6 py-4">
          <div className="font-bold text-xl">{title}</div>
          <div className="text mb-2 text-gray-400">{company}</div>
          <p className="text-ellipsis overflow-hidden text-gray-800 text-sm">
            {description}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2 mt-auto mb-2">
          <a
            href={link}
            target="__blank"
            className="bg-transparent hover:bg-purple-400 text-purple-400 font-semibold hover:text-white py-2 mb-0 mt-4 px-4 border border-purple-400 hover:border-transparent rounded"
          >
            Apply
          </a>
        </div>
      </>
    </div>
  );
};

export default JobCard;