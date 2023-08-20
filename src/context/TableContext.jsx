import { createContext, useState, useEffect } from "react";
import {
  Regions,
  generateRandomSeed,
  introduceErrors,
  generateRandomUsersFactory,
  calculatePageSeed,
} from "../utils";

export const TableContext = createContext({
  region: {},
  setRegion: () => {},
  users: [],
  erroredUsers: [],
  incrementPage: () => {},
  errorAmount: 0,
  setErrorAmount: () => {},
  setUserSeed: () => {},
  userSeed: 0,
});

const USERS_PER_PAGE = 10;
const FIRST_PAGE_SIZE = 20;

export function TableProvider({ children }) {
  const [region, setRegion] = useState(Regions.US);
  const [errorAmount, setErrorAmount] = useState(0);
  const [page, setPage] = useState(1);
  const [userSeed, setUserSeed] = useState(0);
  const [users, setUsers] = useState([]);
  const [erroredUsers, setErroredUsers] = useState([]);
  const [generateRandomUser, setGenerateRandomUser] = useState(null);

  useEffect(() => {
    setUserSeed(generateRandomSeed());
  }, []);

  const fetchUsers = (pageSize = USERS_PER_PAGE, pageNum) => {
    applySeed(pageNum);
    const newUsers = Array.from({ length: pageSize }, () =>
      generateRandomUser()
    );
    applySeed(pageNum);
    const newErrorUsers = introduceErrors(newUsers, errorAmount, region);
    return {
      newUsers,
      newErrorUsers,
    };
  };

  useEffect(() => {
    setGenerateRandomUser(() => generateRandomUsersFactory(region.faker));
  }, [region, userSeed]);

  const incrementPage = () => {
    const { newErrorUsers, newUsers } = fetchUsers(USERS_PER_PAGE, page + 1);
    setPage(page + 1);
    setUsers([...users, ...newUsers]);
    setErroredUsers([...erroredUsers, ...newErrorUsers]);
  };

  useEffect(() => {
    if (generateRandomUser) {
      const { newErrorUsers, newUsers } = fetchUsers(20, 1);
      setPage(1);
      setUsers(newUsers);
      setErroredUsers(newErrorUsers);
    }
  }, [generateRandomUser]);

  function getUsersByPage(pageNum) {
    const startIndex =
      pageNum === 1 ? 0 : FIRST_PAGE_SIZE + (pageNum - 2) * USERS_PER_PAGE;
    const endIndex = FIRST_PAGE_SIZE + (pageNum - 1) * USERS_PER_PAGE;
    const normalUsers = users.slice(startIndex, endIndex);
    return normalUsers;
  }

  function applySeed(pageNum) {
    console.log({ ...region });
    const pageSeed = calculatePageSeed(pageNum, userSeed);
    region.faker.seed(pageSeed);
  }

  function getErroredUsers(untilPage) {
    const erroredUsers = [];
    for (let i = 1; i <= untilPage; i++) {
      applySeed(i);
      const normalUsers = getUsersByPage(i);
      const newErrorUsers = introduceErrors(normalUsers, errorAmount, region);
      erroredUsers.push(...newErrorUsers);
    }
    return erroredUsers;
  }

  useEffect(() => {
    if (generateRandomUser) {
      const newErrorUsers = getErroredUsers(page);
      setErroredUsers(newErrorUsers);
    }
  }, [errorAmount]);

  return (
    <TableContext.Provider
      value={{
        region,
        setRegion,
        users,
        erroredUsers,
        incrementPage,
        errorAmount,
        setErrorAmount,
        setUserSeed,
        userSeed,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
