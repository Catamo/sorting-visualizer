import * as algorithmsNames from './algorithms-names';

export const AlgorithmsDetailsDictionary = {
    [algorithmsNames.BUBBLE_SORT]: {
        time: { 
            best: "Ω(n)",
            average: "Θ(n<sup>2</sup>)",
            worst: "O(n<sup>2</sup>)"
        },
        space: {
            worst: "O(1)"
        }
    },
    [algorithmsNames.INSERTION_SORT]: {
        time: { 
            best: "Ω(n)",
            average: "Θ(n<sup>2</sup>)",
            worst: "O(n<sup>2</sup>)"
        },
        space: {
            worst: "O(1)"
        }
    },
    [algorithmsNames.SELECTION_SORT]: {
        time: { 
            best: "Ω(n<sup>2</sup>)",
            average: "Θ(n<sup>2</sup>)",
            worst: "O(n<sup>2</sup>)"
        },
        space: {
            worst: "O(1)"
        }
    },
    [algorithmsNames.MERGE_SORT_RECURSIVE]: {
        time: { 
            best: "Ω(n log(n))",
            average: "Θ(n log(n))",
            worst: "O(n log(n))"
        },
        space: {
            worst: "O(n)"
        }
    },
    [algorithmsNames.QUICK_SORT]: {
        time: { 
            best: "Ω(n log(n))",
            average: "Θ(n log(n))",
            worst: "O(n<sup>2</sup>)"
        },
        space: {
            worst: "O(log(n))"
        }
    },
    [algorithmsNames.HEAP_SORT]: {
        time: { 
            best: "Ω(n log(n))",
            average: "Θ(n log(n))",
            worst: "O(n log(n))"
        },
        space: {
            worst: "O(1)"
        }
    }
};