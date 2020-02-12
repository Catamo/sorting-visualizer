import { Pause } from '../utils'

const BubbleSort = async (array, callbackSetData, callbackSetActiveIndexes, callbackSwaping) => {
    const n = array.length;

    let isSorted = false;
    while (isSorted == false) {
        isSorted = true;

        for (let i = 0; i < n - 1; i++) {
            callbackSwaping(false);
            callbackSetActiveIndexes([i, i + 1]);
            await Pause(200);

            if (array[i] > array[i + 1]) {
                callbackSwaping(true);
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

    callbackSetActiveIndexes([]);
}

export default BubbleSort;