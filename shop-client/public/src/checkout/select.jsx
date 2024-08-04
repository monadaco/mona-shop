import { useEffect, useRef, useState } from "react";

export const Select = ({ options = [], value, setValue }) => {
  const [showOptions, setShowOptions] = useState(false);

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    setShowOptions(false);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [value]);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <div>
        <button
          onClick={() => setShowOptions(!showOptions)}
          type="button"
          className="inline-flex w-12 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {value}
          <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showOptions && (
        <div
          className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div className="py-1" role="none">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setValue(Number(option));
                }}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                role="menuitem"
                tabindex="-1"
                id="menu-item-0"
              >
                {option}
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
