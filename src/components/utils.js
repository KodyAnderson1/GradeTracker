export const groupAvg = (group) => {
  const actualArr = [];
  const potentialArr = [];

  Object.values(group).map((e) => {
    if (typeof e === "object") {
      actualArr.push(parseInt(e.actualGrade));
      potentialArr.push(parseInt(e.potentialGrade));
    }
  });

  const actualGradesReduced = actualArr.reduce((prev, curr) => prev + curr, 0);
  const potentialGradesReduced = potentialArr.reduce((prev, curr) => prev + curr, 0);

  return ((actualGradesReduced / potentialGradesReduced) * 100).toFixed(0);
};

export const courseAvg = (course) => {
  const initalSetup = Object.values(course).filter((e) => typeof e === "object");
  const weights = [];

  let groupAvgs = initalSetup
    .map((group) => {
      const total = groupAvg(group) * group.weight;
      if (!isNaN(total)) weights.push(group.weight);
      return total;
    })
    .filter((result) => !isNaN(result))
    .reduce((prev, curr) => prev + parseInt(curr), 0);

  const groupWeights = weights.reduce((prev, curr) => prev + parseInt(curr), 0);
  const courseGrade = groupAvgs / groupWeights;

  return isNaN(courseGrade) ? " " : courseGrade.toFixed(0) + "%";
};
