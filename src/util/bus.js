function checkFilter(category,title,checked) {
  if (checked) {
    this[category].push(title);
  } else {
    let i = this[category].indexOf(title);
    if (i > -1) {
      this[category].splice(i,1);
    }
  }
};

function setDay(day) {
  this.day = day;
};

export { checkFilter, setDay };
