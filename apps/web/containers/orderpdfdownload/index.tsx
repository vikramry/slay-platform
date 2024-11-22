import React from 'react';

function CustomerPdfComponent({
  reference,
  loading,
  OrderData,
}: {
  reference?: any;
  loading?: boolean;
  OrderData?: any;
}) {
  if (loading) {
    return (
      <h4 className="flex justify-center text-[white] text-lg">
        Loading...
      </h4>
    );
  }

  if (!OrderData) {
    return (
      <h4 className="flex justify-center text-[white] text-lg">
        No data available
      </h4>
    );
  }

  const { invoice } = OrderData;
  const { customer, billingAddress, shippingAddress, payment, totalAmount, invoiceLines, discountedAmount, couponApplied } = invoice;

  return (
    <div className="bg-gray-200 print:bg-[white] flex justify-center py-8" ref={reference}>
      <div className="w-full bg-[white] lg:w-3/4 xl:w-2/3 shadow-lg print:shadow-none print:scale-90">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-center px-8 pt-12 pb-6 text-gray-700 bg-[white] border-t-8 border-green-700">
          <img
            className="w-2/5 md:w-1/4 mb-6 md:mb-0"
            src="https://www.slaycoffee.in/cdn/shop/files/logo.png?v=1714476294&width=240"
            alt="Logo"
          />
          <div className="ml-auto text-right">
            <h2 className="text-3xl font-bold text-gray-800">INVOICE</h2>
            <p className="mt-2 text-gray-600">
              Issue Date: <span>{new Date(OrderData.date).toLocaleDateString()}</span>
            </p>
            <p className="text-gray-600">
              Status: <span>{invoice.status}</span>
            </p>
            <p className="text-gray-600">
              Payment Status: <span>{payment.status}</span>
            </p>
          </div>
        </header>

        {/* Customer & Company Info */}
        <div className="flex flex-col md:flex-row   justify-between px-8 py-6 border-b">
          <div className="xl:w-[45%]">
            <h3 className="text-lg font-semibold">Billing</h3>
            <p>{customer?.firstName} {customer?.lastName}</p>
            <p>{shippingAddress.addressLine1}, {shippingAddress?.city}</p>
            <p>{shippingAddress.state}, {shippingAddress?.country}, {shippingAddress?.zipCode}</p>
            <p>{customer?.mobile}</p>
          </div>
          <div className="text-right xl:w-[45%]">
            <h3 className="text-lg font-semibold">Shipping</h3>
            <p>{customer?.firstName} {customer?.lastName}</p>
            <p>{billingAddress?.addressLine1}, {billingAddress?.city}</p>
            <p>{billingAddress?.state}, {billingAddress?.country}, {billingAddress?.zipCode}</p>
            <p>{customer?.mobile}</p>
          </div>
        </div>

        {/* Items Table */}
        {/* <div className='md:block hidden'>
          <div className="px-8 py-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-700 text-white text-left">
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2 text-right">Qty</th>
                  <th className="px-4 py-2 text-right">Unit Price</th>
                  <th className="px-4 py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {invoiceLines.map((line: any) => (
                  <tr className="border-b" key={line.id}>
                    <td className="px-4 py-2">{line.productItem.name}</td>
                    <td className="px-4 py-2 text-right">{line.quantity}</td>
                    <td className="px-4 py-2 text-right">₹{line.pricePerUnit.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right">₹{line.amount.toFixed(2)}</td>
                  </tr>
                ))}
                {discountedAmount >0 && 
                 <tr className="border-t-2 font-bold">
                  <td colSpan={3} className="px-4 py-2 text-right">
                    Discount({couponApplied?.code})
                  </td>
                  <td className="px-4 py-2 text-right">-₹{discountedAmount}</td>
                </tr>}
                <tr className="border-t-2 font-bold">
                  <td colSpan={3} className="px-4 py-2 text-right">
                    Total
                  </td>
                  <td className="px-4 py-2 text-right">₹{totalAmount -discountedAmount.toFixed(2)}</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div> */}
        <div className='  '>
        <div className="p-5">
  <div className="grid grid-cols-4 font-bold border-b-2 pb-2">
    <h1>Item</h1>
    <h1 className="text-right">Qty</h1>
    <h1 className="text-right">Unit Price</h1>
    <h1 className="text-right">Subtotal</h1>
  </div>

  {invoiceLines.map((line: any) => (
  <div key={line.id} className="grid grid-cols-4 items-center py-2">
    <h1 className="w-[100%]">{line?.productItem?.name}</h1>
    <h1 className="text-right">{line?.quantity}</h1>
    <h1 className="text-right">₹{line?.pricePerUnit.toFixed(2)}</h1>
    <h1 className="text-right">₹{line?.amount.toFixed(2)}</h1>
  </div>
))}


  {discountedAmount > 0 && (
    <div className="grid grid-cols-4 font-bold mt-4 border-t-2 pt-2">
      <h1 className="col-span-3 text-right">Discount ({couponApplied?.code})</h1>
      <h1 className="text-right">-₹{discountedAmount?.toFixed(2)}</h1>
    </div>
  )}
  <div className="grid grid-cols-4 font-bold mt-2 border-t-2 pt-2">
    <h1 className="col-span-3 text-right">Total</h1>
    <h1 className="text-right">₹{(totalAmount - discountedAmount).toFixed(2)}</h1>
  </div>
</div>


        </div>

        {/* Footer */}
        <footer className="bg-gray-700 text-white text-center py-4 print:bg-white print:text-black">
          <p>Invoice generated on {new Date(OrderData?.date).toLocaleDateString()}</p>
          <p>&copy; 2024 SLAY Coffee. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default CustomerPdfComponent;
