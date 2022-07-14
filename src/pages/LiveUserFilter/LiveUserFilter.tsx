import { useEffect, useState, useTransition } from 'react';

interface User {
  id: number;
  name: {
    first: string;
    last: string;
  };
  location: {
    city: string;
    country: string;
  };
  picture: {
    large: string;
  };
}
export default function LiveUserFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(true);
  const [filters, setFilters] = useState<User[]>([]);

  useEffect(() => {
    setIsFetching(true);
    const fetchUsers = async () => {
      const response = await fetch('https://randomuser.me/api?results=50');
      const data = await response.json();
      setUsers(data.results);
      setIsFetching(false);
    };
    if (!searchTerm) fetchUsers();
  }, [searchTerm]);

  const handleSearchTermChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      const value = evt.target.value;
      setSearchTerm(value);
      if (value && users.length > 0) {
        const usersMatch = users.filter(
          (user) =>
            user.name.first.includes(value) ||
            user.name.last.includes(value) ||
            user.location.city.includes(value) ||
            user.location.country.includes(value)
        );
        setFilters(users);
        setUsers(usersMatch);
      } else {
        setUsers(filters);
      }
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#f8f9fd]">
      <div className="w-[300px] shadow-lg rounded-md">
        <div className="bg-[#3e57db] py-[30px] px-[20px] text-white">
          <h4 className="font-medium">Live User Filter</h4>
          <p className="opacity-80">Search by name or location</p>
          <input
            type="text"
            placeholder="Search"
            className="py-2 px-4 mt-3 rounded-3xl w-full outline-none bg-black opacity-80 text-white
            border-none"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>

        <ul className="max-h-[400px] overflow-y-auto">
          {isFetching ||
            (isPending && (
              <li className="flex p-5">
                <h4 className="font-medium">Loading...</h4>
              </li>
            ))}
          {users.map((user, i) => (
            <li className="flex p-5" key={i}>
              <img
                src={user.picture.large}
                alt={user.name.first}
                className="w-[50px] h-[50px] object-contain rounded-full"
              />
              <div className="flex flex-col ml-3">
                <h2 className="font-medium mb-2">
                  {user.name.first} {user.name.last}
                </h2>
                <p className="my-2">
                  {user.location.city}, {user.location.country}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
