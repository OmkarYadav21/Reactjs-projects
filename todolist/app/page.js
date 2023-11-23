"use client";
import React, { useState } from "react";

const page = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [mainTask, setmainTask] = useState([]);
  const [type1, setType] = useState(false);


  const submitHandler = (e) => {
    e.preventDefault();
    setmainTask([...mainTask, { title, desc }]);
    settitle("");
    setdesc("");
  };


  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setmainTask(copyTask);
  };

  
  

  let renderTask = <h2>No task availabel</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className="flex justify-between mb-4">
          <input type="checkbox" className="flex justify-between mb-5"/>
          <div className="flex justify-between mb-5 w-2/3 items-center">
            <h5 className="text-2xl font-semibold">{t.title}</h5>
            <h6 className="text-2xl font-semibold">{t.desc}</h6>
          </div>
          <button
            className="bg-red-500 px-4 py-2 text-white rounded"
            onClick={() => {
              deleteHandler(i);
            }}
          >Delete</button>
        </li>
      );
    });
  }
  return (
    <>
      <h1 className="bg-black text-white text-center text-5xl font-bold p-5">
        OM'S To-Do List
      </h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 mr-6 m-8 px-4 py-2 rounded-lg	"
          placeholder="Enter your task here..."
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
          }}
        />
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-8 px-4 py-2 rounded-lg	"
          placeholder="Enter your discription here..."
          value={desc}
          onChange={(e) => {
            setdesc(e.target.value);
          }}
        />
        <button className="bg-black text-white font-bold rounded px-4 py-3 text-2xl">
          Add Task
        </button>
      </form>
      <hr />
      <div className="p-2 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default page;
