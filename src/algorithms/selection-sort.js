import { Pause } from '../utils'
import { SELECTED, TRAVERSING, SWAPING } from '../constants/index-states';

const SelectionSort = async (array, callbackSetData, callbackSetIndexesStates) => {
    const n = array.length;
    let smallestIindex = 0;

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
            await Pause(200);
        }

        callbackSetIndexesStates({ 
            [i]: SWAPING, 
            [smallestIindex]: SWAPING
        });
        await Pause(200);
        let temp = array[i];
        array[i] = array[smallestIindex];
        array[smallestIindex] = temp;

        
        callbackSetData(array);
        await Pause(200);
    }

    callbackSetIndexesStates({});
}

export default SelectionSort;