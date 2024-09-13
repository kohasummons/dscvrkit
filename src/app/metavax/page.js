'use client';
 
import { useState } from "react";
import Image from "next/image";
import { Sparkle } from "lucide-react";
 
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
 
export default function Metavax() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);
 
    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction: prediction });
      setPrediction(prediction);
    }
  };
 
  return (
    <div className="w-full mx-auto p-5">
      <div className='text-white'>
        <h3>Metavax <Sparkle className='inline w-5 h-5'/></h3>
        <p>Generate an artwork and mint it to your wallet. You must like and follow me before you can interact!</p>
        </div>
      <form className="w-full flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-grow bg-gray-200 text-white p-2 placeholder-text-white"
          name="prompt"
          placeholder="Enter a Prompt"
        />
        <button className="button bg-blue-700 p-3" type="submit">
          Generate
        </button>
      </form>
      {error && <div>{error}</div>}
 
      {prediction && (
        <>
          {prediction.output && (
            <div className="image-wrapper mt-5">
            <p className="py-3 text-sm opacity-50">{prediction.status !== 'succeeded' & ("Generating...")}</p>

              <Image
                src={prediction.output[prediction.output.length - 1]}
                alt="output"
                sizes="100vw"
                height={300}
                width={300}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}