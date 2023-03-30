Console.WriteLine("Enter the number of rows you want:");
int m = int.Parse(Console.ReadLine());
Console.WriteLine("Enter the number of columns you want:");
int n = int.Parse(Console.ReadLine());

double[,] array = new double[n, m];

void insertArray(){
    Console.WriteLine();
    Console.WriteLine("Input "+n+" numbers separated by an empty space. (example: \"2 5 1\")");
    for (int mi = 0; mi < m; mi++){   
        Console.Write("Row-"+mi+": ");
        string input = Console.ReadLine();
        int i = 0;
        foreach (var item in input.Split(' ')){
            array[i, mi] = double.Parse(item);
            i++;
        }
    }
}

void outputArray(){
    Console.WriteLine();
    for (int i = 0; i < m; i++)
    {
        for (int j = 0; j < n; j++)
        {
            Console.Write(string.Format("{0} ", array[j, i]));
        }
        Console.Write(Environment.NewLine);
    }
}

void multiplyRow(int m, int x){
    Console.WriteLine();
    for (int i = 0; i < n; i++){
        array[i, m] *= x;
        Console.Write(string.Format("{0} ", array[i, m]));
    }
}

void combineRows(int m1, int m2){
    Console.WriteLine();
    for (int i = 0; i < n; i++){
        // int something = array[i, m2] / array[i, m1];
        // array[i, m2] = array[i, m2] / something + array[i, m1];
        array[i, m2] += array[i, m1];
        Console.Write(string.Format("{0} ", array[i, m2]));
    }
}

void switchRows(int m1, int m2){
    Console.WriteLine();
    double[] tempSwitch = new double[n];
    for (int i = 0; i < n; i++){
        tempSwitch[i] = array[i, m1];
        array[i, m1] = array[i, m2];
        array[i, m2] = tempSwitch[i];
    }
    Console.WriteLine(string.Format("Switched row {0} for row {1}.", m1, m2));
}

void zerosAtFront(int m){
    Console.WriteLine();
    int count = 0;
    for (int i = 0; i < n; i++){
        if(array[i, m]==0){
            count++;
        }
        else{
            Console.WriteLine("Number of zeroes on row "+ m + ": " + count);
            return;
        }
    }
    if(count==n){
        Console.WriteLine("Number of zeroes on row "+ m + ": " + count);
    }
}

insertArray();

outputArray();

// multiplyRow(1, 10);

// combineRows(0, 1);

// switchRows(0, 1);

// outputArray();

// zerosAtFront(0);