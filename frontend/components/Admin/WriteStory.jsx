import React, { useState } from "react";

const WriteStory = () => {
  const [wordCount, setWordCount] = useState(null);
  const [charCount, setCharCount] = useState(null);

  function countWords(evt) {
    // Word Count
    let words = evt.target.value;
    let count = words.split(" ").length;
    setWordCount(count);

    // Character Count
    let len = evt.target.value.length;
    setCharCount(len);

    if (evt.target.value === "") {
      setWordCount(null);
      setCharCount(null);
    }
    return;
  }
  return (
    <div className="flex items-center justify-center bg-white shadow-sm rounded-lg w-[90%] lg:w-3/4 m-auto mt-10 p-4 px-6">
      <div className="font-poppins w-full">
        <div className="text-xl lg:text-2xl font-semibold">
          <div className="flex gap:2 lg:gap-4 items-center">
            <h2 className="text-slate-900">New Story</h2>
          </div>
        </div>

        <form
          action=""
          className="grid  grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 p-4"
        >
          <div className="flex flex-col gap-2 lg:gap-4">
            <input
              type="text"
              placeholder="Story Title"
              className="p-2 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
            />
            <input
              type="text"
              placeholder="Location"
              className="p-2 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
            />
            <input
              type="text"
              placeholder="Category"
              className="p-2 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
            />
            <input
              type="file"
              accept="image/*"
              className="p-2 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 lg:gap-4">
            <div>
              <textarea
                name=""
                id=""
                cols="10"
                rows="9"
                placeholder="Write Story: Lorem ipsum dolor sit amet..."
                className="p-2 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
                onChange={(e) => countWords(e)}
              ></textarea>
              <div className="flex items-center gap-4">
                {wordCount && (
                  <span className="text-sm text-slate-500">
                    Words: {wordCount}
                  </span>
                )}

                {charCount && (
                  <span className="text-sm text-slate-500">
                    Characters: {charCount}
                  </span>
                )}
              </div>
            </div>

            <div>
              <button className="rounded-full px-3 py-1 flex items-center gap-2 text-sm bg-slate-800 text-slate-100 hover:bg-slate-100 hover:text-slate-800">
                Add New Story
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteStory;
