import { Pause } from '../utils'
import { SELECTED, SWAPING, UNSELECTED, TRAVERSING } from '../constants/index-states';

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

const Swap = async (array, idx1, idx2) => {
    let temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;

    _visualizerArray = array;

    _callbackSetData(_visualizerArray);
    await Pause(GetTimeout());
}

const BuildMaxHeap = async (array) => {
    let lastParentIdx = Math.floor((array.length - 2) / 2);

    for (let currentIdx = lastParentIdx; currentIdx >= 0; currentIdx--) {
        await SiftDown(currentIdx, array.length, array);
    }
}

const SiftDown = async (currentIndex, endIndex, heap) => {
    let childOneIdx = (currentIndex * 2) + 1;
    
    while (childOneIdx < endIndex) {
        const childTwoIdx = childOneIdx + 1;

        _callbackSetIndexesStates({ 
            [currentIndex]: TRAVERSING,
            [childOneIdx]: SELECTED,
            [childTwoIdx]: SELECTED
        });
        await Pause(GetTimeout());

        let maxChildIdx;

        if (childTwoIdx >= endIndex || heap[childOneIdx] > heap[childTwoIdx]) {
            maxChildIdx = childOneIdx;
        }
        else {
            maxChildIdx = childTwoIdx;
        }

        if (heap[maxChildIdx] > heap[currentIndex]) {
            _callbackSetIndexesStates({ 
                [currentIndex]: SWAPING,
                [maxChildIdx]: SWAPING
            });
            await Pause(GetTimeout());

            await Swap(heap, maxChildIdx, currentIndex);
            currentIndex = maxChildIdx;
            childOneIdx = (currentIndex * 2) + 1;
        }
        else {
            return;
        }
    }

    _callbackSetIndexesStates({ 
        ...MapRangeToState(currentIndex, endIndex, UNSELECTED)
    });
}

const HeapSortHelper = async (array) => {
    await BuildMaxHeap(array);

    for (let endIndex = array.length - 1; endIndex > 0; endIndex--) {
        _callbackSetIndexesStates({ 
            0: SWAPING,
            [endIndex]: SWAPING
        });
        await Pause(GetTimeout());
        
        await Swap(array, 0, endIndex);

        await Pause(GetTimeout());
        await SiftDown(0, endIndex, array);
    }

    _callbackSetData(array);

    return array;
}

const HeapSort = async (array, callbackSetData, callbackSetIndexesStates, getSortingSpeed) => {
    _visualizerArray = array;
    _callbackSetData = callbackSetData; 
    _callbackSetIndexesStates = callbackSetIndexesStates;
    _getSortingSpeed = getSortingSpeed;

    await HeapSortHelper(array);

    return array; 
}

export default HeapSort;