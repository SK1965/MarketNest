import React, { useState } from 'react';

const ThumbnailImage = ({setThumbnail , thumbnail}) => {
    


  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleFileDelete = () => {
    setThumbnail(null);
    // Clear the input field
  };

  return (
    <div className=" flex flex-col mb-4 ">
      <label htmlFor="thumbnail" className="block mb-1">
        Thumbnail Image
      </label>
      <div className="h-full flex flex-col items-center py-16 border border-gray-900  w-full px-6  text-lg rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition duration-150 ease-in-out">
  <div className=" w-64 border border-gray-600 p-2 flex  justify-center ">
    <input
      type="file"
      id="thumbnail"
      onChange={handleFileChange}
      className=""
      accept="image/*"
      required
    />
  </div>
      {thumbnail && (
        <div className="mt-3 flex flex-col items-center">
          <span className="text-md text-gray-700">{thumbnail.name}
          <button
            type="button"
            onClick={handleFileDelete}
            className="mt-1 mx-4 px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-slate-600"
          >
            Delete
          </button>
          </span>
        </div>
      )}
      </div>
    </div>
  );
};

export default ThumbnailImage;
