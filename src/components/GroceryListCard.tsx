import { useAppContext } from "../contexts/App.context";

const GroceryListCard = () => {
  const { mealPlan, handleGroceryListCheck } = useAppContext();

  return (
    <div className="flex flex-col gap-2 items-center py-4">
      <h3 className="text-2xl font-bold text-center my-2">Grocery List</h3>
      <div className="bg-white rounded-md p-4 border border-gray-300 shadow-md w-full max-w-fit min-w-96 max-h-[80vh] overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left pb-2 px-2"></th>
              <th className="text-left pb-2 px-2">Item</th>
              <th className="text-left pb-2 px-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(mealPlan?.groceryList || {})
              .sort((a, b) => (b[1].quantity || 0) - (a[1].quantity || 0))
              .map(([key, item]) => (
                <tr
                  key={key}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="p-2">
                    <input
                      onChange={(e) => {
                        handleGroceryListCheck(key, e.target.checked);
                      }}
                      type="checkbox"
                      checked={item.checked}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="p-2">
                    <span>{item.name}</span>
                  </td>
                  <td className="p-2">
                    {item.quantity && item.quantity > 0
                      ? `${item.quantity} `
                      : ""}
                    {item.units}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroceryListCard;
