
const Course = ({course}) => {

const Header = ({name}) => {
  return (
      <h1>{name}</h1>
  )
}

const Content = ({parts}) => {

  console.log('content:', {parts})

const Part = ({part}) => {
  console.log('Part: ', {part})
  return (
      <p>
        {part.name} {part.exercises}
      </p>
  )
}

  return (
        <ul>
          {parts.map(part =>  
          <Part key= {part.id} part ={part} />
          )}
        </ul>
  )

}

return (
  <div>
    <Header name={course.name}/>
    <Content parts={course.parts}/> 
  </div>
)
}

/*
const Total = (props) => {
  console.log('Total', props)
  return (
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )

}
  */


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      }  ,
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }

    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App