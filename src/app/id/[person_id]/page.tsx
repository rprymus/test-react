export default function Page({ params }: { params: { person_id: string } }) {
  return <h1>Person {params.person_id}</h1>;
}
