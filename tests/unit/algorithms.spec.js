import * as algorithms from "../../src/algorithms";
import { GenerateRandomDataSet, GenerateRandomNumber } from "../../src/utils";

describe("SortingAlgorithms", () => {
  const unorderedArray = [3, 2, 1, 4, 6, 5, 9, 7, 8];
  const orderedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const emptyFunction = () => {};

  //#region Simple Tests
  const sortOneTime = async (algorithmFunction, array, speed) => {
    await algorithmFunction(
      array,
      emptyFunction,
      emptyFunction,
      () => speed
      // This last thing is to make sure that the timeouts are 0.
      // It varies for each algorithm
    );
  };

  it("Bubble Sort sorts correctly", async () => {
    let resultArray = unorderedArray.slice();

    await sortOneTime(algorithms.BubbleSort, resultArray, 21);

    expect(resultArray).toEqual(orderedArray);
  });

  it("Selection Sort sorts correctly", async () => {
    let resultArray = unorderedArray.slice();

    await sortOneTime(algorithms.SelectionSort, resultArray, 21);

    expect(resultArray).toEqual(orderedArray);
  });

  it("Insertion Sort sorts correctly", async () => {
    let resultArray = unorderedArray.slice();

    await sortOneTime(algorithms.InsertionSort, resultArray, 21);

    expect(resultArray).toEqual(orderedArray);
  });

  it("Merge Sort sorts correctly", async () => {
    let resultArray = unorderedArray.slice();

    await sortOneTime(algorithms.MergeSort, resultArray, 21);

    expect(resultArray).toEqual(orderedArray);
  });

  it("Quick Sort sorts correctly", async () => {
    let resultArray = unorderedArray.slice();

    await sortOneTime(algorithms.QuickSort, resultArray, 22);

    expect(resultArray).toEqual(orderedArray);
  });

  it("Heap Sort sorts correctly", async () => {
    let resultArray = unorderedArray.slice();

    await sortOneTime(algorithms.HeapSort, resultArray, 22);

    expect(resultArray).toEqual(orderedArray);
  });
  //#endregion

  //#region Brute Force Tests
  const sortsSuccessfullyTenTimes = async (
    algorithmFunction,
    speed
  ) => {
    for (let i = 0; i < 10; i++) {
      let dataSetSize = GenerateRandomNumber(15);
      let localUnorderedArray = GenerateRandomDataSet(dataSetSize);
      let localOrderedArray = localUnorderedArray.slice().sort((a, b) => a - b);

      let resultArray = localUnorderedArray.slice();

      await algorithmFunction(
        resultArray,
        emptyFunction,
        emptyFunction,
        () => speed
        // This last thing is to make sure that the timeouts are 0.
        // It varies for each algorithm
      );

      let isEqual = resultArray.every((element, index) => {
        return element === localOrderedArray[index];
      });

      if (!isEqual) {
        return false;
      }
    }

    return true;
  };

  it("Bubble Sort sorts correctly 10 times, with 10 different inputs", async () => {
    const result = await sortsSuccessfullyTenTimes(
      algorithms.BubbleSort,
      21
    );

    expect(result).toBe(true);
  });

  it("Selection Sort sorts correctly 10 times, with 10 different inputs", async () => {
    const result = await sortsSuccessfullyTenTimes(
      algorithms.SelectionSort,
      21
    );

    expect(result).toBe(true);
  });

  it("Insertion Sort sorts correctly 10 times, with 10 different inputs", async () => {
    const result = await sortsSuccessfullyTenTimes(
      algorithms.InsertionSort,
      21
    );

    expect(result).toBe(true);
  });

  it("Merge Sort sorts correctly 10 times, with 10 different inputs", async () => {
    const result = await sortsSuccessfullyTenTimes(
      algorithms.MergeSort,
      21
    );

    expect(result).toBe(true);
  });

  it("Quick Sort sorts correctly 10 times, with 10 different inputs", async () => {
    const result = await sortsSuccessfullyTenTimes(
      algorithms.QuickSort,
      22
    );

    expect(result).toBe(true);
  });

  it("Heap Sort sorts correctly 10 times, with 10 different inputs", async () => {
    const result = await sortsSuccessfullyTenTimes(
      algorithms.HeapSort,
      22
    );

    expect(result).toBe(true);
  });

  //#endregion
});
