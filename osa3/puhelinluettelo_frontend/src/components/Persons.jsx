const Persons = ({persons, filter, remove}) => {

    const Person = ({person, remove}) => {

        return (
            <li>
            {person.name} {person.number} 
            <button onClick={remove}>delete</button>
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
                remove={() => remove(person)}
            /> )}
        </>
    )
}

export default Persons