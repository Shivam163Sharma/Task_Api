'use client'
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";

export default function Component() {
  const [apiData, setApiData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchApiData();
  }, []);

  const fetchApiData = async () => {
    try {
      const response = await fetch("https://api.publicapis.org/entries");
      const data = await response.json();
      setApiData(data.entries);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredData = apiData.filter(entry =>
    entry.API.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="flex-1 ml-auto sm:flex-initial">
            <div className="relative">
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] border-b border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Search..."
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
          </form>
          <Button className="rounded-full" size="icon" variant="ghost">
            {/* User menu button */}
          </Button>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh - _theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="flex flex-col gap-4">
          <Card>
            
            <CardContent className="p-0">
              <div className="grid w-full grid-cols-3 gap-0.5">
                {/* Search content */}
              </div>
            </CardContent>
          </Card>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{entry.API}</TableCell>
                    <TableCell>{entry.Description}</TableCell>
                    <TableCell>{entry.Category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
