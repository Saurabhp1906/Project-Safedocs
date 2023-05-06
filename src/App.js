import React, { useEffect, useState } from "react";
import "./App.css";
import Upload from "./components/Upload";
import UploadModal from "./components/UploadModal";
import styles from "./App.module.css";
import storage from "./base.js";
import { listAll, ref, list, uploadBytes } from "firebase/storage";
import ShowFiles from "./components/ShowFiles";
import FilesCategory from "./components/FilesCategory";

function App() {
		const [categoryArrayProp,setCategoryProp]=useState([]);
 
 

  // List All Files
  useEffect(() => {
    const setCategory = async () => {
					let count=0;
					const categoryArray=[];
      const allFiles=await list(ref(storage));
						allFiles.prefixes.forEach((refernceFolder)=>{
							const folderName=refernceFolder.name.toString();
							listAll(refernceFolder).then((res)=>{
								res.items.forEach((item)=>{
									count=count+1;
								})
								categoryArray.push(folderName+' '+count);
								count=0;
							})

						})
						setCategoryProp(categoryArray);
						console.log("useEffect called",categoryArray);
    };
    setCategory();
  }, []);

  return (
    <div>
      <h1 className="titlecolor">SafeDocs</h1>
      <FilesCategory categoryCount={categoryArrayProp} />
    </div>
  );
}

export default App;
