
const Finder = ({text,onChange}) => {

    return ( 
          <div>
            find countries <input 
            value={text}
            onChange={onChange}  
          />
      </div>
    )   
}

export default Finder