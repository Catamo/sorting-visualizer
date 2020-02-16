import { Pause } from '../utils'
import { SELECTED, SWAPING, FADED_OUT, UNSELECTED } from '../constants/index-states';

let _visualizerArray = []
let _callbackSetData, _callbackSetIndexesStates, _getSortingSpeed;

const ArrayIndexesDict = {}

const GetTimeout = () => {
    return 50 + (1000 - _getSortingSpeed() * 50);
};

const MapElementsToState = (array, state) => {
    const statesObject = {};
    for (let value of array) {
        statesObject[ArrayIndexesDict[value]] = state
    }
    return statesObject
}

const GetAllElementsFadedOut = () => {
    return MapElementsToState(_visualizerArray, FADED_OUT);
}

const FadeOutAllBut = async (array) => {
    _callbackSetIndexesStates({ 
        ...GetAllElementsFadedOut(),
        ...MapElementsToState(array, UNSELECTED)
    });
    await Pause(GetTimeout());
}

const SortNumbers = async (array) => {
    _callbackSetIndexesStates({
        ...GetAllElementsFadedOut(),
        ...MapElementsToState(array, SELECTED)
    });
    await Pause(GetTimeout());
    
    let minIndex = _visualizerArray.length;
    for (let value of array) {
        minIndex = Math.min(minIndex, ArrayIndexesDict[value]);
    }

    for (let i = 0; i < array.length; i++) {
        let currentValueIndex = ArrayIndexesDict[array[i]] - minIndex;

        if (currentValueIndex != i) {
            _callbackSetIndexesStates({
                ...GetAllElementsFadedOut(),
                ...MapElementsToState(array, UNSELECTED),
                [minIndex + i]: SWAPING,
                [ArrayIndexesDict[array[i]]]: SWAPING
            });
            await Pause(GetTimeout());

            let temp = _visualizerArray[minIndex + i];
            _visualizerArray[minIndex + i] = _visualizerArray[ArrayIndexesDict[array[i]]];
            _visualizerArray[ArrayIndexesDict[array[i]]] = temp;
    
            for (let i = 0; i < _visualizerArray.length; i++) {
                ArrayIndexesDict[_visualizerArray[i]] = i;
            }
        
            _callbackSetData(_visualizerArray);
            await Pause(GetTimeout());
        }
    }

    _callbackSetIndexesStates({
        ...MapElementsToState(array, UNSELECTED)
    });
}

const MergeSortHelper = async (array) => {
    const n = array.length;
    const mid = Math.floor(n / 2);

    //visualizer code
    await FadeOutAllBut(array);

    if (n == 1) {
        return array;
    }

    let firstArray = await MergeSortHelper(array.slice(0, mid));
    let secondArray = await MergeSortHelper(array.slice(mid));

    let firstPointer = 0;
    let secondPointer = 0;
    let currentIndex = 0;

    //visualizer code
    let unSortedArray = firstArray.concat(secondArray);
    if (unSortedArray.length == _visualizerArray.length) {
        _visualizerArray = unSortedArray;
    }

    while (firstPointer < firstArray.length || secondPointer < secondArray.length) {
        if (firstArray[firstPointer] <= secondArray[secondPointer] || secondPointer >= secondArray.length) {
            array[currentIndex] = firstArray[firstPointer];
            firstPointer++;
        }
        else if (firstArray[firstPointer] >= secondArray[secondPointer] || firstPointer >= firstArray.length) {
            array[currentIndex] = secondArray[secondPointer];
            secondPointer++;
        }
        currentIndex++;
    }

    //visualizer code
    await SortNumbers(array);

    return array;
}

const MergeSort = async (array, callbackSetData, callbackSetIndexesStates, getSortingSpeed) => {
    _visualizerArray = array;
    _callbackSetData = callbackSetData; 
    _callbackSetIndexesStates = callbackSetIndexesStates;
    _getSortingSpeed = getSortingSpeed;

    for (let i = 0; i < array.length; i++) {
        ArrayIndexesDict[array[i]] = i;
    }

    return MergeSortHelper(array)
}

export default MergeSort;