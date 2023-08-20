import { useContext } from "react";
import { TableContext } from "../context/TableContext";
import InfiniteScroll from "react-infinite-scroll-component";

const generateFullName = (firstName, middleName, lastName, region) => {
  if (region.hasMiddleName && middleName) {
    return `${firstName} ${middleName} ${lastName}`;
  } else {
    return `${firstName} ${lastName}`;
  }
};

const DataTable = () => {
  const { erroredUsers, incrementPage, region } = useContext(TableContext);

  return (
    <InfiniteScroll
      dataLength={erroredUsers.length}
      next={incrementPage}
      hasMore={true}
      loader={<p>Loading...</p>}
      endMessage={<p>No more data to load.</p>}
    >
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Random Identifier</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {erroredUsers.map(
            ({
              id,
              index,
              firstName,
              middleName,
              lastName,
              address,
              phoneNumber,
            }) => (
              <tr key={id}>
                <td className="border px-4 py-2">{index}</td>
                <td className="border px-4 py-2">{id}</td>
                <td className="border px-4 py-2">
                  {generateFullName(firstName, middleName, lastName, region)}
                </td>
                <td className="border px-4 py-2">{address}</td>
                <td className="border px-4 py-2">{phoneNumber}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </InfiniteScroll>
  );
};

export default DataTable;
