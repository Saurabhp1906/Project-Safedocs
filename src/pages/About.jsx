import "./AboutStyle.css";
export default function About() {
  return (
    <div className="aboutpage">
      <div className="abouttitle">SafeDocs Features and benefits</div>
      <div className="aboutsection">
        <div className="aboutfeatures"><div className="blueline"></div><div className="makespan"><h2>Document sharing</h2> You can share the documents using a share link that can be sent to others on any platform.</div></div>

        <div className="aboutfeatures"><h2>Google firebase</h2><p> Firebase is an app development platform that helps you build and grow apps and games users love. Backed by Google and trusted by millions of businesses around the world.</p></div>

        <div className="aboutfeatures"><h2>Password protected files</h2>Sharing files is secured by encrypting the files with a password so that only the person you trust can open the file.</div>
        
       
      </div>
      <div className="aboutsection">
        <div className="aboutfeatures"><div className="blueline"></div><h2>Categories for files</h2> Managing the documents is made easy by grouping the document according to their categories.</div>

        <div className="aboutfeatures"><h2>Easy to Use</h2><p>SafeDocs is easy to use application with a clean and easy to use user interface.</p></div>

        <div className="aboutfeatures"><h2>Availability</h2>SafeDocs stores the documents on the cloud storage, the cloud storage is anytime available to be accessed by the user.</div>
        
       
      </div>
    </div>
  );
}
