import { StationList } from "./StationList";
import { useState } from "react";

export function Catalog({ showAll, onShowAll }) {

  function handleShowAll(value) {
    if (value === showAll)
      onShowAll(null)
    else
      onShowAll(value)
  }

  return (

    <div className="catalog">

      {(showAll === 'list1' || showAll === null) &&
        <>
          <div className="title-container">
            <h3>Made for you</h3>
            <a className="show-all-link" onClick={() => handleShowAll('list1')}>{showAll ? "Show Less" : "Show All"}</a>
          </div>
          <StationList width={200} randomize={true} KeepInOneRow={showAll ? false : true} />
        </>}

      {(showAll === 'list2' || showAll === null) &&
        <>
          <div className="title-container">
            <h3>Yout top mixes</h3>
            <a className="show-all-link" onClick={() => handleShowAll('list2')}>{showAll ? "Show Less" : "Show All"}</a>
          </div>
          <StationList randomize={true} KeepInOneRow={showAll ? false : true} />
        </>}

      {(showAll === 'list3' || showAll === null) &&
        <>
          <div className="title-container">
            <h3>Recently played</h3>
            <a className="show-all-link" onClick={() => handleShowAll('list3')}>{showAll ? "Show Less" : "Show All"}</a>
          </div>
          <StationList randomize={true} KeepInOneRow={showAll ? false : true} />
        </>}

    </div>
  );
}
