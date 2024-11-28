import React from 'react';

function CustomerDetailsCard() {
  const firstName = "Praveen";
  const lastName = "Kumar";

  return (
    <div className="max-w-sm p-4 rounded-lg shadow-md bg-white border-t-black border-t-4 w-full">
      <div className="flex flex-row justify-center mb-4">
        <h1 className="text-xl font-bold">Customer Details</h1>
      </div>
      <div className="flex items-center mb-4">
        <div>
          <h2 className="text-lg text-gray-500">Name</h2>
          <h2 className="text-lg text-black font-semibold">{`${firstName} ${lastName}`}</h2>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <div>
          <p className="text-gray-500">Email</p>
          <h2 className="text-lg text-black font-semibold">Praveen123@gmail.com</h2>
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <p className="text-gray-500">Mobile</p>
          <h2 className="text-lg text-black font-semibold">987654321</h2>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetailsCard;
