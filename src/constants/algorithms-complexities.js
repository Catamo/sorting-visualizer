import * as algorithmsNames from './algorithms-names';

export const ComplexityDictionary = {
    [algorithmsNames.BUBBLE_SORT]: 'Time: O(n<sup>2</sup>) | Space: O(1)',
    [algorithmsNames.INSERTION_SORT]: 'Time: O(n<sup>2</sup>) | Space: O(1)',
    [algorithmsNames.SELECTION_SORT]: 'Time: O(n<sup>2</sup>) | Space: O(1)',
    [algorithmsNames.MERGE_SORT_RECURSIVE]: 'Time: O(nlog(n)) | Space: O(nlog(n))',
    [algorithmsNames.QUICK_SORT]: 'Time: O(nlog(n))<span class="red--text">*</span>&nbsp;| Space: O(log(n))',
    [algorithmsNames.HEAP_SORT]: 'Time: O(nlog(n)) | Space: O(1)'
};