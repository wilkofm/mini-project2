import React from "react";

function GameDescriptionPopup({ game, onClose }) {
  if (!game) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#f5f7fa] w-1/2 p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 bg-blue-500 hover:opacity-50 text-white rounded-full px-3 py-1"
          onClick={onClose}
        >
          Close
        </button>
        <div className="flex flex-col items-center">
          <img
            src={game.background_image}
            alt={`${game.name} image`}
            className="w-full h-auto rounded-lg"
          ></img>
          <h2 className="text-2xl font-bold mb-4">{game.name}</h2>
          <p className="text-sm text-gray-700 mb-4">{game.description_raw}</p>
        </div>
      </div>
    </div>
  );
}

export default GameDescriptionPopup;