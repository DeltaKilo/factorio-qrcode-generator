import React, {useState} from "react";
import dynamic from "next/dynamic";
import Header from "../layout/header";

const QRCodes = dynamic(
  () => import("components/qrcodes"),
  {ssr: false}
);
const BluePrintText = dynamic(
  () => import("components/blueprinttext"),
  {ssr: false}
);

const bScale = 2;

const defaultTargetString = "";
const submitString = "Copy blueprint to clipboard";
const successString = "Blueprint copied!";

export default function Home() {
  const [targetString, setTargetString] = useState(defaultTargetString);
  const [buttonText, setButtonText] = useState(submitString);
  const [formsubmited, setSubmit] = useState(false);

  const copyBlueprint = (e) => {
    e.preventDefault();
    setButtonText(successString);
    setSubmit(true);

    window.getSelection()
      .selectAllChildren(
        document.getElementById("blueprint-text")
      );
    document.execCommand("copy");
    document.getElementById("targetString").focus();
  };

  const changeTargetString = (e) => {
    setTargetString( e.target.value.toString() );
    if (formsubmited===true){
      setSubmit(false);
      setButtonText(submitString);
    }

  };

  return (
    <div className="container mx-auto flex flex-wrap justify-center mb-4">
      <Header/>
      <div className="container flex flex-wrap justify-center main-content flex-1">
        <div className="xl:w-1/3 lg:w-1/3 md:w-full sm:w-full bg-gray-300">
          <div className="m-4">
            <form className="mx-2" onSubmit={(e)=> copyBlueprint(e)}>
              <label htmlFor="targetString" className="block text-grey-darker text-sm font-bold mb-2">Enter text</label>
              <input type="text" id="targetString" className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker active:border-indigo-600" value={targetString} onChange={(e) => changeTargetString(e)}/>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >{buttonText}</button>
            </form>
          </div>
        </div>
        <BluePrintText text={targetString} scale={bScale}/>
        <QRCodes text={targetString}/>
        <div/>
      </div>
    </div>
  );
}
