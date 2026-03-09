import {FileX} from "lucide-react";

export default function Error404(){
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center font-lexend">
      <div className="flex items-center">
        <FileX size={200} className="text-gray-300"/>
        <div>
          <h1 className="text-8xl font-extrabold text-primary">404</h1>
          <h2 className="text-gray text-3xl font-semibold mt-5">
            Page not found!
          </h2>
        </div>
      </div>
    </div>
  );
}