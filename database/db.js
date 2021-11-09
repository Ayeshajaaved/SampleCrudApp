const { knexSQL } = require("./knexSQL");

let listOfTasks = () => {
  knexSQL
    .select("*")
    .from("SampleApiTasks")
    .then(function (tasks) {
      tasks.forEach((task) => {
        console.log({ ...task });
      });
    })
    .catch(function (err) {
      console.log(err);
    })
    .finally(function () {
      knexSQL.destroy();
    });
};

module.exports = listOfTasks;
