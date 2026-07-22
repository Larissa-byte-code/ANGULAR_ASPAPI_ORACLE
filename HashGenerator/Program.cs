using System;

class Program
{
    static void Main()
    {
        string hash = BCrypt.Net.BCrypt.HashPassword("1234");
        Console.WriteLine(hash);
    }
}
