function swapValues(num1, num2) {
  let temp = num1;
  num1 = num2;
  num2 = temp;
};

function selectionSort(arr) {
  const length = arr.length;
  // nổi bọt ngược hay chọn min
  for (let i = 0; i < length - 1; i++) {
    let minIdx = i;
    for (let j = 0; j < length - 1; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
      // if (minIdx > i) {
      //   [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      // }
    }
    if (minIdx > i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
};

function insertionSort(array) {
  let pos, x;
  for (let i = 1; i < array.length; i++) {
    pos = i - 1;
    x = array[i];
    while (pos >= 0 && array[pos] > x) {
      array[pos + 1] = array[pos];
      pos--;
    }
    array[pos + 1] = x;
  }
};

function bubbleSort(array) {
  // đổi chỗ 2 cặp liên kề, lặp lại từ đầu và bỏ qua phần tử max đã ở vị trí cuối cùng
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = array.length - 1; j > i; j--) {
      if (array[j] < array[j - 1]) {
        let t = array[j];
        array[j] = array[j - 1];
        array[j - 1] = t;
      }
    }
  }
};

function shakerSort(array) {
  let left, right, k;

  left = 0;
  right = array.length - 1;
  k = array.length - 1;

  while (left < right) {
    for (let j = right; j > left; j--) {
      if (array[j] < array[j - 1]) {
        let t = array[j];
        array[j] = array[j - 1];
        array[j - 1] = t;
        k = j;
      }
    }
    left = k;

    for (let j = left; j < right; j++) {
      if (array[j] > array[j + 1]) {
        let t = array[j];
        array[j] = array[j + 1];
        array[j + 1] = t;
        k = j;
      }
    }
    right = k;
  }
};

function interChangeSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[i]) {
        let t = array[i];
        array[i] = array[j];
        array[j] = t;
      }
    }
  }
};

function binaryInsertionSort(array) {
  let l, r, m, x;
  for (let i = 1; i < array.length; i++) {
    l = 0;
    r = i - 1;
    x = array[i];

    while (l <= r) {
      m = Math.floor((l + r) / 2);
      if (array[m] > x) r = m - 1;
      else l = m + 1;
    }

    for (let j = i; j > l; j--)
      array[j] = array[j - 1];
    array[l] = x;
  }
};

function quickSort3(array, left, right) {
  let l = left, r = right;
  let m = Math.floor((l + r) / 2);
  let pivot = array[m];

  while (l <= r) {
    while (array[l] < pivot) l++;
    while (array[r] > pivot) r--;
    if (l < r) {
      let t = array[l];
      array[l] = array[r];
      array[r] = t;
      l++;
      r--;
    }
    if (l === r) {
      l++;
      r--;
    }
  }

  if (l < right) quickSort(array, l, right);
  if (r > left) quickSort(array, left, r);
};

function quickSort2(unSortedArr) {
  // sx phân đoạn, sx nhanh
  const length = unSortedArr.length;
  if (unSortedArr.length < 2) return unSortedArr;

  const pivot = unSortedArr[0]; //lấy phần tử dầu của mảng làm phần tử chốt
  const leftArr = []; // mảng chứa phần tử nhỏ hơn pivot
  const rightArr = []; // mảng chứa phần tử lớn hơn pivot
  let currentItem; // phần tử đang được xét

  // loop các phần tử còn lại trong mảng trừ phần tử pivot.
  // Do pivot là ptu đầu tiên nên i sẽ bắt đầu từ 1
  for (let i = 1; i < length; i++) {
    currentItem = unSortedArr[i];

    if (currentItem < pivot) {
      leftArr.push(currentItem);
    } else {
      rightArr.push(currentItem);
    }
  }

  return [...this.quickSort(leftArr), pivot, ...this.quickSort(rightArr)];
};

function quickSort(arr, startIdx, endIdx) {
  // sx phân đoạn, sx nhanh
  const partition = (arr, startIdx, endIdx, j) => {
    // chọn khóa pivot là ptu đầu tiên của mảng, cho i chạy từ đầu lên, j chạy từ đuôi về
    // nếu ptu thứ i < pivot thì i++
    // nếu ptu thứ j < pivot thì j--
    // nếu i < j thì đổi chỗ ptu i và ptu j
    // nếu i >= j thì đổi chỗ ptu j và pivot
    let i = startIdx + 1;
    j = endIdx;
    do {
      while (arr[i] < arr[startIdx] && i < endIdx) {
        i++;
      }
      while (arr[j] > arr[startIdx] && j > startIdx) {
        j--;
      }
      if (i < j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
      } else {
        break;
      }
    } while (i < j);
    [arr[j], arr[startIdx]] = [arr[startIdx], arr[j]];
    return j;
  }
  if (startIdx < endIdx) {
    let j = null;
    j = partition(arr, startIdx, endIdx, j);
    this.quickSort(arr, startIdx, j - 1);
    this.quickSort(arr, j + 1, endIdx);
  }
};
// mergeSort
function merge(array, left, m, right) {
  let l = left, r = m + 1;
  let tmp = [];

  while (l <= m && r <= right) {
    if (array[l] < array[r]) tmp.push(array[l++]);
    else tmp.push(array[r++]);
  }

  while (l <= m) tmp.push(array[l++]);
  while (r <= right) tmp.push(array[r++]);

  for (let i = 0; i < tmp.length; i++)
    array[i + left] = tmp[i];
};

function mergeSort(array, left, right) {
  if (left < right) {
    let m = Math.floor((left + right) / 2);
    mergeSort(array, left, m);
    mergeSort(array, m + 1, right);
    merge(array, left, m, right);
  }
};

// heapSort
function heapify(array, N, i) {
  let left = 2 * i + 1, right = 2 * i + 2, largest;

  if (left < N && array[left] > array[i]) largest = left;
  else largest = i;

  if (right < N && array[right] > array[largest]) largest = right;

  if (largest != i) {
    let t = array[i];
    array[i] = array[largest];
    array[largest] = t;
    heapify(array, N, largest);
  }
}

function buildHeap(array) {
  let m = Math.floor(array.length / 2 - 1);
  for (let i = m; i >= 0; i--)
    heapify(array, array.length, i);
}

function heapSort(array) {
  buildHeap(array);

  for (let i = array.length - 1; i >= 0; i--) {
    let t = array[0];
    array[0] = array[i];
    array[i] = t;

    heapify(array, i, 0);
  }
}


(() => {

})();