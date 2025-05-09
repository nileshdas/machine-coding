// Create a function that takes an array of promises and executes them sequentially, returning a single promise that resolves when all have been completed. Solution
const tasks = [task1, task2, task3, ...taskN];

export const callTasks = () => {
  return tasks.reduce((prev, task) => {
    return prev.then(task).catch((err) => {
      console.warn("err", err.message);
    });
  }, Promise.resolve());
};
