"use client";

import { useState, useEffect } from "react";
import type { Person, Film, FilmPartialData } from "@/lib/types";
import { fetchPerson, fetchFilm } from "@/lib/api";

function FilmsTable({ films }: { films: string[] }) {
  const [filmDetails, setFilmDetails] = useState<Film[] | FilmPartialData[]>(
    films.map((film) => ({ url: film, isFetching: true, title: "" })),
  );

  useEffect(() => {
    films.forEach((film) => {
      fetchFilm({
        id: parseInt(film.split("/").slice(-2)[0], 10),
        onSuccess: (data) => {
          setFilmDetails((prev: Film[] | FilmPartialData[]) => {
            const index = prev.findIndex((f) => f.url === data.url);
            if (index === -1) {
              return prev;
            }
            const updated = [...prev];
            updated[index] = data;
            return updated;
          });
        },
      });
    });
  }, []);

  return (
    <ul>
      {filmDetails.map((film: Film | FilmPartialData, index) =>
        film.isFetching ? (
          <li key={index}>Fetching film...</li>
        ) : (
          <li key={index}>{film.title}</li>
        ),
      )}
    </ul>
  );
}

export default function Page({ params }: { params: { person_id: string } }) {
  const [person, setPerson] = useState<Person | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!params.person_id || isNaN(parseInt(params.person_id, 10))) {
      setIsError(true);

      return;
    }

    fetchPerson({
      id: parseInt(params.person_id, 10),
      onSuccess: (data) => {
        setPerson(data);
      },
      onError: () => {
        setIsError(true);
      },
    });
  }, []);

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (!person) {
    return <div>Fetching data...</div>;
  }

  return (
    <div className="bg-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-4">Person Details</h1>
      {person ? (
        <div>
          <div>
            <span className="font-bold">Name: </span>
            <span>{person.name}</span>
          </div>
          <div>
            <span className="font-bold">Height: </span>
            <span>{person.height}</span>
          </div>
          <div>
            <span className="font-bold">Mass: </span>
            <span>{person.mass}</span>
          </div>
          <div>
            <span className="font-bold">Hair Color: </span>
            <span>{person.hair_color}</span>
          </div>
          <div>
            <span className="font-bold">Skin Color: </span>
            <span>{person.skin_color}</span>
          </div>
          <div>
            <span className="font-bold">Eye Color: </span>
            <span>{person.eye_color}</span>
          </div>
          <div>
            <span className="font-bold">Birth Year: </span>
            <span>{person.birth_year}</span>
          </div>
          <div>
            <span className="font-bold">Gender: </span>
            <span>{person.gender}</span>
          </div>
          <div>
            <span className="font-bold">Homeworld: </span>
            <a href={person.homeworld}>{person.homeworld}</a>
          </div>
          <div>
            <span className="font-bold">Films: </span>
            <FilmsTable films={person.films} />
          </div>
          <div>
            <span className="font-bold">Vehicles: </span>
            <ul>
              {person.vehicles.map((vehicle, index) => (
                <li key={index}>
                  <a href={vehicle}>{vehicle}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-bold">Starships: </span>
            <ul>
              {person.starships.map((starship, index) => (
                <li key={index}>
                  <a href={starship}>{starship}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-bold">Created: </span>
            <span>{person.created}</span>
          </div>
          <div>
            <span className="font-bold">Edited: </span>
            <span>{person.edited}</span>
          </div>
          <div>
            <span className="font-bold">URL: </span>
            <a href={person.url}>{person.url}</a>
          </div>
        </div>
      ) : (
        <div>Fetching data...</div>
      )}
    </div>
  );
}
