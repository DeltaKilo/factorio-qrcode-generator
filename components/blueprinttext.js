import React from "react";
import getBlueprintString from "../utils/getBlueprintString";

export default function BluePrintText({text, scale, tiles}) {
  const blueprint = getBlueprintString(text, scale, tiles);

  return(
    <div className="xl:w-1/3 lg:w-1/3 md:w-full sm:w-full w-full bg-gray-300">
      <div className="m-4">
        <h2>Blueprint String</h2>
        <pre className="text-xs bg-gray-200 select-all" id="blueprint-text">
          <code>
            {blueprint}
          </code>
        </pre>
      </div>
    </div>
  );
}
