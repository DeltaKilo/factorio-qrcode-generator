import React from "react";
import getBlueprintString from "../utils/getBlueprintString";

export default function BluePrintText({text,scale}) {
  const blueprint = getBlueprintString(text, scale);

  return(
    <div className="xl:w-1/3 lg:w-1/3 md:w-full sm:w-full bg-gray-300">
      <pre className="text-xs m-2 bg-gray-200" id="blueprint-text">
        <code>
          {blueprint}
        </code>
      </pre>
    </div>
  );
}
