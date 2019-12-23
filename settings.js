// set time bounds 
function Time ( dateTimeStart, dateTimeEnd ) {
    this.dateTimeStart = dateTimeStart;
    this.dateTimeEnd = dateTimeEnd; 
};

// determine duration
Time.prototype.getDuration = function () {
    // check & ensure datetime format
    let timeStart = this.dateTimeStart.toISOString();
    let timeEnd   = this.dateTimeStart.toISOString();

    // compute difference
    return timeEnd - timeStart
    
};

module.exports = Time;
