import React from 'react';
import {listAll} from 'firebase/storage';


function Categories({categoryArrayProp}){

  const getFiles=(event)=>{
 const folderName=event.targer.id;
 listAll()

  }
    return(
        <div>
            <div className="categorySection">
        {categoryArrayProp.map((item) => {
         
          return (
            <div
              className="categoryDiv"
              key={item}
            //   onClick={getFiles}
              id={item}
            >
              {item}
            </div>
          );
        })}
      </div>
      
        </div>
    );
}
export default Categories;