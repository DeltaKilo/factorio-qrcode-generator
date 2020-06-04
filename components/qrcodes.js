import React from "react";
import {imageSync} from "qr-image";

export default function QRCodes({text}) {
  const image = imageSync(text, {type: "svg"});
  const bs64 = "data:image/svg+xml;base64," + window.btoa(image);

  return (
    <div className="xl:w-1/3 lg:w-1/3 md:w-full sm:w-full bg-gray-300">
      <img src={bs64} alt="Reference QR Code"/>
      <p id="reference-string" className="break-words text-sm">Reference QR Code for text: <i>&quot;{text}&quot;</i></p>
    </div>
  );
}


