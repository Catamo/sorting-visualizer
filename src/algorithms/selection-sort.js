import { Pause } from '../utils'
import { SELECTED, TRAVERSING, SWAPING } from '../constants/index-states';

const SelectionSort = async (array, callbackSetData, callbackSetIndexesStates, getSortingSpeed) => {
    const n = array.length;
    let smallestIindex = 0;

    const getTimeout = () => {
        return 10 + (200 - getSortingSpeed() * 10);
    };

    for (let i = 0; i < n; i++) {
        smallestIindex = i;
        for (let j = i + 1; j < n; j++) {
            if (array[smallestIindex] > array[j]) {
                smallestIindex = j;
            }

            callbackSetIndexesStates({ 
                [i]: SELECTED, 
                [j]: TRAVERSING, 
                [smallestIindex]: SELECTED
            });
            await Pause(getTimeout());
        }

        callbackSetIndexesStates({ 
            [i]: SWAPING, 
            [smallestIindex]: SWAPING
        });
        await Pause(getTimeout());
        let temp = array[i];
        array[i] = array[smallestIindex];
        array[smallestIindex] = temp;

        
        callbackSetData(array);
        await Pause(getTimeout());
    }

    callbackSetIndexesStates({});
}

export default SelectionSort;