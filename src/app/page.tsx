"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { fetchPeople } from "@/lib/api";

import { capitalizeFirstLetter } from "@/lib/utils";

import type { Person, TableHeaders } from "@/lib/types";

function TableCell({
  children,
  isClickable = false,
}: {
  children: React.ReactNode;
  isClickable?: boolean;
}) {
  const [isClicked, setIsClicked] = useState(false);

  const [cellStyle, setCellStyle] = useState({
    color: "inherit",
    cursor: isClickable ? "pointer" : "default",
  });

  const onCellClick = () => {
    if (!isClickable) {
      return;
    }

    if (!isClicked) {
      setCellStyle({ color: "red", cursor: "pointer" });
    } else {
      setCellStyle({ color: "inherit", cursor: "pointer" });
    }

    setIsClicked(!isClicked);
  };

  return (
    <td
      className="p-1 @md:p-4 border border-1 text-sm @sm:text-base"
      style={cellStyle}
      onClick={onCellClick}
    >
      {children}
    </td>
  );
}
function TableActionCell({
  props,
  onClick,
}: {
  props: any;
  onClick: (props: any) => {};
}) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 @sm:px-4 rounded"
      onClick={() => onClick(props)}
    >
      Details
    </button>
  );
}

function TableHeader({
  headers,
  itemsPerRow = 1,
}: {
  headers: TableHeaders;
  itemsPerRow?: number;
}) {
  return (
    <thead>
      <tr className="bg-gray-300 text-sm @sm:text-base">
        {[...Array(itemsPerRow)].map(() =>
          headers.map((tableHeader) => (
            <th key={tableHeader.name} className="p-1 border border-1">
              {capitalizeFirstLetter(tableHeader.name)}
            </th>
          )),
        )}
      </tr>
    </thead>
  );
}

function TableRow({
  people,
  headers,
  itemsPerRow = 1,
}: {
  people: Person[];
  headers: TableHeaders;
  itemsPerRow?: number;
}) {
  const rows = [];

  for (let i = 0; i < people.length; i += itemsPerRow) {
    rows.push(people.slice(i, i + itemsPerRow));
  }

  return rows.map((row, rowIndex) => (
    <tr key={rowIndex}>
      {row.map((person: Person) =>
        headers.map((header, colIndex) =>
          header.component ? (
            <TableCell key={header.name} isClickable={header.name === "name"}>
              <div className="flex justify-center">
                <header.component
                  props={rowIndex + colIndex}
                  onClick={header.action}
                />
              </div>
            </TableCell>
          ) : (
            <TableCell key={header.name} isClickable={header.name === "name"}>
              {person[header.name as keyof Person]}
            </TableCell>
          ),
        ),
      )}
    </tr>
  ));
}

function TableBody({
  people,
  headers,
  itemsPerRow = 1,
}: {
  people: Person[];
  headers: TableHeaders;
  itemsPerRow?: number;
}) {
  return <tbody>{TableRow({ people, headers, itemsPerRow })}</tbody>;
}

function Table({
  people,
  headers,
  className = "",
  itemsPerRow = 1,
}: {
  people: Person[];
  headers: TableHeaders;
  className?: string;
  itemsPerRow?: number;
}) {
  return (
    <div className={className}>
      <table>
        <TableHeader headers={headers} itemsPerRow={itemsPerRow} />
        <TableBody
          people={people}
          headers={headers}
          itemsPerRow={itemsPerRow}
        />
      </table>
    </div>
  );
}

export default function Home() {
  const router = useRouter();

  const [people, setPeople] = useState<Person[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const tableHeaders = [
    { name: "name" },
    { name: "height" },
    { name: "skin_color" },
    {
      name: "action",
      component: TableActionCell,
      action: (index: number) => {
        router.push(`/id/${index}`);
      },
    },
  ] as TableHeaders;

  useEffect(() => {
    setIsLoading(true);

    fetchPeople({
      onSuccess: (response) => {
        setPeople(response.results);
        setIsLoading(false);
      },
      onError: (error) => {
        console.error(error);
        setIsLoading(false);
      },
    });
  }, []);

  return (
    <main className="flex w-full justify-center h-full p-4 lg:p-12">
      <div className="flex w-full max-w-screen-2xl justify-center overflow-hidden">
        {isLoading ? (
          <div className="w-full flex justify-center text-2xl ">
            Fetching data...
          </div>
        ) : (
          <div className="resizable-container @container w-full">
            <Table
              className="w-full hidden @5xl:table"
              people={people}
              headers={tableHeaders}
              itemsPerRow={2}
            />
            <Table
              className="w-full @5xl:hidden"
              people={people}
              headers={tableHeaders}
            />
          </div>
        )}
      </div>
    </main>
  );
}
