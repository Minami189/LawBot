import classes from "../Styles/dashboard.module.css";
import fileIcon from "../assests/dashboard/fileIcon.png";
import bx_box from "../assests/dashboard/bx_box.png";
import FileText from "../assests/dashboard/FileText.png";
import Calendar from "../assests/dashboard/CalendarDots.png";
import Vector from "../assests/dashboard/Vector.png";

export default function Dashboard() {
  return (
    <div className={classes.DashboardContainer}>
      <div className={classes.Dashboard}>Dashboard</div>

      <div className={classes.dashboardText}>
        See your latest activities, analyzed documents, and insights at a
        glance. Stay organized and in control of your legal workflow.
      </div>

      <div className={classes.QuickActionsContainer}>
        <div className={classes.QuickActionsTitle}>Quick Actions</div>

        <div className={classes.QuickActionsButtons}>
          {/* Upload New Document */}
          <div className={classes.ActionBox}>
            <div className={classes.ActionContent}>
              <img
                src={fileIcon}
                alt="file icon"
                className={classes.ActionIcon}
                onClick={() => console.log("Upload New Document clicked")}
              />
              <span className={classes.ActionText}>Upload New Document</span>
            </div>
          </div>

          {/* View Document History */}
          <div className={classes.ActionBox}>
            <div className={classes.ActionContent}>
              <img
                src={bx_box}
                alt="box icon"
                className={classes.ActionIcon}
                onClick={() => console.log("View Document History clicked")}
              />
              <span className={classes.ActionText}>View Document History</span>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.RecentSummariesContainer}>
        <div className={classes.RecentSummariesTitle}>Recent Summaries</div>

        <div className={classes.summaryCard}>
          <div className={classes.summaryHeader}>
            <div className={classes.summaryTitle}>
              Employment Contract - Jordan Poole
            </div>
            <div className={classes.summaryDescription}>
              Topics covered: Legal employment agreement with terms and
              conditions...
              <div className={classes.filesDetailsContainer}>
                <div className={classes.summaryDate}>
                  <img src={Calendar} alt="Calendar" className={classes.icon} />
                  November 05, 2025
                </div>
                <div className={classes.fileType}>
                  <img src={Vector} alt="Calendar" className={classes.icon} />
                  PDF
                </div>
              </div>
            </div>
          </div>
          <div className={classes.statusBadge}>
            <span className={classes.statusIcon}>✓</span>
            Success
          </div>
        </div>
      </div>
    </div>
  );
}
