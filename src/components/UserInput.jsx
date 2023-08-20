import { useContext } from "react";
import { TableContext } from "../context/TableContext";
import { downloadCsv, generateRandomSeed } from "../utils";
import { Regions } from "../utils";
import Select from "react-select";

const options = Object.values(Regions).map((region) => ({
  value: region,
  label: region.label,
}));

const UserInput = () => {
  const {
    setErrorAmount,
    errorAmount,
    erroredUsers,
    region,
    setRegion,
    userSeed,
    setUserSeed,
  } = useContext(TableContext);

  const exportToCSV = () => {
    const csvContent = [
      "Index,Random Identifier,Name,Address,Phone",
      ...erroredUsers.map(
        (record) =>
          `${record.index},${record.id},${record.firstName} ${
            record.middleName ? record.middleName : ""
          } ${record.lastName},${record.address},${record.phoneNumber}`
      ),
    ].join("\n");

    downloadCsv("fake_user_data.csv", csvContent);
  };

  return (
    <div className="controls space-y-2 flex items-center justify-between gap-1 flex-wrap">
      <div className="flex items-center gap-2">
        <label
          htmlFor="region"
          className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
        >
          Select Region:
        </label>
        <Select
          id="region"
          value={options.find((option) => option.value === region)}
          onChange={(e) => setRegion(e.value)}
          options={options}
        />
      </div>
      <div className="flex items-center gap-2">
        <label
          htmlFor="errorAmount"
          className="block mb-2 text-xl font-medium text-gray-900 dark:text-white whitespace-nowrap"
        >
          Error Amount:
        </label>
        <input
          type="range"
          id="errorAmount"
          value={errorAmount}
          onChange={(e) => setErrorAmount(e.target.value)}
          min="0"
          max="10"
          className="w-full"
        />
      </div>
      <div className="flex items-center gap-4">
        <label
          htmlFor="seed"
          className="block mb-2 text-xl font-medium text-gray-900 dark:text-white whitespace-nowrap"
        >
          Seed Value:
        </label>
        <input
          type="number"
          id="seed"
          value={userSeed}
          onChange={(e) => {
            setUserSeed(e.target.value);
            console.log(e.target);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          onClick={() => setUserSeed(generateRandomSeed())}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Random
        </button>
      </div>
      <button
        id="export"
        onClick={exportToCSV}
        className="bg-green-500 text-white py-2 px-4 mt-2 rounded hover:bg-green-600"
      >
        Export to CSV
      </button>
    </div>
  );
};

export default UserInput;
