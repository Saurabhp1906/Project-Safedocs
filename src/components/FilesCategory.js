import "./FilesCategoryStyle.css";
import {storage,auth} from "../base.js";
import ShareModal from "./ShareModal";
import {
  listAll,
  ref,
  list,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useEffect, useState, useLayoutEffect,setUserEmail } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { onAuthStateChanged } from "firebase/auth";


function FilesCategory({ setUrl, setFileModal, uploadedFile,userEmail ,setUserEmail}) {
  const [filesToShow, setFilesToShow] = useState([]);
  const [a, setA] = useState(['Certificate','Education','Hospital','ID','Personal','Reciept','Work']);
  const [showShare, setShowShare] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [currentFolder, setCurrentFolder] = useState("Certificate");
  const [currentFile, setCurrentFile] = useState("");
  const [noFiles, setNoFiles] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStates, setSelectedStates] = useState({
    All: true,
    Education: false,
    Work: false,
    ID: false,
    Personal: false,
    Certificate: false,
    Reciept: false,
    Hospital: false,
  });

  const getFiles = async (event, folderupload) => {
    let folder;
    folder = event.target.id;
    Object.keys(selectedStates).forEach((item) => {
      if (item == folder) selectedStates[item] = true;
      else selectedStates[item] = false;
    });
    if (folder == "All") {
      console.log("All clicked and all files",allFiles,filesToShow);
      if (allFiles.length === 0 ) {
        setNoFiles(true);
        console.log("this is nofiles",noFiles);
      } else {
        setFilesToShow(allFiles);
        setNoFiles(false);
      }
      setCurrentFolder("All");
      return;
    }
    setCurrentFolder(folder);
    console.log(folder);
    const filesArray = [];
    const storageRef = ref(storage, userEmail+"/" + folder);
    const insideFiles = await listAll(storageRef);
    insideFiles.items.forEach((item) => {
      filesArray.push(userEmail+'/'+folder + "/" + item.name);
    });
    if (filesArray.length == 0) {
      setFilesToShow([]);
      setNoFiles(true);
    } else {
      setFilesToShow(filesArray);
      setNoFiles(false);
    }
    console.log("value of files to show", filesToShow);
  };

  const getfilesAtLoad = async () => {
    const currentuserEmail=localStorage.getItem('userEmail')
    console.log(localStorage.getItem('userEmail'),currentuserEmail)
    const filesArray = [];
    let storageRef = ref(storage, '/'+currentuserEmail+"/" + "Education");
    console.log('/'+currentuserEmail+"/" + "Education")
    let insideFiles = await listAll(storageRef);
    insideFiles.items.forEach((item) => {
      filesArray.push(currentuserEmail+"/" +"Education/" + item.name);
    });
    storageRef = ref(storage,'/'+currentuserEmail+ "/" + "ID");
    insideFiles = await listAll(storageRef);
    insideFiles.items.forEach((item) => {
      filesArray.push(currentuserEmail+"/" +"ID/" + item.name);
    });
    storageRef = ref(storage, '/'+currentuserEmail+"/" + "Certificate");
    insideFiles = await listAll(storageRef);
    insideFiles.items.forEach((item) => {
      filesArray.push(currentuserEmail+"/" +"Certificate/" + item.name);
    });
    storageRef = ref(storage,'/'+currentuserEmail+ "/" + "Personal");
    insideFiles = await listAll(storageRef);
    insideFiles.items.forEach((item) => {
      filesArray.push(currentuserEmail+"/" +"Personal/" + item.name);
    });
    storageRef = ref(storage,'/'+ currentuserEmail+"/" + "Reciept");
    insideFiles = await listAll(storageRef);
    insideFiles.items.forEach((item) => {
      filesArray.push(currentuserEmail+"/" +"Reciept/" + item.name);
    });
    storageRef = ref(storage,'/'+ currentuserEmail+"/" + "Work");
    insideFiles = await listAll(storageRef);
    insideFiles.items.forEach((item) => {
      filesArray.push(currentuserEmail+"/" +"Work/" + item.name);
    });
    storageRef = ref(storage,'/'+currentuserEmail+ "/" + "Hospital");
    insideFiles = await listAll(storageRef);
    insideFiles.items.forEach((item) => {
      filesArray.push(currentuserEmail+"/" +"Hospital/" + item.name);
    });
    storageRef = ref(storage,'/'+currentuserEmail+ "/" + "test");
    insideFiles = await listAll(storageRef);
    insideFiles.items.forEach((item) => {
      filesArray.push(currentuserEmail+"/" +"test/" + item.name);
    });

    if (filesArray.length == 0) {
      setFilesToShow([]);
      setNoFiles(true);
    } else {
      filesArray.sort();
      setFilesToShow(filesArray);
      setNoFiles(false);
    }
    setAllFiles(filesArray);
  };

  const openFile = (event) => {
    setCurrentFile(event.target.id);
    getDownloadURL(ref(storage, event.target.id))
      .then((Url) => setUrl(Url))
      .catch((error) => {
        alert(error);
      });
    setFileModal(true);
    console.log(currentFile);
  };
  const makeCategoryArray = async () => {
    const storageRef = ref(storage);
    const allFiles = await list(storageRef);
    const categoryJSON = [];
    allFiles.prefixes.forEach((referenceFolder) => {
      categoryJSON.push(referenceFolder.name.toString());
    });
    setA(categoryJSON);
    const selectJson = {};
    categoryJSON.forEach((item) => {
      selectJson[item] = false;
    });
    selectJson["Education"] = true;
    console.log("inside makecategory1", categoryJSON);
    return selectJson;
  };

  useEffect(() => {
   // makeCategoryArray();
    getfilesAtLoad();
  }, []);
  useEffect(()=>{
    
  },[]);
  useEffect(() => {
    if (uploadedFile != "") {
      let tempArray = [uploadedFile];
      if (filesToShow.length == 0) setNoFiles(false);
      console.log(tempArray);
      setFilesToShow((files) => [...tempArray, ...files]);
      setAllFiles((files) => [...tempArray, ...files]);

      console.log("UseEffect called for uploadedFile: ", uploadedFile);
    }
  }, [uploadedFile]);

  const deleteFile = async (event) => {
    setLoading(true);
    const filePath = event.target.id;
    const desertRef = ref(storage, filePath);
    let filesArray = [];
    setFilesToShow(filesToShow.filter((item) => item != filePath));
    setAllFiles(allFiles.filter((item) => item != filePath));
    if (filesToShow.length == 0) setNoFiles(true);
    // Delete the file
    await deleteObject(desertRef);

    allFiles.pop(filePath);
    if (currentFolder == "All") await getfilesAtLoad();

    setLoading(false);
  };

  return (
    <div className="test">
      <h2>Your Files</h2>
      <div>
        <div className="categorySection">
          <div
            className={selectedStates["All"] ? "categoryDiv2" : "categoryDiv"}
            onClick={getFiles}
            id="All"
          >
            All
          </div>

          {a.map((item) => {
            return (
              <div
                className={
                  selectedStates[item] ? "categoryDiv2" : "categoryDiv"
                }
                key={item}
                onClick={getFiles}
                id={item}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <br></br>
      {noFiles && (
        <div className="noFiles">
          <div className="noFilesdiv">No Files!</div>
        </div>
      )}
      {/* {loading && (
        <div className="loading">
          <div className="centeredloading">loading</div>
        </div>
      )} */}
      {!noFiles && (
        <div className="list scroll container-fluid h-75">
          {filesToShow.map((item, index) => {
            return (
              <div className="container-fluid">
                <div
                  className="indexclass inline"
                  key={index}
                  id={item}
                  onClick={openFile}
                >
                  <div id={item} className="filedivname">
                    {index + 1 + ".      " + item.split("/")[2]}
                  </div>
                  <div className="filedivcategory" id={item}>
                    {item.split("/")[1]}
                  </div>
                </div>
                <button
                  className="inline1 btn btn-dark"
                  id={item}
                  onClick={deleteFile}
                >
                  Delete
                </button>
                <button
                  className="inline1 btn btn-success"
                  id={item}
                  onClick={(event) => {
                    setShowShare(true);
                    setCurrentFile(event.target.id);
                  }}
                >
                  Share
                </button>
              </div>
            );
          })}
        </div>
      )}
      {showShare && (
        <ShareModal setShowShare={setShowShare} currentFile={currentFile} />
      )}
    </div>
  );
}
export default FilesCategory;
