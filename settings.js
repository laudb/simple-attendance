// set time bounds & be able to compare
// duration in hours
function Time ( timeStart ) {
    this.timeStart = timeStart;
    this.finalTime; 
};


Time.prototype.setFinalTime = function ( duration ) {

    // compute final time.

};

Time.prototype.compareTime = function ( time ) {

    // compare given time to see if lies within bounds.

};

module.exports = Time;
