import { Pause } from '../utils';
import { SELECTED, TRAVERSING, SWAPING } from '../constants/index-states';

const InsertionSort = async (array, callbackSetData, callbackSetIndexesStates) => {
    const n = array.length;

    for (let i = 1; i < n; i++) {
        let j = i;

        while (j > 0) {
            callbackSetIndexesStates({ 
                [i]: TRAVERSING, 
                [j]: SELECTED, 
                [j - 1]: SELECTED
            });
            await Pause(200);

            if (array[j] < array[j - 1]) {
                callbackSetIndexesStates({ 
                    [i]: TRAVERSING, 
                    [j]: SWAPING, 
                    [j - 1]: SWAPING
                });
                await Pause(200);

                let temp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = temp;
            }

            
            j--;
            callbackSetData(array);
            await Pause(200);
        }
    }

    callbackSetIndexesStates({});
}

export default InsertionSort;