import "./Workers.scss";

export default function Workers(props) {
  const employees = props.bartenders;
  const employeesMap = employees.map((person, i) => <li key={i}>{person.name}</li>);

  return (
    <section className="workers">
      <h3>Employees on duty</h3>
      <ul>{employeesMap}</ul>
    </section>
  );
}
