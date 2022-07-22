import React from "react";

function Card() {
  return (
    <>
      <div className="box-content max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-2">
        <img
          className="h-20 w-full object-contain hover:object-scale-down md:h-full md:w-full sm:h-full sm:w-full "
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Man looking at item at a store"
        />
        <div className="w-auto md:h-auto sm:h-0 sm:invisible md:visible bg-green-500 md:bg-red-500 lg:bg-orange-500">
          <p className="text-xs font-mono">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo
            tempora, repudiandae possimus expedita aut cumque, deserunt debitis
            atque autem, suscipit veniam et fuga ipsam consectetur voluptas
            quidem saepe quae. Ratione.
          </p>
        </div>
      </div>
      <div className="box-content max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-2">
        <img
          className="h-20 w-full object-contain hover:object-scale-down md:h-full md:w-full sm:h-full sm:w-full "
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Man looking at item at a store"
        />
        <div className="w-auto md:h-auto sm:h-0 sm:invisible md:visible bg-green-500 md:bg-red-500 lg:bg-orange-500">
          <p className="text-xs font-mono">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo
            tempora, repudiandae possimus expedita aut cumque, deserunt debitis
            atque autem, suscipit veniam et fuga ipsam consectetur voluptas
            quidem saepe quae. Ratione.
          </p>
        </div>
      </div>
    </>
  );
}

export default Card;
