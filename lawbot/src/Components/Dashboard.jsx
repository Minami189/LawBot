import classes from "../Styles/dashboard.module.css";
import fileIcon from "../assests/dashboard/fileIcon.png";
import bx_box from "../assests/dashboard/bx_box.png";
import FileText from "../assests/dashboard/FileText.png";
import Calendar from "../assests/dashboard/CalendarDots.png";
import Vector from "../assests/dashboard/Vector.png";
import Folder from "../assests/dashboard/Folder.png";
import Drives from "../assests/dashboard/HardDrives.png";
import SealCheck from "../assests/dashboard/SealCheck.png";
import { useFileUpload } from "./functions/useFileUpload";
import { useContext } from "react";
import { AppContext } from "../App";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { withBase } from "./functions/withBase";


export default function Dashboard() {
  const { userToken } = useContext(AppContext);
  const savedUserToken = localStorage.getItem("userInfo");
  const navigate = useNavigate();

  let userEmail;
  if(savedUserToken){
    const decodedToken = jwtDecode(savedUserToken);
    userEmail = decodedToken.email;
  }else{
    userEmail = jwtDecode(userToken).email;
  }
  
  const upload = useFileUpload(async(file) => {
    const fileData = new FormData();
    console.log(file);

    fileData.append("file", file, file.name);  
    fileData.append("userEmail", userEmail);
    
    const response = await fetch("http://localhost/backend/upload.php", {
      method: "POST",
      body: fileData
    });

    const data = await response.json();
    console.log(data);
  });

  function handleSummarize(){
    console.log("summarize open modal");
  }

  return (
    <div className={classes.DashboardContainer}>
      <div className={classes.Dashboard}>Dashboard</div>

      <div style={{display:"flex", alignItems:"center", gap:15}}>
        <img src={SealCheck}></img>
        <div className={classes.dashboardText}>
          See your latest activities, analyzed documents, and insights at a
          glance. Stay organized and in control of your legal workflow.
        </div>
      </div>


      {/* NEW FLEX WRAPPER */}
      <div className={classes.DashboardMainContent}>
        {/* LEFT SIDE */}
        <div className={classes.LeftSection}>
          <div className={classes.QuickActionsContainer}>
            <div className={classes.QuickActionsTitle}>Quick Actions</div>
            <div className={classes.QuickActionsButtons}>

              <div className={classes.QuickActionsTop}>
                {/* Upload New Document */}
                <div className={classes.ActionBox}>
                  {/*input para mapagana file upload no need visible*/}
                  <input {...upload.getInputProps()} style={{ display: "none" }} />
                  {/*eto nyan yung clickable para sa upload*/}
                  <div className={classes.ActionContent} onClick={upload.open}>
                    <img
                      src={fileIcon}
                      alt="file icon"
                      className={classes.ActionIcon}
                    />
                    <span className={classes.ActionText}>
                      Upload New Document
                    </span>
                  </div>
                </div>

                {/* View Document History */}
                <div className={classes.ActionBox}>
                  <div className={classes.ActionContent} onClick={()=>{console.log("click");navigate(withBase("/logs"))}}>
                    <img
                      src={bx_box}
                      alt="box icon"
                      className={classes.ActionIcon}
                    />
                    <span className={classes.ActionText}>
                      View Document History
                    </span>
                  </div>
                </div>
                
              </div>
              <div className={`${classes.ActionBox} ${classes.ActionBoxFullWidth}`}>
                <div className={classes.ActionContent} onClick={handleSummarize}>
                  <img
                    src={fileIcon}
                    alt="file icon"
                    className={classes.ActionIcon}
                  />
                  <span className={classes.ActionText}>
                    Summarize a Document
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div className={classes.RecentSummariesContainer}>
            <div className={classes.RecentSummariesTitle}>Recent Summaries</div>

            <div className={classes.summaryCard}>
              {/* LEFT SIDE  Summaries*/}
              <div className={classes.summaryLeft}>
                <div className={classes.summaryTitle}>
                  Employment Contract - Jordan Poole
                </div>

                <div className={classes.summaryDescription}>
                  Topics covered: Legal employment agreement with terms and
                  conditions...
                </div>

                <div className={classes.filesDetailsContainer}>
                  <div className={classes.summaryDate}>
                    <img
                      src={Calendar}
                      alt="Calendar"
                      className={classes.icon}
                    />
                    November 05, 2025
                  </div>

                  <div className={classes.fileType}>
                    <img
                      src={Vector}
                      alt="File Type"
                      className={classes.icon}
                    />
                    PDF
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE Summaries*/}
              <div className={classes.statusBadge}>
                <span className={classes.statusIcon}>✓</span>
                Success
              </div>
              
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={classes.RightSection}>
          <div className={classes.UsageStatsContainer}>
            <div className={classes.UsageStatsHeader}>
              <h3 className={classes.UsageStatsTitle}>Usage Statistics</h3>
            </div>

            <div className={classes.UsageStatsItem}>
              <div className={classes.UsageStatsText}>
                <span className={classes.UsageStatsLabel}>
                  Documents Processed
                </span>
                <span className={classes.UsageStatsNumber}>24</span>
                <span className={classes.UsageStatsInfo}>
                  +14% from last period
                </span>
              </div>
              <img
                src={Folder}
                alt="Folder"
                className={classes.UsageIconImage}
              />
            </div>

            <div className={classes.UsageStatsItem}>
              <div className={classes.UsageStatsText}>
                <span className={classes.UsageStatsLabel}>Storage Used</span>
                <span className={classes.UsageStatsNumber}>1.1 gb</span>
                <div className={classes.UsageBar}>
                  <div className={classes.UsageBarFill}></div>
                </div>
                <span className={classes.UsageStatsInfo}>
                  47% of 2.5 gb limit
                </span>
              </div>
              <img
                src={Drives}
                alt="Drives"
                className={classes.UsageIconImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}