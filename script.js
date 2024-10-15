const arrayContainer = document.getElementById("array-container");

// Function to generate a random array of bars
const generateArray = () => {
    arrayContainer.innerHTML = "";
    for (let i = 0; i < 30; i++) {
        const barHeight = ~~(Math.random() * 80) + 20;
        const arrayBar = document.createElement("div");
        arrayBar.classList.add("array-bar");
        arrayBar.style.height = `${barHeight}%`; 
        arrayContainer.appendChild(arrayBar);
    }
};

// Bubble Sort Algorithm
const bubbleSort = async () => {
    const bars = document.querySelectorAll(".array-bar");
    for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            bars[j].style.backgroundColor = "#ff6f61";
            bars[j + 1].style.backgroundColor = "#ff6f61";
            if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                await swap(bars[j], bars[j + 1]);
            }
            bars[j].style.backgroundColor = "white";
            bars[j + 1].style.backgroundColor = "white";
        }
        bars[bars.length - 1 - i].style.backgroundColor = "#6b6b6b";
    }
};

// Merge Sort Algorithm
const mergeSort = async (bars, start, end) => {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    await mergeSort(bars, start, mid);
    await mergeSort(bars, mid + 1, end);

    await merge(bars, start, mid, end);
};

// Merging the sorted halves for Merge Sort
const merge = async (bars, start, mid, end) => {
    const n1 = mid - start + 1;
    const n2 = end - mid;

    const leftArray = [];
    const rightArray = [];

    for (let i = 0; i < n1; i++) {
        leftArray.push(parseInt(bars[start + i].style.height));
        bars[start + i].style.backgroundColor = "#ff6f61";  // Highlight left half
    }
    for (let i = 0; i < n2; i++) {
        rightArray.push(parseInt(bars[mid + 1 + i].style.height));
        bars[mid + 1 + i].style.backgroundColor = "#ff6f61";  // Highlight right half
    }

    await sleep(300);  // Delay for visualization

    let i = 0, j = 0, k = start;

    while (i < n1 && j < n2) {
        if (leftArray[i] <= rightArray[j]) {
            bars[k].style.height = `${leftArray[i]}%`;
            i++;
        } else {
            bars[k].style.height = `${rightArray[j]}%`;
            j++;
        }
        bars[k].style.backgroundColor = "#6b6b6b";  // Sorted part
        k++;
        await sleep(100);  // Delay for step-by-step visualization
    }

    while (i < n1) {
        bars[k].style.height = `${leftArray[i]}%`;
        bars[k].style.backgroundColor = "#6b6b6b";  // Sorted part
        i++;
        k++;
        await sleep(100);
    }

    while (j < n2) {
        bars[k].style.height = `${rightArray[j]}%`;
        bars[k].style.backgroundColor = "#6b6b6b";  // Sorted part
        j++;
        k++;
        await sleep(100);
    }
};

// QuickSort Algorithm
const quickSort = async (bars, low, high) => {
    if (low < high) {
        const pivotIndex = await partition(bars, low, high);
        await quickSort(bars, low, pivotIndex - 1);  // Sort left of pivot
        await quickSort(bars, pivotIndex + 1, high); // Sort right of pivot
    }
};

// Partition function for QuickSort
const partition = async (bars, low, high) => {
    let pivot = parseInt(bars[high].style.height); // Pivot element
    bars[high].style.backgroundColor = "#ff6f61";  // Highlight pivot
    let i = low - 1;

    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = "#ff6f61"; // Compare current element
        if (parseInt(bars[j].style.height) < pivot) {
            i++;
            await swap(bars[i], bars[j]);
        }
        bars[j].style.backgroundColor = "white"; // Reset color after comparison
    }

    // Place pivot at the correct position
    await swap(bars[i + 1], bars[high]);
    bars[high].style.backgroundColor = "white"; // Reset pivot color
    bars[i + 1].style.backgroundColor = "#6b6b6b";  // Mark final position of pivot

    return i + 1;
};

// Helper function to introduce delay for visualization
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// Swap two bars (used in sorting algorithms)
const swap = (bar1, bar2) => {
    return new Promise((resolve) => {
        const tempHeight = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tempHeight;
        setTimeout(() => {
            resolve();
        }, 300);
    });
};

// Start Merge Sort
const startMergeSort = async () => {
    const bars = document.querySelectorAll(".array-bar");
    await mergeSort(bars, 0, bars.length - 1);
};

// Start Bubble Sort
const startBubbleSort = async () => {
    await bubbleSort();
};

// Start QuickSort
const startQuickSort = async () => {
    const bars = document.querySelectorAll(".array-bar");
    await quickSort(bars, 0, bars.length - 1);
};

// Initial array generation
generateArray();
