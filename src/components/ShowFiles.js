import './ShowFilesStyle.css'
function ShowFiles({list}){
    const myfiles=()=>{
        console.log(list);
    }
    return <>
    <h1>List of files</h1>
    <section>
        {
            list.map((item)=>{
                return(<div className='file'>
                    {item}
                </div>);
            })
        }
        <button onClick={myfiles}>Showfiles</button>
    </section>
    </>
}
export default ShowFiles;