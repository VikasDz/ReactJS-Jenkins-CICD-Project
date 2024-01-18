import React, { useState, useEffect } from "react";

const getLocalData = () => {
  const lists = localStorage.getItem("myTodo");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

function Todo() {
  const [inputData, setinputData] = useState("");
  const [items, setitems] = useState(getLocalData());
  const [isEditItem, setisEditItem] = useState("");
  const [ToogleBtn, setToogleBtn] = useState(false);


  useEffect(() => {
    document.title = `Project-3-Todo-List`;
  });

  const addItem = () => {
    if (!inputData) {
      alert("Add Fill Todo ✌");
    } else if (inputData && ToogleBtn) {
      setitems(
        items.map((curEle) => {
          if (curEle.id === isEditItem) {
            return { ...curEle, name: inputData };
          }
          return curEle;
        })
      );
      setinputData([]);
      setisEditItem();
      setToogleBtn(false);
    } else {
      const mydataInput = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setitems([...items, mydataInput]);
      setinputData("");
    }
  };

  const editItem = (index) => {
    const edit_Todo_Items = items.find((curEle) => {
      return curEle.id === index;
    });
    setinputData(edit_Todo_Items.name);
    setisEditItem(index);
    setToogleBtn(true);
  };

  const deleItem = (index) => {
    const updateItems = items.filter((curEle) => {
      return curEle.id !== index;
    });
    setitems(updateItems);
  };

  const removeAll = () => {
    setitems([]);
  };

  //Adding LocalStorage

  useEffect(() => {
    localStorage.setItem("myTodo", JSON.stringify(items));
  }, [items]);

  return (
    <>
      
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                TODO LIST
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Add Your List Here :-)
              </p>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Name Of Todo
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={inputData}
                      onChange={(event) => setinputData(event.target.value)}
                      name="name"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  {ToogleBtn ? (
                    <button
                      className="ml-4 inline-flex  text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-white rounded text-lg text-black"
                      onClick={addItem}
                    >
                      Update List
                    </button>
                  ) : (
                    <button
                      className="ml-4 inline-flex  text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-white rounded text-lg text-black"
                      onClick={addItem}
                    >
                      Add In Your List
                    </button>
                  )}

                  <button
                    className="ml-4 inline-flex  text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-white rounded text-lg text-black"
                    onClick={removeAll}
                  >
                    Remove All
                  </button>
                  <section className="text-gray-600 body-font">
                    <div className="container px-5 py-10 mx-auto">
                      <div className="flex flex-wrap -m-4">
                        {items.map((curEle, index) => {
                          return (
                            <div className="p-4 lg:w-1/3" key={index}>
                              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                  Your Todo
                                </h2>
                                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                                  {curEle.name}
                                </h1>
                                <button
                                  className="ml-4 inline-flex  text-white bg-red-500 border-0 py-2 px-6 mb-2 focus:outline-none hover:bg-black rounded text-sm text-white"
                                  onClick={() => editItem(curEle.id)}
                                >
                                  Update
                                </button>
                                <button
                                  className="ml-4 inline-flex  text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-black rounded text-sm text-white"
                                  onClick={() => deleItem(curEle.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>

    </>
  );
}

export default Todo;
