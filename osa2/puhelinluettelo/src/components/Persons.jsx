const Persons = ({persons, filter}) => {

    const Person = ({person}) => {

        return (
            <li>
            {person.name} {person.number}
            </li>
        )
    }

    return (
      <>
        {persons.
        filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).
          map(person => 
            <Person 
                key={person.name}
                person={person}
            /> )}
        </>
    )
}

export default Persons