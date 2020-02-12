import { Pause } from '../utils'
import { SWAPING, SELECTED } from '../constants/index-states';

const BubbleSort = async (array, callbackSetData, callbackSetIndexesStates) => {
    const n = array.length;

    let isSorted = false;
    while (isSorted == false) {
        isSorted = true;

        for (let i = 0; i < n - 1; i++) {
            callbackSetIndexesStates({ 
                [i]: SELECTED, 
                [i + 1]: SELECTED
            });
            await Pause(200);

            if (array[i] > array[i + 1]) {
                callbackSetIndexesStates({ 
                    [i]: SWAPING, 
                    [i + 1]: SWAPING
                });
                await Pause(200);
                let temp = array[i + 1];
                array[i + 1] = array[i];
                array[i] = temp;

                isSorted = false;
                
                callbackSetData(array);
                await Pause(200);
            }
        }

        callbackSetData(array);
        await Pause(200);
    }

    callbackSetIndexesStates({});
}

export default BubbleSort;