"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import SearchBar from "./SearchBarComponent";
import UserList from "./userListComponent";

export type GitHubUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string;
  location?: string;
  bio?: string;
  public_repos: number;
  followers: number;
  following: number;
  starred_count?: number;
};

export default function GitHubUserSearch() {
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const [location, setLocation] = useState<string | "">("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchAllStarredRepos = async (username: string) => {
    let starredCount = 0;
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await fetch(
        `https://api.github.com/users/${username}/starred?page=${page}&per_page=100`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch starred repositories");

      const starredData = await response.json();
      starredCount += starredData.length;

      // Check if there are more pages
      const linkHeader = response.headers.get("link");
      if (linkHeader && linkHeader.includes('rel="next"')) {
        page++;
      } else {
        hasNextPage = false;
      }
    }

    return starredCount;
  };

  const searchUsers = async (resetUsers = true) => {
    if (!location) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=location:${encodeURIComponent(
          location,
        )}&page=${resetUsers ? 1 : page}&per_page=12`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setTotalCount(data.total_count);

      if (data.items.length === 0) {
        setError("No users found for this location");
        setUsers([]);
      } else {
        const userDetails = await Promise.all(
          data.items.map(async (user: { login: string }) => {
            const userResponse = await fetch(
              `https://api.github.com/users/${user.login}`,
              {
                headers: {
                  Authorization: `token ${GITHUB_TOKEN}`,
                },
              },
            );
            const userData = await userResponse.json();

            const starredCount = await fetchAllStarredRepos(user.login);

            return { ...userData, starred_count: starredCount };
          }),
        );

        setUsers(resetUsers ? userDetails : [...users, ...userDetails]);

        setPage(resetUsers ? 2 : page + 1);
      }
    } catch (err) {
      setError("An error occurred while fetching users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8'
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className='max-w-3xl mx-auto'>
        <div>
          <div className='flex items-center justify-center'>
            <Image
              src='/logo.svg'
              alt='Linkedev Logo'
              width={50}
              height={50}
              className='mr-4'
            />
            <h1 className='text-3xl md:text-6xl font-mono font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-500'>
              Linkedev
            </h1>
          </div>
          <p className='text-gray-700 text-lg font-bold text-center mb-8'>
            Search for Developers based on location
          </p>
        </div>

        <SearchBar
          location={location}
          setLocation={setLocation}
          searchUsers={searchUsers}
          loading={loading}
        />
        <p className='text-lg text-gray-200 font-mono mb-8'>
          Total Search Results for location-
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400'>
            {location}
          </span>
          : {totalCount}
        </p>

        {error && <p className='text-red-400 mb-4 text-center'>{error}</p>}

        {location ? (
          users.length > 0 ? (
            <UserList users={users} />
          ) : (
            !loading && (
              <p className='text-gray-400 mt-8 text-center'>
                No users found. Try another search.
              </p>
            )
          )
        ) : (
          <p className='text-gray-400 mt-8 text-center'>
            Please enter a location in the search bar to find GitHub users in
            that area.
          </p>
        )}

        {users.length > 0 && !loading && (
          <Button
            onClick={() => searchUsers(false)}
            className='mt-8 mx-auto block bg-gray-800 hover:bg-gray-700 text-white'
          >
            Load More
          </Button>
        )}

        {loading && (
          <div className='flex justify-center mt-16'>
            <Loader2 className='h-32 w-32 animate-spin text-purple-600' />
          </div>
        )}
      </div>
    </div>
  );
}
