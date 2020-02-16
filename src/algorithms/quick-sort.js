import { Pause } from '../utils'
import { SELECTED, SWAPING, FADED_OUT, UNSELECTED, TRAVERSING } from '../constants/index-states';

let _visualizerArray = []
let _callbackSetData, _callbackSetIndexesStates, _getSortingSpeed;

const GetTimeout = () => {
    return 50 + (500 - _getSortingSpeed() * 25);
};

const MapRangeToState = (start, end, state) => {
    const statesObject = {};
    for (let i = 0; i < _visualizerArray.length; i++) {
        if (i >= start && i <= end) {
            statesObject[i] = state
        }
    }
    return statesObject
}

const GetAllElementsFadedOut = () => {
    return MapRangeToState(0, _visualizerArray.length - 1, FADED_OUT);
}

const FadeOutAllButRange = async (start, end) => {
    _callbackSetIndexesStates({ 
        ...GetAllElementsFadedOut(),
        ...MapRangeToState(start, end, UNSELECTED)
    });
    await Pause(GetTimeout());
}

const Swap = async (array, idx1, idx2) => {
    let temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;

    _visualizerArray = array;

    _callbackSetData(_visualizerArray);
    await Pause(GetTimeout());
}

const QuickSortHelper = async (array, startIndex, endIndex) => {
    if (startIndex >= endIndex) {
        return;
    }

    let pivotIndex = startIndex;
    let leftIndex = startIndex + 1;
    let rightIndex = endIndex;

    //visualizer code
    await FadeOutAllButRange(startIndex, endIndex + 1);
    
    while (leftIndex <= rightIndex) {
        if (array[pivotIndex] <= array[leftIndex] && array[pivotIndex] >= array[rightIndex]) {
            _callbackSetIndexesStates({ 
                ...GetAllElementsFadedOut(),
                ...MapRangeToState(startIndex, endIndex + 1, UNSELECTED),
                [pivotIndex]: TRAVERSING,
                [leftIndex]: SWAPING,
                [rightIndex]: SWAPING
            });
            await Pause(GetTimeout());

            await Swap(array, leftIndex, rightIndex);
        }
        
        _callbackSetIndexesStates({ 
            ...GetAllElementsFadedOut(),
            ...MapRangeToState(startIndex, endIndex + 1, UNSELECTED),
            [pivotIndex]: TRAVERSING,
            [leftIndex]: SELECTED,
            [rightIndex]: SELECTED
        });
        await Pause(GetTimeout());

        if (array[pivotIndex] >= array[leftIndex]) {            
            leftIndex++;
        }

        if (array[pivotIndex] <= array[rightIndex]) {
            rightIndex--
        }
        
        _callbackSetIndexesStates({ 
            ...GetAllElementsFadedOut(),
            ...MapRangeToState(startIndex, endIndex + 1, UNSELECTED),
            [pivotIndex]: TRAVERSING,
            [leftIndex]: SELECTED,
            [rightIndex]: SELECTED
        });
        await Pause(GetTimeout());
    }

    await Swap(array, pivotIndex, rightIndex);
    pivotIndex = rightIndex;
        
    _callbackSetIndexesStates({ 
        ...GetAllElementsFadedOut(),
        ...MapRangeToState(startIndex, endIndex + 1, UNSELECTED),
        [rightIndex]: TRAVERSING
    });
    await Pause(GetTimeout());

    const leftSubArrayIsSmaller = (pivotIndex - 1) + startIndex < endIndex - (pivotIndex + 1);

    if (leftSubArrayIsSmaller) {
        await QuickSortHelper(array, startIndex, pivotIndex - 1);
        await QuickSortHelper(array, pivotIndex + 1, endIndex);
    }
    else {
        await QuickSortHelper(array, pivotIndex + 1, endIndex);
        await QuickSortHelper(array, startIndex, pivotIndex - 1);
    }

    _callbackSetIndexesStates({ 
        ...MapRangeToState(startIndex, endIndex, UNSELECTED)
    });
}

const QuickSort = async (array, callbackSetData, callbackSetIndexesStates, getSortingSpeed) => {
    _visualizerArray = array;
    _callbackSetData = callbackSetData; 
    _callbackSetIndexesStates = callbackSetIndexesStates;
    _getSortingSpeed = getSortingSpeed;

    await QuickSortHelper(array, 0, array.length - 1);

    return array; 
}

export default QuickSort;