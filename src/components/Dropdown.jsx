import { useState, useEffect, useRef } from "react";

export function Dropdown({ options = [], value = "", onChange, placeholder = "Select..." }) {
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!Array.isArray(options)) {
      setFilteredOptions([]);
      return;
    }

    const filtered = options
      .filter((opt) => typeof opt === "string")
      .filter((opt) =>
        query === "" ? opt : opt.toLowerCase().includes(query.toLowerCase())
      );

    setFilteredOptions(filtered);
  }, [query, JSON.stringify(options)]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setQuery(value);
  }, [value])

  const handleSelect = (option) => {
    setQuery(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div ref={containerRef} className="relative w-full text-black">
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
      />

      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full max-h-48 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {filteredOptions.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-green-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {isOpen && filteredOptions.length === 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
}
