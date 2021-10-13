import './styles.scss'

const ResultAnimation = ({ type }) => {
    return (
        <section class="c-container">
  
        {type === 'success' && <div class="o-circle c-container__circle o-circle__sign--success">
            <div class="o-circle__sign"></div>  
        </div>}   
        
        {type === 'failure' && <div class="o-circle c-container__circle o-circle__sign--failure">
            <div class="o-circle__sign"></div>  
        </div>}
        
        </section>
    )
}

export default ResultAnimation