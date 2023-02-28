import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

const CustomSelect = () => {
  let periods = ["Year", "Month", "Week", "Day"];
  let [currentRegion, setCurrentRegion] = useState("");

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div>
      <Listbox value={currentRegion} onChange={setCurrentRegion}>
        {({ open }) => (
          <>
            <div className="relative">
              <Listbox.Button className="py-2 lg:py-1 w-[150px] border-[1px] border-slate-900 bg-transparent rounded-full outline-none">
                <div className="inset-y-0 w-full pointer-events-none  flex justify-around items-center">
                  {currentRegion ? (
                    <p className="text-sm md:text-xl text-slate-900">
                      {currentRegion}
                    </p>
                  ) : (
                    <p className="text-sm md:text-xl text-slate-500">Year</p>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-200"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="currentColor absolute z-10 mt-1 text-slate-700 py-4 px rounded-sm bg-white border-[1px] focus:outline-none w-full">
                  {periods.map((period, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        classNames(
                          active ? "text-slate-800" : "text-slate-500",
                          "relative py-2 pl-3"
                        )
                      }
                      value={period}
                    >
                      {({ currentRegion }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                currentRegion
                                  ? "font-semibold text-sm md:text-xl "
                                  : "font-normal text-sm md:text-xl ",
                                "ml-3 block truncate cursor-pointer text-sm md:text-xl"
                              )}
                            >
                              {period}
                            </span>
                          </div>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default CustomSelect;
