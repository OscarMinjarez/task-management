"use client";

export default function CreateTask({ onClick }) {
    return (
        <div 
          onClick={onClick}
          className="grid grid-cols-12 gap-4 px-3 mt-3 bg-white rounded-lg shadow-sm h-[60px] cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="col-span-1 flex items-center justify-center">
            <div className="p-2 rounded-full text-[#625f5f]">
              {/* Plus icon SVG */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5"
              >
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
    
          <div className="col-span-11 flex items-center">
            <p className="text-[#625f5f]">Agregar nueva tarea...</p>
          </div>
        </div>
      );
    }