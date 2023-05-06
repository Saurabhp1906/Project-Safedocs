import "./FilesCategoryStyle.css";
function FilesCategory({ categoryCount }) {
    let categoryArray = ["Education", "ID"];
    return (
        <div className="categorySection">
       {
        categoryCount.map((item)=>{
            console.log("in Files category");
            return(
                <div className="categoryDiv" key={item}>{item}</div>
            )
        })
       }
   </div> );
}
export default FilesCategory;

