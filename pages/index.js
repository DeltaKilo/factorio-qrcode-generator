import React, { useState } from "react";
import dynamic from "next/dynamic";
import Header from "layout/header";
import QRCodes from "components/qrcodes";
import BluePrintText from "components/blueprinttext";

const blueprintScale = 2;
const defaultTileMaterial = "";
const defaultTargetString = "";
const submitString = "Copy blueprint to clipboard";
const successString = "Blueprint copied!";

export default function Home() {
  const [targetString, setTargetString] = useState(defaultTargetString);
  const [targetScale, setTargetScale] = useState(blueprintScale);
  const [buttonText, setButtonText] = useState(submitString);
  const [formsubmited, setSubmit] = useState(false);
  const [tileMaterial, setTileMaterial] = useState(defaultTileMaterial);

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
    setTargetString(e.target.value.toString());
    if (formsubmited === true) {
      setSubmit(false);
      setButtonText(submitString);
    }
  };
  const changeTargetScale = (e) => {
    setTargetScale(parseInt(e.target.value));
    if (formsubmited) {
      setSubmit(false);
      setButtonText(submitString);
    }

  };
  const changeTileMaterial = (e) => {
    setTileMaterial(e.target.value);
    if (formsubmited) {
      setSubmit(false);
      setButtonText(submitString);
    }

  };

  return (
    <div className="container mx-auto flex flex-wrap justify-center">
      <Header />
      <div className="container w-full flex flex-wrap main-content flex-1">
        <div className="xl:w-1/3 lg:w-1/3 md:w-full sm:w-full w-full bg-gray-300">
          <div className="m-4">
            <form className="mx-2 " onSubmit={(e) => copyBlueprint(e)}>
              <div className="flex flex-wrap justify-between">
                <div className="w-full">
                  <label htmlFor="targetString" className="block text-grey-darker text-sm font-bold mb-2">Enter text</label>
                  <input autoFocus={true} type="text" id="targetString" className="mb-2 w-full shadow border border-gray-400 hover:border-gray-500 rounded py-2 px-3 text-grey-darker focus:outline-none focus:shadow-outline" value={targetString} onChange={(e) => changeTargetString(e)} />
                  {/*<input type="text" id="targetScale" value={targetScale} onChange={(e) => changeTargetScale(e) }/>*/}
                </div>
                <div className="flex-1 w-24">
                  <div className="inline-block relative w-24 mb-4 ">
                    <label htmlFor="targetScale" className="block text-grey-darker text-sm font-bold mb-2">Scale</label>
                    <select id="targetScale" value={targetScale} onChange={(e) => changeTargetScale(e)}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 rounded px-4 py-2 pr-8  shadow leading-tight focus:outline-none focus:shadow-outline">
                      <option value="1">1x</option>
                      <option value="2">2x</option>
                      <option value="3">3x</option>
                      <option value="4">4x</option>
                      <option value="5">5x</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6 text-gray-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex-1 w-48">
                  <div className="inline-block relative w-48 mb-4 ">
                    <label htmlFor="targetTiles" className="block text-grey-darker text-sm font-bold mb-2">Concrete?</label>
                    <select id="targetTiles" value={tileMaterial} onChange={(e) => changeTileMaterial(e)}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                      <option value="">no</option>
                      <option value="stone-path">Stone bricks</option>
                      <option value="concrete">Concrete</option>
                      <option value="refined-concrete">Refined concrete</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6 text-gray-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full text-center">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >{buttonText}</button>
              </div>
            </form>
          </div>
        </div>
        <BluePrintText text={targetString} scale={targetScale} tiles={tileMaterial} />
        <QRCodes text={targetString} />
        <div />
      </div>
    </div>
  );
}
