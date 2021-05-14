import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import DashboardBody from "./DashboardBody";
import store from "../../redux/store";
import Timer from "react-compound-timer";
import { fetchAuctionsInfo } from "../../redux/actions/fetchAuctionsInfo";
import { fetchTruckRequests } from "../../redux/actions/fetchTruckRequests";

const NO_AUCTIONS = "No auction in-progress or scheduled";
const AUCTION_IS_SCHEDULED = "Next scheduled auction in";
const AUCTION_IS_LIVE = "Auction is live and ending in";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardStatus: NO_AUCTIONS,
      aucStartTime: -1,
      aucEndTime: -1,
      aucTimingsString: "00:00:00",
    };
    this.props.fetchAuctionsInfo();
    this.props.fetchTruckRequests();
    store.subscribe(() => {
      if (store.getState().aucTimingIsLoading) {
        //To do: add loading spinner
      } else {
        let storeAucTimings = store.getState().firestore.aucTimings;
        if (
          storeAucTimings.StartTime !== this.state.aucStartTime ||
          storeAucTimings.EndTime !== this.state.aucEndTime
        ) {
          this.setState({
            aucStartTime: storeAucTimings.StartTime,
            aucEndTime: storeAucTimings.EndTime,
          });

          //Finding status based on newly fetched auction timings
          let currTime = new Date().getTime();
          if (
            currTime >= Number(storeAucTimings.StartTime) &&
            currTime < Number(storeAucTimings.EndTime)
          ) {
            this.setState({
              dashboardStatus: AUCTION_IS_LIVE,
            });
          } else if (currTime < Number(storeAucTimings.StartTime)) {
            this.setState({
              dashboardStatus: AUCTION_IS_SCHEDULED,
            });
          }
        }
      }
    });
  }

  componentDidMount() {}

  setDashboard() {
    switch (this.state.dashboardStatus) {
      case NO_AUCTIONS:
        return <h1 className="text-center">00:00:00</h1>;
      case AUCTION_IS_SCHEDULED:
        return (
          <React.Fragment>
            <Timer
              initialTime={this.state.aucStartTime - new Date().getTime()}
              direction="backward"
            >
              {() => (
                <React.Fragment>
                  <h1 className="text-center">
                    <Timer.Days />:<Timer.Hours />
                    :<Timer.Minutes />:<Timer.Seconds />
                  </h1>
                </React.Fragment>
              )}
            </Timer>
          </React.Fragment>
        );
      case AUCTION_IS_LIVE:
        return (
          <Timer
            initialTime={this.state.aucEndTime - new Date().getTime()}
            direction="backward"
          >
            {() => (
              <React.Fragment>
                <h1 className="text-center">
                  <Timer.Days />:<Timer.Hours />
                  :<Timer.Minutes />:<Timer.Seconds />
                </h1>
              </React.Fragment>
            )}
          </Timer>
        );
      default:
        return <h1 className="text-center">00:00:00</h1>;
    }
  }

  render() {
    return (
      <div>
        <div
          className="jumbotron jumbotron-fluid"
          style={{
            marginBottom: "0px",
          }}
        >
          <div className="container">
            <p className="dashboard-status-text">
              {this.state.dashboardStatus}
            </p>
            <div className="dashboard-status"></div>
            <div className="dashboard-timer">{this.setDashboard()}</div>
            <hr className="my-4"></hr>
            <p className="lead">
              Steps to conduct an auction: 1) Schedule auction, 2) Initialize
              auction 3) Conduct Auction 4) Add Bonus Time(optional step) and 5)
              Close Auction.
            </p>
          </div>
        </div>
        <DashboardBody />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    aucTimingIsLoading: state.firestore.aucTimingIsLoading,
    aucTimings: state.firestore.aucTimings,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAuctionsInfo: () => dispatch(fetchAuctionsInfo()),
    fetchTruckRequests: () => dispatch(fetchTruckRequests()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
