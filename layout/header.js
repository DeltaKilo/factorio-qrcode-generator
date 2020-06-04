import Head from "next/head";
import ForkMe from "components/forkme";

export default function Header() {
  return(
    <>
      <ForkMe/>
      <Head>
        <title>Factorio QR Code Generator</title>
        {/*<link rel="icon" href="/favicon.ico"/>*/}
      </Head>

      <div className="w-full bg-gray-500 self-center container">
        <h1 className="text-base sm:text-xl md:text-4xl lg:text-4xl xl:text-4xl font-black mx-4 ">Factorio QR Code Generator</h1>
      </div>
    </>
  );
}


