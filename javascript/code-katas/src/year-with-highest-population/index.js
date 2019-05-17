export function bruteForce (people) {
  const years = people.reduce((obj, [birthYear, deathYear]) => {
    while (birthYear <= deathYear) {
      obj[birthYear] = (obj[birthYear] || 0) + 1
      birthYear++
    }
    return obj
  }, {})

  const bestYear = Number(
    Object.entries(years)
      .sort(compareYearEntries)
      .reduce(([bestYear, bestPopulation], [year, population]) => {
        if (bestPopulation < population) {
          return [year, population]
        } else {
          return [bestYear, bestPopulation]
        }
      })[0]
  )

  return bestYear

  // code for if we had to find the best span of years
  // const bestYears = [bestYear]
  // let currYear = bestYear + 1
  // while (years[currYear] === years[bestYear]) {
  //   bestYears.push(currYear)
  //   currYear++
  // }

  // return bestYears
}

export function timeline (people) {
  const years = people.reduce(
    (dict, [birthYear, deathYear]) => ({
      ...dict,
      [birthYear]: (dict[birthYear] || 0) + 1,
      [deathYear + 1]: (dict[deathYear + 1] || 0) - 1,
    }),
    {}
  )

  const { bestYear } = Object.entries(years)
    .sort(compareYearEntries)
    .reduce(
      (dict, [year, populationIncrease]) => {
        dict.runningSum += populationIncrease

        if (dict.peakPopulation < dict.runningSum) {
          dict.peakPopulation = dict.runningSum
          dict.bestYear = year
        }

        return dict
      },
      {
        runningSum: 0,
        peakPopulation: -1,
        bestYear: -1,
      }
    )

  return Number(bestYear)
}

function compareYearEntries ([firstYear], [secondYear]) {
  return firstYear - secondYear
}
