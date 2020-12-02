using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace PasswordPhilosophy
{
    class Program
    {
        // line sample: 6-8 s: svsssszslpsp
        const string linePattern = @"^(\d+)-(\d+) (.{1}): (.+)$";

        static void Main(string[] args)
        {
            var fileName = args?.ElementAtOrDefault(0) ?? "input.txt";
            if (!File.Exists(fileName))
            {
                Console.WriteLine($"File not found: {fileName}");
                Environment.Exit(1);
            }

            var data = File.ReadAllLines(fileName);

            HowManyPasswordsAreValid(data);
            HowManyPasswordsAreValidSecondTry(data);
        }

        static void HowManyPasswordsAreValid(string[] data)
        {
            Console.WriteLine($"Data has been read => {data.Count()} passwords");

            var validPasswords = 0;

            foreach (var line in data)
            {
                var lineMatch = Regex.Match(line, linePattern);
                if (lineMatch.Success)
                {
                    var min = Convert.ToInt16(lineMatch.Groups[1].Value);
                    var max = Convert.ToInt16(lineMatch.Groups[2].Value);
                    var searchChar = Convert.ToChar(lineMatch.Groups[3].Value);
                    var password = lineMatch.Groups[4].Value;
                    var searchCharCount = password.ToCharArray().Count(c => c == searchChar);

                    if (searchCharCount >= min && searchCharCount <= max)
                    {
                        validPasswords++;
                        Console.WriteLine($"PW valid: min={min}, max={max}, char={searchChar}, password={password}");
                    }
                }
            }

            Console.WriteLine($"There are {validPasswords} valid passwords according to their policies.");
        }

        static void HowManyPasswordsAreValidSecondTry(string[] data)
        {
            Console.WriteLine($"Data has been read => {data.Count()} passwords");

            var validPasswords = 0;

            foreach (var line in data)
            {
                var lineMatch = Regex.Match(line, linePattern);
                if (lineMatch.Success)
                {
                    var min = Convert.ToInt16(lineMatch.Groups[1].Value);
                    var max = Convert.ToInt16(lineMatch.Groups[2].Value);
                    var searchChar = Convert.ToChar(lineMatch.Groups[3].Value);
                    var password = lineMatch.Groups[4].Value;
                    var passwordArray = password.ToCharArray();
                    var containsChar =
                        (passwordArray.ElementAtOrDefault(min - 1) != passwordArray.ElementAtOrDefault(max - 1))
                        && (passwordArray.ElementAtOrDefault(min - 1) == searchChar || passwordArray.ElementAtOrDefault(max - 1) == searchChar);

                    if (containsChar)
                    {
                        validPasswords++;
                        Console.WriteLine($"PW valid: min={min}, max={max}, char={searchChar}, password={password}");
                    }
                }
            }

            Console.WriteLine($"There are {validPasswords} valid passwords according to their policies.");
        }
    }
}
