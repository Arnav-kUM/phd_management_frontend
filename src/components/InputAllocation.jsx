import { useState } from "react";
function FileInputs() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // upload files to backend
  };

  const handleFileChange = (setFile) => (event) => {
    setFile(event.target.files[0]);
  };

  const handleClearFile = (setFile) => {
    setFile(null);
  };

  return (
    <div>
      <form className="flex flex-wrap gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4 flex-1 mx-4 mt-4">
          <div className="relative flex-1">
            <input
              type="file"
              onChange={handleFileChange(setFile1)}
              className="absolute w-full h-full opacity-0"
            />
            <button
              type="button"
              onClick={() => handleClearFile(setFile1)}
              className="bg-pantone-blue rounded-lg text-white font-medium py-2 px-4 l w-full"
            >
              {file1 ? file1.name : "File 1"}
            </button>
          </div>
          <div className="relative flex-1">
            <input
              type="file"
              onChange={handleFileChange(setFile2)}
              className="absolute w-full h-full opacity-0"
            />
            <button
              type="button"
              onClick={() => handleClearFile(setFile2)}
              className="bg-pantone-blue rounded-lg text-white font-medium py-2 px-4 l w-full"
            >
              {file2 ? file2.name : "File 2"}
            </button>
          </div>
          <div className="relative flex-1">
            <input
              type="file"
              onChange={handleFileChange(setFile3)}
              className="absolute w-full h-full opacity-0"
            />
            <button
              type="button"
              onClick={() => handleClearFile(setFile3)}
              className="bg-pantone-blue rounded-lg text-white font-medium py-2 px-4 l w-full"
            >
              {file3 ? file3.name : "File 3"}
            </button>
          </div>
          <div className="relative flex-1">
            <input
              type="file"
              onChange={handleFileChange(setFile4)}
              className="absolute w-full h-full opacity-0"
            />
            <button
              type="button"
              onClick={() => handleClearFile(setFile4)}
              className="bg-pantone-blue rounded-lg text-white font-medium py-2 px-4 l w-full"
            >
              {file4 ? file4.name : "File 4"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 rounded-lg text-white font-medium py-2 px-4 mx-4 w-full"
        >
          Upload Files
        </button>
      </form>
    </div>
  );
}

export default FileInputs;
