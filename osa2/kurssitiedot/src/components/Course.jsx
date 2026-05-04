
const Course = ({course}) => {

const Header = ({name}) => {
  return (
      <h2>{name}</h2>
  )
}

const Content = ({parts}) => {

const Part = ({part}) => {
  return (
      <p>
        {part.name} {part.exercises}
      </p>
  )
}

  return (
        <>
          {parts.map(part =>  
          <Part key= {part.id} part ={part} />
          )}
        </>
  )

}

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 
  0)

  return (
    <>
    {total}
    </>  
  )

}

return (
  <div>
    <Header name={course.name}/>
    <Content parts={course.parts}/> 
    <b>Total of <Total parts={course.parts}/> exercises</b>
  </div>
)
}
export default Course