import { Pause } from '../utils';
import { SELECTED, TRAVERSING, SWAPING } from '../constants/index-states';

const InsertionSort = async (array, callbackSetData, callbackSetIndexesStates, getSortingSpeed) => {
    const n = array.length;

    const getTimeout = () => {
        return 10 + (200 - getSortingSpeed() * 10);
    };

    for (let i = 1; i < n; i++) {
        let j = i;

        while (j > 0) {
            callbackSetIndexesStates({ 
                [i]: TRAVERSING, 
                [j]: SELECTED, 
                [j - 1]: SELECTED
            });
            await Pause(getTimeout());

            if (array[j] < array[j - 1]) {
                callbackSetIndexesStates({ 
                    [i]: TRAVERSING, 
                    [j]: SWAPING, 
                    [j - 1]: SWAPING
                });
                await Pause(getTimeout());

                let temp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = temp;
            }

            
            j--;
            callbackSetData(array);
            await Pause(getTimeout());
        }
    }

    callbackSetIndexesStates({});
}

export default InsertionSort;