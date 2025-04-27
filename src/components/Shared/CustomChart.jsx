"use client";

import { Add } from "iconsax-react";
import { X } from "lucide-react";
import { useState } from "react";

const CustomChart = ({ fileName, setFile, setFileName }) => {
  // const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      setFile(newFile);
      setFileName(newFile.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files?.[0];
    setFile(droppedFiles);
  };

  const removeFile = () => {
    setFile(null);
    setFileName(null);
  };

  return (
    <section className="bg-white p-6 grow h-fit">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded border border-dashed h-[132px] px-4 flex flex-col gap-2.5 items-center justify-center ${
          isDragging
            ? "border-black/25 bg-grey/25"
            : "border-black/[8%] bg-[#F5F5F5]"
        }`}
      >
        {!isDragging && <p className="text-grey">Add your size chart here</p>}
        {isDragging ? (
          <p className="py-2">Drop item here</p>
        ) : (
          <label
            htmlFor="upload-size"
            className="bg-white text-dark px-4 py-2 flex items-center gap-2 rounded border border-black/[8%] cursor-pointer"
          >
            <Add size={20} />
            Upload {fileName && "new"} file
          </label>
        )}
        <input
          type="file"
          id="upload-size"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {fileName && (
        <div className="border border-black/10 px-4 py-3 rounded-lg flex justify-between items-center mt-2.5">
          <p>{fileName}</p>
          <X
            color="red"
            className="cursor-pointer"
            size={16}
            onClick={removeFile}
          />
        </div>
      )}
    </section>
  );
};

export default CustomChart;
