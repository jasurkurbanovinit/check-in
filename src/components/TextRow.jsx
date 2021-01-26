export const TextRow = ({sectionName, sectionValue="hello"})=> (
    <div className={'textRowContainer'}> 
        <div className={'sectionName'}>{sectionName}:</div>
        <div>{sectionValue}</div>    
    </div>
)