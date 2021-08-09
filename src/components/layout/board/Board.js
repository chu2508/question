import React from "react";
import './Board.css'

function Board({ jobs }) {
    const displayDateAndTime = (date, option) => {
        var dt = new Date(date);
        var DD = ("0" + dt.getDate()).slice(-2);
        var MM = ("0" + (dt.getMonth() + 1)).slice(-2);
        var YYYY = dt.getFullYear();
        var hh = ("0" + dt.getHours()).slice(-2);
        var mm = ("0" + dt.getMinutes()).slice(-2);
        switch (option) {
          case "time":
            return hh + ":" + mm;
          case "date":
            return YYYY + "-" + MM + "-" + DD;
          default:
            return YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm;
        }
      };
  return (
    <div className="board-content">
      <div className="board-content--left">
        {jobs.map((item,ind)=>{
            return(
                <div className="card" key={ind}>
          <div className="card-content">
            <div className="card-content--header">
              <h3>
                {item.name}
                <span>{`(Job #${item.id})`}</span>
              </h3>
              <span>{item.location}</span>
            </div>
            <div className="card-content--time">
              <div>{displayDateAndTime(item.start, "date")}</div>
              <div>
                {displayDateAndTime(item.start, "time")}-
                {displayDateAndTime(item.end, "time")}
              </div>
            </div>
          </div>

          {item.allocations > 0 && (
            <div className="card__circle">
              <div className="card__circle--element">{item.allocations}</div>
            </div>
          )}
        </div>
      
            )
        })}
      </div>
      <div className="board-content--right">
        <div className="job-detail">
          <div className="job-detail__block"></div>
          <div className="job-detail__block"></div>
          <div className="job-detail__block"></div>
        </div>
      </div>
    </div>
  );
}

export default Board;
