import Head from "next/head";
import ForkMe from "components/forkme";

export default function Header() {
  return(
    <>
      {/*<ForkMe/>*/}
      <Head>
        <title>Factorio QR Code Generator</title>
        {/*<link rel="icon" href="/favicon.ico"/>*/}
      </Head>

      {/*<ForkMe/>*/}
      <div className="flex-1 w-full h-12 bg-gray-500">
        <h1 className="text-4xl sm:text-2x1 font-black mb-4">Factorio QR Code Generator</h1>
      </div>
    </>
  );
}


