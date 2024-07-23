"use client";
import { useEffect } from "react";
import {
  fetchPeople,
  collection,
  status,
} from "@/lib/features/people/peopleSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Home() {
  const dispatch = useAppDispatch();
  const people = useAppSelector(collection);

  useEffect(() => {
    dispatch(fetchPeople());
  }, []);

  return <>init </>;
}
